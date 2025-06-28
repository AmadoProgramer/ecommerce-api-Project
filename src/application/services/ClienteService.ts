import { ClientePort } from "../../domain/cliente/ClientePort";
import { Cliente } from "../../domain/cliente/Cliente";
import bcrypt from "bcryptjs";
import { AuthService } from "./AuthService";
import {
  ClienteCreateDto,
  ClienteUpdateDto,
  ClienteResponseDto,
} from "../dtos/cliente";

export class ClienteService {
  private port: ClientePort;

  constructor(port: ClientePort) {
    this.port = port;
  }

  async login(email: string, password: string): Promise<string> {
    const existingCliente = await this.port.getClienteByEmail(email);
    if (!existingCliente) {
      throw new Error("Credenciales incorrectas");
    }

    const passwordMatch = await bcrypt.compare(password, existingCliente.contrasena);
    if (!passwordMatch) {
      throw new Error("Credenciales incorrectas");
    }

    const token = AuthService.generateToken({
      id: existingCliente.id,
      email: existingCliente.email,
    });

    return token;
  }

  async register(data: ClienteCreateDto): Promise<ClienteResponseDto> {
  const existingCliente = await this.port.getClienteByEmail(data.email);
  if (existingCliente) {
    throw new Error("Ya existe un cliente con ese email");
  }

  const hashedPassword = await bcrypt.hash(data.contrasena, 10);
  const clienteToCreate = { ...data, contrasena: hashedPassword };
  const id = await this.port.createCliente(clienteToCreate);

  const createdCliente = await this.port.getClienteById(id);
  if (!createdCliente) throw new Error("Error al recuperar cliente registrado");

  return createdCliente;
}

  async getClienteById(id: number): Promise<ClienteResponseDto | null> {
    return await this.port.getClienteById(id);
  }

  async getAllClientes(): Promise<ClienteResponseDto[]> {
    return await this.port.getAllClientes();
  }

  async updateCliente(id: number, cliente: ClienteUpdateDto): Promise<boolean> {
    if (cliente.contrasena) {
      cliente.contrasena = await bcrypt.hash(cliente.contrasena, 10);
    }
    return await this.port.updateCliente(id, cliente);
  }

  async deleteCliente(id: number): Promise<boolean> {
    return await this.port.deleteCliente(id);
  }
}




