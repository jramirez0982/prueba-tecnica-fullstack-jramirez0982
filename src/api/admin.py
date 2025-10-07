  
import os
from flask_admin import Admin
from .models import db, User, Order
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='Prueba Tecnica Fullstack Jr', template_mode='bootstrap3')

    class OrderModelView(ModelView):
        column_auto_selected_related = True
        column_list = ['id_order', 'product_name', 'amount', 'created_at',' usuario_id', 'user']
    

    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(OrderModelView(Order, db.session))
    
    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))