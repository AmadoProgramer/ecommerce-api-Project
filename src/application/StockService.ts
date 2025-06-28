import { Stock } from '../domain/stock/Stock';
import { StockPort } from '../domain/stock/StockPort';

export class StockService {
  private port: StockPort;

  constructor(port: StockPort) {
    this.port = port;
  }

  async createStock(stock: Omit<Stock, 'id'>): Promise<number> {
    if (!stock.lote || stock.lote.trim().length < 3) {
      throw new Error("El lote debe tener al menos 3 caracteres");
    }

    if (isNaN(stock.cantidad) || stock.cantidad <= 0) {
      throw new Error("La cantidad debe ser mayor que 0");
    }

    if (isNaN(stock.precioIngreso) || stock.precioIngreso <= 0) {
      throw new Error("El precio de ingreso debe ser mayor que 0");
    }

    if (!stock.productoId || stock.productoId <= 0) {
      throw new Error("ID de producto inválido");
    }

    if (!stock.proveedorId || stock.proveedorId <= 0) {
      throw new Error("ID de proveedor inválido");
    }

    return await this.port.createStock(stock);
  }

  async getStockByProduct(productoId: number): Promise<Stock[]> {
    if (isNaN(productoId) || productoId <= 0) {
      throw new Error("ID de producto inválido");
    }

    return await this.port.getStockByProducto(productoId);
  }

  async deleteStock(id: number): Promise<void> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID de stock inválido");
    }

    return await this.port.deleteStock(id);
  }
}
