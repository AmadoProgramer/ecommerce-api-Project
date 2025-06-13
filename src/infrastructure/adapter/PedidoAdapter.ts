import { Repository } from "typeorm";
import { Pedido } from "../../domain/pedido/Pedido";
import { PedidoPort } from "../../domain/pedido/PedidoPort";
import { EstadoPedido, Pedido as PedidoEntity } from "../entities/Pedido";
import { AppDataSource } from "../config/data-base";

export class PedidoAdapter implements PedidoPort {
  private repository: Repository<PedidoEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(PedidoEntity);
  }

  private toDomain(entity: PedidoEntity): Pedido {
    return {
      id_pedido: entity.id_pedido,
      id_cliente: entity.id_cliente,
      fecha: entity.fecha,
      estado: entity.estado
    };
  }

  private toEntity(domain: Omit<Pedido, "id_pedido">): PedidoEntity {
    const entity = new PedidoEntity();
    entity.id_cliente = domain.id_cliente;
    entity.fecha = domain.fecha;
    entity.estado = domain.estado as EstadoPedido;
    return entity;
  }

  async createPedido(data: Omit<Pedido, "id_pedido">): Promise<number> {
    const saved = await this.repository.save(this.toEntity(data));
    return saved.id_pedido;
  }

  async getPedidoById(id: number): Promise<Pedido | null> {
    const entity = await this.repository.findOne({ where: { id_pedido: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async updatePedido(id: number, data: Partial<Pedido>): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_pedido: id } });
    if (!entity) throw new Error("Pedido not found");
    Object.assign(entity, data);
    await this.repository.save(entity);
    return true;
  }

  async deletePedido(id: number): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_pedido: id } });
    if (!entity) throw new Error("Pedido not found");
    await this.repository.remove(entity);
    return true;
  }

  async getAllPedidos(): Promise<Pedido[]> {
    const all = await this.repository.find();
    return all.map(e => this.toDomain(e));
  }
  async cancelPedido(id: number): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_pedido: id } });
    if (!entity) throw new Error("Pedido not found");
    entity.estado = EstadoPedido.CANCELADO;
    await this.repository.save(entity);
    return true;
  }
}