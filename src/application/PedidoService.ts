import { Pedido } from "../domain/pedido/Pedido";
import { PedidoPort } from "../domain/pedido/PedidoPort";

export class PedidoService {
    private port: PedidoPort;

    constructor(port: PedidoPort) {
        this.port = port;
    }

    async createPedido(pedido: Omit<Pedido, "id">): Promise<number> {
        return await this.port.createPedido(pedido);
    }

    async getPedidoById(id: number): Promise<Pedido | null> {
        return await this.port.getPedidoById(id);
    }

    async getAllPedidos(): Promise<Pedido[]> {
        return await this.port.getAllPedidos();
    }

    async updatePedido(id: number, pedido: Partial<Pedido>): Promise<boolean> {
        return await this.port.updatePedido(id, pedido);
    }

    async deletePedido(id: number): Promise<boolean> {
        return await this.port.deletePedido(id);
    }
}
