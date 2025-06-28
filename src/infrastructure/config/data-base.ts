import { DataSource } from "typeorm";
import dotenv from "dotenv";
import envs from "./environment-vars";

// Cargar variables
dotenv.config();

// Importar entidades necesarias
import { User } from "../entities/User";
import { Cliente } from "../entities/Cliente";
import { Producto } from "../entities/Producto";
import { Pedido } from "../entities/Pedido";
import { DetallePedido } from "../entities/DetallePedido";
import { Pago } from "../entities/Pago";
import { Proveedor } from '../../domain/proveedor/Proveedor';
import { StockEntity } from "../entities/Stock";
import { ProveedorEntity } from "../entities/Proveedor";

// Configurar TypeORM
export const AppDataSource = new DataSource({
  type: "postgres",
  host: envs.DB_HOST,
  port: envs.DB_PORT,
  username: envs.DB_USER,
  password: envs.DB_PASSWORD,
  database: envs.DB_NAME,
  schema: envs.DB_SCHEMA,
  synchronize: true, // Solo en desarrollo
  logging: true,
  entities: [User, Cliente, Producto, Pedido, DetallePedido, Pago, StockEntity, ProveedorEntity]
});

// Inicialización
export const connectDB = async () => {
  try {
    await AppDataSource.initialize();
    console.log(" Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1);
  }
};
