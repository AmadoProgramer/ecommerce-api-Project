import { Cliente } from "../domain/cliente/Cliente";
import { ClientePort } from "../domain/cliente/ClientePort";
import bcrypt from "bcryptjs";
import { AuthService } from "./AuthService";

export class ClienteService {
  private port: ClientePort;

  constructor(port: ClientePort) {
    this.port = port;
  }

  async login(email: string, password: string): Promise<string> {
    const existingCliente = await this.port.getClienteByEmail(email);
    console.log("Usuario encontrado:", existingCliente);
    if (!existingCliente) {
      throw new Error("Credenciales incorrectas");
    }

    const passwordMatch = await bcrypt.compare(password,existingCliente.contrasena);
    if (!passwordMatch) {
      throw new Error("Credenciales incorrectas");
    }
    const token = AuthService.generateToken({
      id: existingCliente.id,
      email: existingCliente.email,
    });

    return token;
  }

  async createCliente(cliente: Omit<Cliente, "id">): Promise<number> {
    const existingCliente = await this.port.getClienteByEmail(cliente.email);
    if (existingCliente) {
      throw new Error("Ya existe un cliente con ese email");
    }
    const hashedPassword = await bcrypt.hash(cliente.contrasena, 10);
    cliente.contrasena = hashedPassword;
    return await this.port.createCliente(cliente);
  }

  async getClienteById(id: number): Promise<Cliente | null> {
    return await this.port.getClienteById(id);
  }

  async getClienteByEmail(email: string): Promise<Cliente | null> {
    return await this.port.getClienteByEmail(email);
  }

  async getAllClientes(): Promise<Cliente[]> {
    return await this.port.getAllClientes();
  }

  async updateCliente(id: number, cliente: Partial<Cliente>): Promise<boolean> {
    const existingCliente = await this.port.getClienteById(id);
    if (!existingCliente) {
      throw new Error("Cliente no encontrado");
    }

    if (cliente.email) {
      const emailTaken = await this.port.getClienteByEmail(cliente.email);
      if (emailTaken && emailTaken.id !== id) {
        throw new Error("Email ya registrado");
      }
    }

    if (cliente.contrasena) {
      cliente.contrasena = await bcrypt.hash(cliente.contrasena, 10);
    }

    return await this.port.updateCliente(id, cliente);
  }

  async deleteCliente(id: number): Promise<boolean> {
    const existingCliente = await this.port.getClienteById(id);
    if (!existingCliente) {
      throw new Error("Cliente no encontrado");
    }
    return await this.port.deleteCliente(id);
  }
}

