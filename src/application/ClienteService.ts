import { Cliente } from "../domain/cliente/Cliente";
import { ClientePort } from "../domain/cliente/ClientePort";

export class ClienteService {
    private port: ClientePort;

    constructor(port: ClientePort) {
        this.port = port;
    }

    async createCliente(cliente: Omit<Cliente, "id">): Promise<number> {
        return await this.port.createCliente(cliente);
    }

    async getClienteById(id: number): Promise<Cliente | null> {
        return await this.port.getClienteById(id);
    }

    async getAllClientes(): Promise<Cliente[]> {
        return await this.port.getAllClientes();
    }

    async updateCliente(id: number, cliente: Partial<Cliente>): Promise<boolean> {
        return await this.port.updateCliente(id, cliente);
    }

    async deleteCliente(id: number): Promise<boolean> {
        return await this.port.deleteCliente(id);
    }
}
