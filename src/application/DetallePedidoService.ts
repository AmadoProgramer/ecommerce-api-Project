import { DetallePedido } from "../domain/detalle-pedido/DetallePedido";
import { DetallePedidoPort } from "../domain/detalle-pedido/DetallePedidoPort";

export class DetallePedidoService {
  private port: DetallePedidoPort;

  constructor(port: DetallePedidoPort) {
    this.port = port;
  }

  async createDetallePedido(data: Omit<DetallePedido, "id">): Promise<number> {
    const { idPedido, idProducto, cantidad, precioUnitario } = data;
    // Validaciones
    if (isNaN(idPedido) || idPedido <= 0) {
      throw new Error("ID de pedido inválido");
    }
    if (isNaN(idProducto) || idProducto <= 0) {
      throw new Error("ID de producto inválido");
    }
    if (!Number.isInteger(cantidad) || cantidad <= 0) {
      throw new Error("La cantidad debe ser un entero mayor que 0");
    }
    if (typeof precioUnitario !== 'number' || precioUnitario <= 0) {
      throw new Error("El precio unitario debe ser un número mayor que 0");
    }
    return await this.port.createDetallePedido(data);
  }

  async getDetallePedidoById(id: number): Promise<DetallePedido | null> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID inválido");
    }
    return await this.port.getDetallePedidoById(id);
  }

  async getAllDetallePedidos(): Promise<DetallePedido[]> {
    return await this.port.getAllDetallePedidos();
  }

  async updateDetallePedido(id: number, data: Partial<DetallePedido>): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID inválido para actualización");
    }
    if (data.cantidad !== undefined && (!Number.isInteger(data.cantidad) || data.cantidad <= 0)) {
      throw new Error("La cantidad debe ser un entero mayor que 0");
    }
    if (data.precioUnitario !== undefined && (typeof data.precioUnitario !== 'number' || data.precioUnitario <= 0)) {
      throw new Error("El precio unitario debe ser un número mayor que 0");
    }
    return await this.port.updateDetallePedido(id, data);
  }

  async deleteDetallePedido(id: number): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID inválido para eliminación");
    }
    return await this.port.deleteDetallePedido(id);
  }
}
