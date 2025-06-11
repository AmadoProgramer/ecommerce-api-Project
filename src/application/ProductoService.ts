import { Producto } from "../domain/producto/Producto";
import { ProductoPort } from "../domain/producto/ProductoPort";

export class ProductoService {
    private port: ProductoPort;

    constructor(port: ProductoPort) {
        this.port = port;
    }

    async createProducto(producto: Omit<Producto, "id">): Promise<number> {
        return await this.port.createProducto(producto);
    }

    async getProductoById(id: number): Promise<Producto | null> {
        return await this.port.getProductoById(id);
    }

    async getAllProductos(): Promise<Producto[]> {
        return await this.port.getAllProductos();
    }

    async updateProducto(id: number, producto: Partial<Producto>): Promise<boolean> {
        return await this.port.updateProducto(id, producto);
    }

    async deleteProducto(id: number): Promise<boolean> {
        return await this.port.deleteProducto(id);
    }
}
