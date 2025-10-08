# WebApp boilerplate with React JS and Flask API

Build web applications using React.js for the front end and python/flask for your backend API.

- Documentation can be found here: https://4geeks.com/docs/start/react-flask-template
- Here is a video on [how to use this template](https://www.loom.com/share/f37c6838b3f1496c95111e515e83dd9b)
- Integrated with Pipenv for package managing.
- Fast deployment to Render [in just a few steps here](https://4geeks.com/docs/start/deploy-to-render-com).
- Use of .env file.
- SQLAlchemy integration for database abstraction.

### 1) Installation:

> If you use Github Codespaces (recommended) or Gitpod this template will already come with Python, Node and the Posgres Database installed. If you are working locally make sure to install Python 3.10, Node 

It is recomended to install the backend first, make sure you have Python 3.10, Pipenv and a database engine (Posgress recomended)

1. Install the python packages: `$ pipenv install`
2. Create a .env file based on the .env.example: `$ cp .env.example .env`
3. Install your database engine and create your database, depending on your database you have to create a DATABASE_URL variable with one of the possible values, make sure you replace the valudes with your database information:

| Engine    | DATABASE_URL                                        |
| --------- | --------------------------------------------------- |
| SQLite    | sqlite:////test.db                                  |
| MySQL     | mysql://username:password@localhost:port/example    |
| Postgress | postgres://username:password@localhost:5432/example |

4. Migrate the migrations: `$ pipenv run migrate` (skip if you have not made changes to the models on the `./src/api/models.py`)
5. Run the migrations: `$ pipenv run upgrade`
6. Run the application: `$ pipenv run start`

> Note: Codespaces users can connect to psql by typing: `psql -h localhost -U gitpod example`

### Undo a migration

You are also able to undo a migration by running

```sh
$ pipenv run downgrade
```

### Backend Populate Table Users

To insert test users in the database execute the following command:

```sh
$ flask insert-test-users 5
```

And you will see the following message:

```
  Creating test users
  test_user1@test.com created.
  test_user2@test.com created.
  test_user3@test.com created.
  test_user4@test.com created.
  test_user5@test.com created.
  Users created successfully!
```

### **Important note for the database and the data inside it**

Every Github codespace environment will have **its own database**, so if you're working with more people eveyone will have a different database and different records inside it. This data **will be lost**, so don't spend too much time manually creating records for testing, instead, you can automate adding records to your database by editing ```commands.py``` file inside ```/src/api``` folder. Edit line 32 function ```insert_test_data``` to insert the data according to your model (use the function ```insert_test_users``` above as an example). Then, all you need to do is run ```pipenv run insert-test-data```.

### Front-End Manual Installation:

-   Make sure you are using node version 20 and that you have already successfully installed and runned the backend.

1. Install the packages: `$ npm install`
2. Start coding! start the webpack dev server `$ npm run start`

# PROYECTO DE CREACION DE USUARIOS Y ORDENES DE SERVICIO

**A continuacion se detallan las instrucciones para inicializacion del proyecto, instalacion de dependencias y breve descripcion del funcionamiento**

***RECOMENDACION***
El proyecto debera correrse en GITHUB - codespace 

1.  Instala las siguientes dependencias:
    
    Para el backend instala los paquetes de python con el comando $ pipenv install
    Para el Frontend ejecuta el comando $ npm install

2. Una vez realizada la instalación, es necesario hacer migración sobre la base de datos. para ello ejecuta la siguiente secuencia de comandos:

    * Migra las migraciones: $ pipenv run migrate (omite si no has hecho cambios en los modelos en ./src/api/models.py)
    * Ejecuta las migraciones: $ pipenv run upgrade
    * Ejecuta la aplicación: $ pipenv run start

Ahora que se ejecuta la aplicación del backend, debe asegurarse de que el puerto (3001) este con visibilidad pública. 
Posteriormente debe copiarse la dirección del puerto 3001 y pegarse en la variable de entorno VITE_BACKEND_URL
Esta variable esta ubicada en el archivo .env

Ahora procede a ejecutar la aplicación desde el front con el comando $ npm run start
El puerto que se abre con este comando tambien debe dejarse con visibilidad publica y al acceder a su direccion se debe activar la aplicación.

**SOBRE LA APLICACION**

La página de inicio de la aplicación muestra la información de los usuarios existentes, como al iniciar la aplicación por primera vez no hay usuarios existentes, debe dirigirse al navbar y dar click en el botón **crear usuario**

Una vez alli se despliega un formulario con los datos el usuario. se diligencian los datos y se da click en el botón **crear usuario**, esto redirige a la pagina principal y alli se verán los usuarios que se han creado.

Para ver las ordenes de servicio desde la pagina principal debe darse click en ver ordenes de servicio. Si no hay ordenes creadas se desplegara una tabla vacia y se podra crear una nueva orden dando click en el boton **crear orden**

Allí se despliega el formulario para crear la orden, se diligencia y se da click en **crear orden**

una vez creada, se redirige a una página donde muestra todas las ordenes de servicio.

**VER ORDENES POR USUARIO**
En la pagina principal, cuando aparecen los usuarios, en cada tarjeta al lado derecho hay un boton que dice **mis ordenes** si se da click aqui se muestra una tabla que contiene solo las ordenes asociadas al usuario que se le dio click


**Escencialmente esto constituye el ejercicio desarrollado**



## Publish your website!

This boilerplate it's 100% read to deploy with Render.com and Heroku in a matter of minutes. Please read the [official documentation about it](https://4geeks.com/docs/start/deploy-to-render-com).

### Contributors

This template was built as part of the 4Geeks Academy [Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [Alejandro Sanchez](https://twitter.com/alesanchezr) and many other contributors. Find out more about our [Full Stack Developer Course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer), and [Data Science Bootcamp](https://4geeksacademy.com/us/coding-bootcamps/datascience-machine-learning).

You can find other templates and resources like this at the [school github page](https://github.com/4geeksacademy/).
