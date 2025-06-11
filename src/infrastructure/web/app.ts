import express, { Application } from "express";
import cors from "cors";
import userRoutes from "../../infrastructure/routes/UserRoutes";
import productoRoutes from "../../infrastructure/routes/ProductoRoutes";
import clienteRoutes from "../../infrastructure/routes/ClienteRoutes";
import pedidoRoutes from "../../infrastructure/routes/PedidoRoutes";
import detallePedidoRoutes from "../../infrastructure/routes/DetallePedidoRoutes";
import pagoRoutes from "../../infrastructure/routes/PagoRoutes";

export class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/productos", productoRoutes);
    this.app.use("/api/clientes", clienteRoutes);
    this.app.use("/api/pedidos", pedidoRoutes);
    this.app.use("/api/detalles-pedido", detallePedidoRoutes);
    this.app.use("/api/pagos", pagoRoutes);
  }

  public getApp(): Application {
    return this.app;
  }
}

export default new App().getApp();