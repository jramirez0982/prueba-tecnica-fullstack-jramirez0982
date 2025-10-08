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

