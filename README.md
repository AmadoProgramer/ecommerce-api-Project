# 🛒 ecommerce-api-Project

Este es un proyecto de API REST para un sistema de e-commerce, construido con **Node.js**, **TypeScript**, **PostgreSQL** y **TypeORM** siguiendo los principios de la **arquitectura hexagonal (limpia)**. Su diseño permite una separación clara de responsabilidades y una alta escalabilidad.

---

## 🚀 Tecnologías utilizadas

- **Node.js** (Runtime)
- **TypeScript** (Lenguaje principal)
- **Express** (Framework web)
- **TypeORM** (ORM para PostgreSQL)
- **PostgreSQL** (Base de datos relacional)
- **JWT** (Autenticación con tokens)
- **bcryptjs** (Hashing de contraseñas)
- **dotenv** (Manejo de variables de entorno)
- **Joi** (Validación de variables de entorno)

---

## 📁 Estructura del proyecto (Arquitectura Hexagonal)

```
src/
│
├── domain/             # Entidades del dominio y sus puertos (interfaces)
├── application/        # Servicios de aplicación / casos de uso
├── infrastructure/     # Adaptadores, entidades ORM, rutas, controladores
│   ├── adapter/
│   ├── config/
│   ├── controller/
│   ├── entities/
│   ├── routes/
│   └── web/            # App de express y middlewares
└── index.ts            # Punto de entrada
```

---

## 🔧 Configuración del entorno
## Configuración local
1. Copiar plantilla: `cp env.example .env`  
2. Editar `.env` con tus credenciales (DB, JWT, etc.)  
3. `npm install` y `npm run dev`


## 🛠️ Scripts disponibles

- `npm run dev` – Ejecuta el proyecto en modo desarrollo con `nodemon`
- `npm run build` – Compila el proyecto con `tsc`
- `npm start` – Ejecuta el proyecto ya compilado desde `dist`

---

## 📦 Instalación de dependencias

```bash
npm install
```

---

## 🗃️ Base de datos

El proyecto requiere una base de datos PostgreSQL con el siguiente esquema y tablas basadas en este [ERD](#):

- Cliente
- Pedido
- Producto
- DetallePedido
- Pago

> Las contraseñas son almacenadas **hasheadas** usando bcryptjs.

---

## 🔐 Autenticación

El sistema de login genera un **token JWT** con una validez de 1 hora. Las rutas protegidas requieren el header:

```
Authorization: Bearer <token>
```

---

## 🧪 Pruebas con Postman

[Postman](https://www.postman.com/) para probar las siguientes rutas:

```
POST    /api/clientes/login
POST    /api/clientes           # Registro
GET     /api/productos
POST    /api/pedidos
...
```
---

## 👨‍💻 Autor

**Nicolás Amado**
**Karen Jaimes**
GitHub: [@AmadoProgramer](https://github.com/AmadoProgramer)

---

## 📜 Licencia

Este proyecto está bajo la licencia personal
