# todo-list

Breve descripción del proyecto.

## Requisitos

Antes de comenzar, asegúrate de tener instalado:

- Node.js
- npm

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando: npm i

## Estructura del Repositorio

El repositorio se compone de los siguientes directorios y archivos principales:

- **controller**: Contiene un CRUD para la gestión de datos.
- **rutas**: Define las rutas del API utilizando los controladores.
- **helpers**: Contiene una función para la gestión de errores.
- **validador**: Contiene validadores utilizando JOI para las siguientes acciones:
  - `createTodoValidationSchema`: Esquema de validación para la creación de una tarea.
  - `updateTodoValidationSchema`: Esquema de validación para la actualización de una tarea.
  - `idParamSchema`: Esquema de validación para el parámetro de identificación de una tarea.
- **model**: Contiene el modelo de datos utilizado en el proyecto.
- **test**: Contiene pruebas relacionadas con las funcionalidades anteriores.
- **index.js**: Archivo principal que inicia el proyecto.

## Uso

Para iniciar el proyecto en modo de desarrollo, ejecuta el siguiente comando: npm run dev

Esto iniciará el servidor y podrás acceder a la API en [http://localhost:3000](http://localhost:3000).

## Pruebas

Para ejecutar las pruebas, utiliza el siguiente comando: npm run jest

## Contribución

Si deseas contribuir al proyecto, sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una rama con la funcionalidad o corrección que deseas implementar.
3. Realiza los cambios necesarios en tu rama.
4. Envía un pull request.
