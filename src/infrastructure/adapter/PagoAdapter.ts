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
      idPedido: entity.pedido?.id_pedido ?? 0, // <- accedemos desde la relación
      monto: parseFloat(entity.monto.toString()),
      fechaPago: entity.fecha_pago,
      metodoPago: entity.metodo_pago,
      confirmado: entity.confirmado || false,
    };
  }

  private toEntity(domain: Omit<Pago, "id">): PagoEntity {
    const entity = new PagoEntity();

    // Asignamos solo el id del pedido como relación
    entity.pedido = { id_pedido: domain.idPedido } as any;

    entity.monto = domain.monto;
    entity.fecha_pago = domain.fechaPago;
    entity.metodo_pago = domain.metodoPago as MetodoPago;
    entity.confirmado = domain.confirmado || false;

    return entity;
  }

  async createPago(data: Omit<Pago, "id">): Promise<number> {
    const saved = await this.repository.save(this.toEntity(data));
    return saved.id_pago;
  }

  async getPagoById(id: number): Promise<Pago | null> {
    const entity = await this.repository.findOne({
      where: { id_pago: id },
      relations: ["pedido"], // <- importante para poder acceder a `pedido.id_pedido`
    });
    return entity ? this.toDomain(entity) : null;
  }

  async updatePago(id: number, data: Partial<Pago>): Promise<boolean> {
    const entity = await this.repository.findOne({ where: { id_pago: id } });
    if (!entity) throw new Error("Pago not found");

    // Actualizamos campos uno por uno si están presentes
    if (data.monto !== undefined) entity.monto = data.monto;
    if (data.fechaPago !== undefined) entity.fecha_pago = data.fechaPago;
    if (data.metodoPago !== undefined) entity.metodo_pago = data.metodoPago as MetodoPago;
    if (data.confirmado !== undefined) entity.confirmado = data.confirmado;

    if (data.idPedido !== undefined) {
      entity.pedido = { id_pedido: data.idPedido } as any;
    }

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
    const entities = await this.repository.find({ relations: ["pedido"] }); // <- para poder mapear correctamente
    return entities.map(e => this.toDomain(e));
  }
}
