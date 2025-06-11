import { Repository } from "typeorm";
import { Producto } from "../../domain/producto/Producto";
import { ProductoPort } from "../../domain/producto/ProductoPort";
import { Categoria, Producto as ProductoEntity } from "../entities/Producto";
import { AppDataSource } from "../config/data-base";

export class ProductoAdapter implements ProductoPort {
  private repository: Repository<ProductoEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProductoEntity);
  }

  private toDomain(entity: ProductoEntity): Producto {
    return {
      id: entity.id_producto,
      nombre: entity.nombre,
      descripcion: entity.descripcion,
      precio: entity.precio,
      stock: entity.stock,
      categoria: entity.categoria,
    };
  }

  private toEntity(domain: Omit<Producto, "id_producto">): ProductoEntity {
    const entity = new ProductoEntity();
    entity.nombre = domain.nombre;
    entity.descripcion = domain.descripcion;
    entity.precio = domain.precio;
    entity.stock = domain.stock;
    entity.categoria = domain.categoria as Categoria;
    return entity;
  }

  async createProducto(data: Omit<Producto, "id_producto">): Promise<number> {
    const saved = await this.repository.save(this.toEntity(data));
    return saved.id_producto;
  }

  async getProductoById(id: number): Promise<Producto | null> {
    const entity = await this.repository.findOne({ where: { id_producto: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async updateProducto(id: number, data: Partial<Producto>): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_producto: id } });
    if (!entity) throw new Error("Producto not found");
    Object.assign(entity, data);
    await this.repository.save(entity);
    return true;
  }

  async deleteProducto(id: number): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_producto: id } });
    if (!entity) throw new Error("Producto not found");
    await this.repository.remove(entity);
    return true;
  }

  async getAllProductos(): Promise<Producto[]> {
    const all = await this.repository.find();
    return all.map(e => this.toDomain(e));
  }
}

