import { Pedido } from "../domain/pedido/Pedido";
import { PedidoPort } from "../domain/pedido/PedidoPort";
import { EstadoPedido } from "../infrastructure/entities/Pedido";

export class PedidoService {
  private port: PedidoPort;

  constructor(port: PedidoPort) {
    this.port = port;
  }

  async createPedido(data: Omit<Pedido, "id_pedido">): Promise<number> {
    const { id_cliente, fecha, estado } = data;
    if (isNaN(id_cliente) || id_cliente <= 0) {
      throw new Error("ID de cliente inválido");
    }
    if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
      throw new Error("Fecha de pedido inválida");
    }
    if (!Object.values(EstadoPedido).includes(estado)) {
      throw new Error("Estado de pedido no válido");
    }
    return this.port.createPedido(data);
  }

  async getPedidoById(id: number): Promise<Pedido | null> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID de pedido inválido");
    }
    return this.port.getPedidoById(id);
  }

  async getAllPedidos(): Promise<Pedido[]> {
    return this.port.getAllPedidos();
  }

  async updatePedido(id: number, data: Partial<Pedido>): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID de pedido inválido");
    }
    if (data.fecha !== undefined && (!(data.fecha instanceof Date) || isNaN(data.fecha.getTime()))) {
      throw new Error("Fecha de pedido inválida");
    }
    if (data.estado !== undefined && !Object.values(EstadoPedido).includes(data.estado)) {
      throw new Error("Estado de pedido no válido");
    }
    return this.port.updatePedido(id, data);
  }

  async deletePedido(id: number): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID de pedido inválido");
    }
    return this.port.deletePedido(id);
  }

  async cancelPedido(id: number): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID de pedido inválido");
    }
    // Cambiamos el estado a CANCELADO
    return this.port.updatePedido(id, { estado: EstadoPedido.CANCELADO });
  }
  
}
