import {
  ClienteCreateDto,
  ClienteUpdateDto,
  ClienteResponseDto,
} from "../../application/dtos/cliente";
import { Cliente } from "./Cliente";

export interface ClientePort {
  createCliente(cliente: ClienteCreateDto): Promise<number>;
  getClienteById(id: number): Promise<ClienteResponseDto | null>;
  getClienteByEmail(email: string): Promise<Cliente | null>; // dominio para login
  updateCliente(id: number, cliente: ClienteUpdateDto): Promise<boolean>;
  deleteCliente(id: number): Promise<boolean>;
  getAllClientes(): Promise<ClienteResponseDto[]>;
}

