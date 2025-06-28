import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-base';
import { Proveedor } from '../../domain/proveedor/Proveedor';
import { ProveedorPort } from '../../domain/proveedor/ProveedorPort';
import { ProveedorEntity } from '../entities/Proveedor';

export class ProveedorAdapter implements ProveedorPort {
  private repository: Repository<ProveedorEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(ProveedorEntity);
  }

  private toDomain(entity: ProveedorEntity): Proveedor {
    return {
      id: entity.id,
      nombre: entity.nombre,
      ruc: entity.ruc,
      email: entity.email,
      telefono: entity.telefono,
      direccion: entity.direccion,
      contactoNombre: entity.contactoNombre,
      contactoTelefono: entity.contactoTelefono,
      contactoEmail: entity.contactoEmail,
      fechaRegistro: entity.fechaRegistro,
      activo: entity.activo
    };
  }

  private toEntity(data: Omit<Proveedor, 'id' | 'fechaRegistro'>): ProveedorEntity {
    const entity = new ProveedorEntity();
    Object.assign(entity, data);
    return entity;
  }

  async createProveedor(data: Omit<Proveedor, 'id' | 'fechaRegistro'>): Promise<number> {
    const guardado = await this.repository.save(this.toEntity(data));
    return guardado.id;
  }

  async getAllProveedores(): Promise<Proveedor[]> {
    const result = await this.repository.find();
    return result.map(p => this.toDomain(p));
  }

  async getProveedorById(id: number): Promise<Proveedor | null> {
    const proveedor = await this.repository.findOne({ where: { id } });
    return proveedor ? this.toDomain(proveedor) : null;
  }

  async updateProveedor(id: number, data: Partial<Proveedor>): Promise<boolean> {
    const proveedor = await this.repository.findOne({ where: { id } });
    if (!proveedor) return false;
    Object.assign(proveedor, data);
    await this.repository.save(proveedor);
    return true;
  }

  async deleteProveedor(id: number): Promise<boolean> {
    const proveedor = await this.repository.findOne({ where: { id } });
    if (!proveedor) return false;
    await this.repository.remove(proveedor);
    return true;
  }
}
