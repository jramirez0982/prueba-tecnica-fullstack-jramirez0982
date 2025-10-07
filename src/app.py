"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User, Order
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

from flask_cors import CORS

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../dist/')
app = Flask(__name__)
CORS(app)

app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response

@app.route('/all_users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    user_serialized = []

    for user in users:
        user_serialized.append(user.serialize())
    print("estos son los usuarios")
    print(user_serialized)
    return jsonify({'msg': 'ok', 'usuarios': user_serialized}), 200


@app.route('/create_user', methods=['POST'])
def crear_usuario():
    body = request.get_json(silent=True)
    if body is None:
        return jsonify({'msg': 'debes enviar informacion del usuario a crear'}), 400
    if 'name' not in body:
        return jsonify({'msg': 'Debes enviar un nombre en el body'}), 400
    if 'email' not in body:
        return jsonify({'msg': 'debes enviar un correo en el body'}), 400
    if 'created_at' not in body:
        return jsonify({'msg': 'debes indicar la fecha de creacion del usuario'}), 400

    new_user = User()
    new_user.name = body['name']
    new_user.email = body['email']
    new_user.created_at = body['created_at']

    db.session.add(new_user)
    db.session.commit()
    return jsonify({'msg': 'ok', 'Usuario': new_user.serialize()})

@app.route('/all_orders', methods = ['GET'])
def get_orders():
    orders = Order.query.all()
    orders_serialized = []

    for order in orders:
        orders_serialized.append(order.serialize())

    print("estos son las ordenes")
    print(orders_serialized)
    return jsonify({'msg': 'ok', 'ordenes': orders_serialized}), 200





# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
