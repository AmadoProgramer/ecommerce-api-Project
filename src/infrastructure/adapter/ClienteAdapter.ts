import { Repository } from "typeorm";
import { ClientePort } from "../../domain/cliente/ClientePort";
import { Cliente as ClienteEntity } from "../entities/Cliente";
import { AppDataSource } from "../config/data-base";
import {
  ClienteCreateDto,
  ClienteUpdateDto,
  ClienteResponseDto,
} from "../../application/dtos/cliente";
import { Cliente } from "../../domain/cliente/Cliente"; // Asegúrate de importar esto

export class ClienteAdapter implements ClientePort {
  private clienteRepository: Repository<ClienteEntity>;

  constructor() {
    this.clienteRepository = AppDataSource.getRepository(ClienteEntity);
  }

  private toResponseDto(entity: ClienteEntity): ClienteResponseDto {
    return {
      id: entity.id_cliente,
      nombre: entity.nombre,
      email: entity.email,
      telefono: entity.telefono,
      cedula: entity.cedula,
      direccion: entity.direccion,
      estado: entity.estado || 1,
    };
  }

  private toDomain(entity: ClienteEntity): Cliente {
    return {
      id: entity.id_cliente,
      nombre: entity.nombre,
      email: entity.email,
      telefono: entity.telefono,
      cedula: entity.cedula,
      direccion: entity.direccion,
      contrasena: entity.contrasena_hash, // necesario para el login
      estado: entity.estado ?? 1,
    };
  }

  private toEntity(dto: ClienteCreateDto | ClienteUpdateDto): ClienteEntity {
    const entity = new ClienteEntity();

    if ("nombre" in dto && dto.nombre) entity.nombre = dto.nombre;
    if ("email" in dto && dto.email) entity.email = dto.email;
    if ("telefono" in dto && dto.telefono) entity.telefono = dto.telefono;
    if ("direccion" in dto && dto.direccion) entity.direccion = dto.direccion;
    if ("estado" in dto && dto.estado !== undefined) entity.estado = dto.estado;
    if ("cedula" in dto && dto.cedula) entity.cedula = dto.cedula;
    if ("contrasena" in dto && dto.contrasena) entity.contrasena_hash = dto.contrasena;

    return entity;
  }

  async createCliente(dto: ClienteCreateDto): Promise<number> {
    const entity = this.toEntity(dto);
    const saved = await this.clienteRepository.save(entity);
    return saved.id_cliente;
  }

  async getClienteById(id: number): Promise<ClienteResponseDto | null> {
    const entity = await this.clienteRepository.findOne({ where: { id_cliente: id } });
    return entity ? this.toResponseDto(entity) : null;
  }

  async getClienteByEmail(email: string): Promise<Cliente | null> {
    const entity = await this.clienteRepository.findOne({ where: { email: email.trim() } });
    return entity ? this.toDomain(entity) : null;
  }

  async updateCliente(id: number, dto: ClienteUpdateDto): Promise<boolean> {
    const entity = await this.clienteRepository.findOne({ where: { id_cliente: id } });
    if (!entity) throw new Error("Cliente no encontrado");

    if (dto.nombre) entity.nombre = dto.nombre;
    if (dto.email) entity.email = dto.email;
    if (dto.telefono) entity.telefono = dto.telefono;
    if (dto.direccion) entity.direccion = dto.direccion;
    if (dto.estado !== undefined) entity.estado = dto.estado;
    if (dto.contrasena) entity.contrasena_hash = dto.contrasena;

    await this.clienteRepository.save(entity);
    return true;
  }

  async deleteCliente(id: number): Promise<boolean> {
    const entity = await this.clienteRepository.findOne({ where: { id_cliente: id } });
    if (!entity) throw new Error("Cliente no encontrado");

    await this.clienteRepository.remove(entity);
    return true;
  }

  async getAllClientes(): Promise<ClienteResponseDto[]> {
    const all = await this.clienteRepository.find();
    return all.map(this.toResponseDto);
  }
}

