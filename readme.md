# API para el proyecto de backend

1. Crear el package json `npm init`
2. Crear la estructura
3. Instalar librerías
   - Express [https://expressjs.com/es/] `npm i express`
   - Express File upload [https://www.npmjs.com/package/express-fileupload] `npm i express-fileupload`
   - Postgres [https://node-postgres.com/] `npm install pg`
   - Nodemon [https://www.npmjs.com/package/nodemon] `npm i nodemon -g` Permite recargar automaticamente el api.
4. Crear el server que genera el API
5. Inicializar el api

- node api/index.js
- nodemon api/index.js

# DESPLIEGUE HEROKU

1. login `heroku login`
2. Conectar repositorio `heroku git:remote -a NOMBRE-PROYECTO-HEROKU`
3. Crear el script de start en el package json ` "start": "MODE=production node app.js",`
4. Subir cambios a heroku `git push heroku master`
