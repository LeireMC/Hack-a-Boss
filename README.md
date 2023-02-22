# Hack-a-Gram

### ¿Qué es Hack-a-Gram?

Hack-a-Gram es el proyecto final realizado en el bootcamp de programación de Hack a boss. Es una aplicación que tiene como finalidad ofrecer al usuario un espacio
personal donde poder alojar fotos.

Permitiendo a otros usuarios poder verlas e interaccionar con ellas.


### Contenido de esta raíz
- Backend: contiene el código fuente del backend desarrollado en node. Permite a la aplicación Fronted obtener los datos de los usuarios.
- Documents: contiene la documentación que define la funcionalidad de la aplicación en su conjunto.
- Resources: contiene los ficheros fuente que define la BBDD y el contrato de los endpoints habilitados.
- Fronted: contiene la aplicaión frontend desarrollado en React. Permite la interacción del usuario final con la aplicación.

### ¿Cómo poder probar en local la aplicación?
**IMPORTANTE**
Es necesario tener instalado ***node*** en el equipo donde se vaya a ejecutar la aplicación.

1. Descargar el contenido de las carpetas Backend y Fronted.
2. Abrir la consola de comandos y posicionarse dentro de la carpeta de Backend.
- Guardar el archivo .env.example como .env y cubrir los datos necesarios.
~~~
MYSQL_HOST= localhost
MYSQL_USER= demo
MYSQL_PASSWORD= pass
MYSQL_DATABASE= my-database
SECRET= secret
SERVER_PORT= 4000
~~~
- Ejecutar el comando npm install o npm i para instalar las dependencias.
- Ejecutar npm run dbpara crear las tablas necesarias en la base de datos anteriormente creada.
- Ejecutar npm run dev  para lanzar el servidor.
3. Abrir una nueva consola de comandos y posicionarse dentro de la carpeta Frontend.
- Ejecutamos npm install
- Ejecutamos npm start

Una vez realizados estos pasos, automáticamente se abre una ventana en el navegador predeterminado con la url de la aplicación Fronted.

## Vídeo demostrativo de la aplicación.

[Hack-a-gram](https://www.youtube.com/watch?v=sGN-IDnRN7s)
