import { Repository } from "typeorm";
import { Pago } from "../../domain/pago/Pago";
import { PagoPort } from "../../domain/pago/PagoPort";
import { MetodoPago, Pago as PagoEntity } from "../entities/Pago";
import { AppDataSource } from "../config/data-base";

export class PagoAdapter implements PagoPort {
  private repository: Repository<PagoEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(PagoEntity);
  }

  private toDomain(entity: PagoEntity): Pago {
    return {
      id: entity.id_pago,
      idPedido: entity.id_pedido,
      monto: parseFloat(entity.monto.toString()),
      fechaPago: entity.fecha_pago,
      metodoPago: entity.metodo_pago,
      confirmado: entity.confirmado || false,
    };
  }

  private toEntity(domain: Omit<Pago, "id_pago">): PagoEntity {
    const entity = new PagoEntity();
    entity.id_pedido = domain.idPedido;
    entity.monto = domain.monto;
    entity.metodo_pago = domain.metodoPago as MetodoPago;
    entity.confirmado = domain.confirmado || false;
    entity.fecha_pago = domain.fechaPago;
    return entity;
  }

  async createPago(data: Omit<Pago, "id_pago">): Promise<number> {
    const saved = await this.repository.save(this.toEntity(data));
    return saved.id_pago;
  }

  async getPagoById(id: number): Promise<Pago | null> {
    const entity = await this.repository.findOne({ where: { id_pago: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async updatePago(id: number, data: Partial<Pago>): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_pago: id } });
    if (!entity) throw new Error("Pago not found");
    Object.assign(entity, data);
    await this.repository.save(entity);
    return true;
  }

  async deletePago(id: number): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_pago: id } });
    if (!entity) throw new Error("Pago not found");
    await this.repository.remove(entity);
    return true;
  }

  async getAllPagos(): Promise<Pago[]> {
    const entities = await this.repository.find();
    return entities.map(e => this.toDomain(e));
  }
}
