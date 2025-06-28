import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-base';
import { Stock } from '../../domain/stock/Stock';
import { StockPort } from '../../domain/stock/StockPort';
import { StockEntity } from '../entities/Stock';

export class StockAdapter implements StockPort {
  private repository: Repository<StockEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(StockEntity);
  }

  private toDomain(entity: StockEntity): Stock {
    return {
      id: entity.id,
      productoId: entity.productoId,
      lote: entity.lote,
      cantidad: entity.cantidad,
      precioIngreso: Number(entity.precioIngreso),
      proveedorId: entity.proveedorId,
      fechaIngreso: entity.fechaIngreso,
      fechaVencimiento: entity.fechaVencimiento,
      ubicacion: entity.ubicacion,
      observaciones: entity.observaciones
    };
  }

  private toEntity(domain: Omit<Stock, 'id'>): StockEntity {
    const entity = new StockEntity();
    entity.productoId = domain.productoId;
    entity.lote = domain.lote;
    entity.cantidad = domain.cantidad;
    entity.precioIngreso = domain.precioIngreso;
    entity.proveedorId = domain.proveedorId;
    entity.fechaVencimiento = domain.fechaVencimiento;
    entity.ubicacion = domain.ubicacion;
    entity.observaciones = domain.observaciones;
    return entity;
  }

  async createStock(data: Omit<Stock, 'id'>): Promise<number> {
    const saved = await this.repository.save(this.toEntity(data));
    return saved.id;
  }

  async getStockByProducto(productoId: number): Promise<Stock[]> {
    const registros = await this.repository.find({ where: { productoId } });
    return registros.map(r => this.toDomain(r));
  }

  async deleteStock(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
