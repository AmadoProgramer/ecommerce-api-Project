import { Repository } from "typeorm";
import { Cliente } from "../../domain/cliente/Cliente";
import { ClientePort } from "../../domain/cliente/ClientePort";
import { Cliente as ClienteEntity } from "../entities/Cliente";
import { AppDataSource } from "../config/data-base";

export class ClienteAdapter implements ClientePort {
  private clienteRepository: Repository<ClienteEntity>;
  constructor() {
    this.clienteRepository = AppDataSource.getRepository(ClienteEntity);
  }

  private toDomain(entity: ClienteEntity): Cliente {
    return {
      id: entity.id_cliente,
      nombre: entity.nombre,
      email: entity.email,
      telefono: entity.telefono,
      cedula: entity.cedula,
      direccion: entity.direccion,
      contrasena: entity.contrasena_hash,
      estado: entity.estado || 1, 
    };
  }

  private toEntity(cliente: Omit<Cliente, "id">): ClienteEntity {
    const entity = new ClienteEntity();
    entity.nombre = cliente.nombre;
    entity.email = cliente.email;
    entity.telefono = cliente.telefono;
    entity.cedula = cliente.cedula;
    entity.direccion = cliente.direccion;
    entity.contrasena_hash = cliente.contrasena;
    return entity;
  }

  async createCliente(data: Omit<Cliente, "id">): Promise<number> {
    const saved = await this.clienteRepository.save(this.toEntity(data));
    return saved.id_cliente;
  }

  async getClienteById(id: number): Promise<Cliente | null> {
    const entity = await this.clienteRepository.findOne({ where: { id_cliente: id } });
    return entity ? this.toDomain(entity) : null;
  }

  async updateCliente(id: number, data: Partial<Cliente>): Promise<boolean> {
    const entity = await this.clienteRepository.findOne({ where: { id_cliente: id } });
    if (!entity) throw new Error("Cliente not found");
    Object.assign(entity, data);
    await this.clienteRepository.save(entity);
    return true;
  }

  async deleteCliente(id: number): Promise<boolean> {
    const entity = await this.clienteRepository.findOne({ where: { id_cliente: id } });
    if (!entity) throw new Error("Cliente not found");
    await this.clienteRepository.remove(entity);
    return true;
  }
  async getClienteByEmail(email: string): Promise<Cliente | null> {
  
  // Búsqueda en la base de datos
  const entity = await this.clienteRepository.findOne({ where: { email: email.trim() } });
  if (!entity) {
    // No existe ningún cliente con ese correo
    return null;
  }
  // Mapear a dominio y devolver
  return this.toDomain(entity);
}
  async getAllClientes(): Promise<Cliente[]> {
    const all = await this.clienteRepository.find();
    return all.map(this.toDomain);
  }
}
