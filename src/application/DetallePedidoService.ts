import { DetallePedido } from "../domain/detalle-pedido/DetallePedido";
import { DetallePedidoPort } from "../domain/detalle-pedido/DetallePedidoPort";

export class DetallePedidoService {
    private port: DetallePedidoPort;

    constructor(port: DetallePedidoPort) {
        this.port = port;
    }

    async createDetallePedido(detallePedido: Omit<DetallePedido, "id">): Promise<number> {
        return await this.port.createDetallePedido(detallePedido);
    }

    async getDetallePedidoById(id: number): Promise<DetallePedido | null> {
        return await this.port.getDetallePedidoById(id);
    }

    async getAllDetallePedidos(): Promise<DetallePedido[]> {
        return await this.port.getAllDetallePedidos();
    }

    async updateDetallePedido(id: number, detallePedido: Partial<DetallePedido>): Promise<boolean> {
        return await this.port.updateDetallePedido(id, detallePedido);
    }

    async deleteDetallePedido(id: number): Promise<boolean> {
        return await this.port.deleteDetallePedido(id);
    }
}
