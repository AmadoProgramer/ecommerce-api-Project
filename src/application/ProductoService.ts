import { Producto } from "../domain/producto/Producto";
import { ProductoPort } from "../domain/producto/ProductoPort";
import { Categoria } from "../infrastructure/entities/Producto";

export class ProductoService {
  private port: ProductoPort;

  constructor(port: ProductoPort) {
    this.port = port;
  }

  async createProducto(producto: Omit<Producto, "id">): Promise<number> {
    // Validaciones básicas del producto
    if (!producto.nombre || producto.nombre.trim().length < 3) {
      throw new Error("El nombre del producto debe tener al menos 3 caracteres");
    }

    if (!producto.descripcion || producto.descripcion.trim().length < 10) {
      throw new Error("La descripción del producto debe tener al menos 10 caracteres");
    }

    if (producto.precio <= 0) {
      throw new Error("El precio del producto debe ser mayor que 0");
    }

    if (!Object.values(Categoria).includes(producto.categoria)) {
      throw new Error("Categoría no válida para el producto");
    }

    if (producto.stock < 0) {
      throw new Error("El stock no puede ser negativo");
    }

    return await this.port.createProducto(producto);
  }

  async getProductoById(id: number): Promise<Producto | null> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID inválido para el producto");
    }
    return await this.port.getProductoById(id);
  }

  async getAllProductos(): Promise<Producto[]> {
    return await this.port.getAllProductos();
  }

  async updateProducto(id: number, producto: Partial<Producto>): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID inválido para actualizar producto");
    }

    if (producto.precio !== undefined && producto.precio <= 0) {
      throw new Error("El precio debe ser mayor que 0");
    }

    if (
      producto.nombre !== undefined &&
      producto.nombre.trim().length < 3
    ) {
      throw new Error("El nombre debe tener al menos 3 caracteres");
    }

    if (
      producto.descripcion !== undefined &&
      producto.descripcion.trim().length < 10
    ) {
      throw new Error("La descripción debe tener al menos 10 caracteres");
    }

    if (
      producto.stock !== undefined &&
      (isNaN(producto.stock) || producto.stock < 0)
    ) {
      throw new Error("El stock debe ser mayor o igual a 0");
    }

    return await this.port.updateProducto(id, producto);
  }

  async deleteProducto(id: number): Promise<boolean> {
    if (isNaN(id) || id <= 0) {
      throw new Error("ID inválido para eliminar producto");
    }
    return await this.port.deleteProducto(id);
  }
}

