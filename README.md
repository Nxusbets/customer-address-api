**Sistema de Gestión de Direcciones**

Este proyecto permite a los usuarios gestionar sus direcciones de forma segura y eficiente. Utiliza autenticación JWT y una base de datos SQL para almacenar y proteger los datos.

Requisitos previos

Node.js: https://nodejs.org/

npm: https://www.npmjs.com/

MySQL o SQLite: https://www.mysql.com/ 
/ https://www.sqlite.org/

Git: https://git-scm.com/


- Instalación
Clonar el repositorio:

Bash
`git clone https://github.com/tu-usuario/nombre-del-repositorio.git`


- Instalar dependencias:
Bash
`cd nombre-del-repositorio`
`npm install`


- Configurar el entorno: Crea un archivo .env en la raíz del proyecto y configura las variables de entorno:
JWT_SECRET=tu-secreto-jwt
DB_HOST=localhost
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=nombre_de_base_de_datos


- Iniciar el servidor:
Bash
`npm start`

El servidor estará disponible en http://localhost:3000.


- Funcionalidades

Autenticación JWT: Los usuarios deben autenticarse para acceder a sus direcciones.

Gestión de direcciones: Agregar, editar y eliminar direcciones.

Endpoints

- Iniciar sesión:
Método: POST
Ruta: /auth/login
Cuerpo:
JSON

{
  "email": "usuario@ejemplo.com",
  "password": "contraseña"
}

- Obtener direcciones:
Método: GET
Ruta: /addresses

- Obtener dirección por ID:
Método: GET
Ruta: /addresses/:id

- Actualizar dirección:
Método: PUT
Ruta: /addresses/:id
Cuerpo:
JSON

{
  "firstName": "Juan",
  "lastName": "Pérez",
  "address": "Nueva Dirección"
}

- Eliminar dirección:
Método: DELETE
Ruta: /addresses/:id

- Contribuciones
Si deseas contribuir, crea un fork del repositorio, crea una nueva rama y envía un pull request.
