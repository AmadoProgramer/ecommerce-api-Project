import { Pago } from "../../domain/pago/Pago";
import { PagoPort } from "../../domain/pago/PagoPort";

export class PagoService {
  private port: PagoPort;

  constructor(port: PagoPort) {
    this.port = port;
  }

  async createPago(data: Omit<Pago, "id">): Promise<number> {
    const { idPedido, monto, fechaPago, metodoPago, confirmado } = data;
    if (isNaN(idPedido) || idPedido <= 0) {
      throw new Error("ID de pedido inválido");
    }
    if (typeof monto !== 'number' || monto <= 0) {
      throw new Error("El monto debe ser un número mayor que 0");
    }
    const fecha = new Date(fechaPago);
    if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
      throw new Error("Fecha de pago inválida");
    }
    if (!metodoPago || typeof metodoPago !== 'string' || metodoPago.trim().length < 3) {
      throw new Error("Método de pago inválido");
    }
    if (typeof confirmado !== 'boolean') {
      throw new Error("El campo 'confirmado' debe ser booleano");
    }
    return this.port.createPago({ idPedido, monto, fechaPago: fecha, metodoPago, confirmado });
  }

  async getPagoById(id: number): Promise<Pago | null> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID de pago inválido");
    }
    return this.port.getPagoById(id);
  }

  async getAllPagos(): Promise<Pago[]> {
    return this.port.getAllPagos();
  }

  async updatePago(id: number, data: Partial<Pago>): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID de pago inválido");
    }
    if (data.idPedido !== undefined && (isNaN(data.idPedido) || data.idPedido <= 0)) {
      throw new Error("ID de pedido inválido");
    }
    if (data.monto !== undefined && (typeof data.monto !== 'number' || data.monto <= 0)) {
      throw new Error("El monto debe ser un número mayor que 0");
    }
    if (data.fechaPago !== undefined) {
      const fecha = new Date(data.fechaPago);
      if (!(fecha instanceof Date) || isNaN(fecha.getTime())) {
        throw new Error("Fecha de pago inválida");
      }
      data.fechaPago = fecha;
    }
    if (data.metodoPago !== undefined && (typeof data.metodoPago !== 'string' || data.metodoPago.trim().length < 3)) {
      throw new Error("Método de pago inválido");
    }
    if (data.confirmado !== undefined && typeof data.confirmado !== 'boolean') {
      throw new Error("El campo 'confirmado' debe ser booleano");
    }
    return this.port.updatePago(id, data);
  }

  async deletePago(id: number): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID de pago inválido");
    }
    return this.port.deletePago(id);
  }
}

