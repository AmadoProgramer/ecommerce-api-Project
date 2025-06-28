import { Stock } from './Stock';

export interface StockPort {
  createStock(stock: Stock): Promise<number>;
  getStockByProducto(productoId: number): Promise<Stock[]>;
  deleteStock(id: number): Promise<void>;
}