import { Producto } from './Producto';

export interface ProductoPort {
  createProducto(producto: Omit<Producto, 'id'>): Promise<number>;
  getProductoById(id: number): Promise<Producto | null>;
  updateProducto(id: number, producto: Partial<Producto>): Promise<boolean>;
  deleteProducto(id: number): Promise<boolean>;
  getAllProductos(): Promise<Producto[]>;
}