import { Cliente } from './Cliente';

export interface ClientePort {
  createCliente(cliente: Omit<Cliente, 'id'>): Promise<number>;
  getClienteById(id: number): Promise<Cliente | null>;
  updateCliente(id: number, cliente: Partial<Cliente>): Promise<boolean>;
  deleteCliente(id: number): Promise<boolean>;
  getAllClientes(): Promise<Cliente[]>;
}