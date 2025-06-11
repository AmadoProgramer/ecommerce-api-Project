import { Repository } from "typeorm";
import { DetallePedido } from "../../domain/detalle-pedido/DetallePedido";
import { DetallePedidoPort } from "../../domain/detalle-pedido/DetallePedidoPort";
import { DetallePedido as DetallePedidoEntity } from "../entities/DetallePedido";
import { AppDataSource } from "../config/data-base";

export class DetallePedidoAdapter implements DetallePedidoPort {
  private repository: Repository<DetallePedidoEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(DetallePedidoEntity);
  }

  private toDomain(entity: DetallePedidoEntity): DetallePedido {
    return {
      id: entity.id_detalle,
      idPedido: entity.id_pedido,
      idProducto: entity.id_producto,
      cantidad: entity.cantidad,
      precioUnitario: parseFloat(entity.precio_unitario.toString())
    };
  }

  private toEntity(domain: Omit<DetallePedido, "id_detalle">): DetallePedidoEntity {
    const entity = new DetallePedidoEntity();
    entity.id_pedido = domain.idPedido;
    entity.id_producto = domain.idProducto;
    entity.cantidad = domain.cantidad;
    entity.precio_unitario = domain.precioUnitario;
    return entity;
  }

  async createDetallePedido(data: Omit<DetallePedido, "id_detalle">): Promise<number> {
    const saved = await this.repository.save(this.toEntity(data));
    return saved.id_detalle;
  }

  async getDetallePedidoById(id: number): Promise<DetallePedido | null> {
    const entity = await this.repository.findOne({ where: { id_detalle: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async updateDetallePedido(id: number, data: Partial<DetallePedido>): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_detalle: id } });
    if (!entity) throw new Error("DetallePedido not found");
    Object.assign(entity, data);
    await this.repository.save(entity);
    return true;
  }

  async deleteDetallePedido(id: number): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_detalle: id } });
    if (!entity) throw new Error("DetallePedido not found");
    await this.repository.remove(entity);
    return true;
  }

  async getAllDetallePedidos(): Promise<DetallePedido[]> {
    const entities = await this.repository.find();
    return entities.map(e => this.toDomain(e));
  }
}
