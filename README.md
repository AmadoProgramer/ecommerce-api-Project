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

Crea un archivo `.env` en la raíz con el siguiente contenido:

```env
PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=Nordstage2
DB_NAME=ecommerce-api
DB_SCHEMA=ecommerce

JWT_SECRET=clave-secreta-jwt
```

---

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

Puedes usar [Postman](https://www.postman.com/) para probar las siguientes rutas:

```
POST    /api/users/login
POST    /api/users           # Registro
GET     /api/productos
POST    /api/pedidos
...
```

---

## 🤝 Contribución

1. Haz un fork de este repositorio
2. Crea una nueva rama: `git checkout -b feature/nueva-funcionalidad`
3. Realiza tus cambios y haz commit: `git commit -m 'Agrega nueva funcionalidad'`
4. Haz push a tu rama: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

---

## 👨‍💻 Autor

**Nicolás Amado**  
GitHub: [@AmadoProgramer](https://github.com/AmadoProgramer)

---

## 📜 Licencia

Este proyecto está bajo la licencia MIT.
