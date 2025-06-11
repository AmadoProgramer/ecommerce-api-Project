import { Pago } from "../domain/pago/Pago";
import { PagoPort } from "../domain/pago/PagoPort";

export class PagoService {
    private port: PagoPort;

    constructor(port: PagoPort) {
        this.port = port;
    }

    async createPago(pago: Omit<Pago, "id">): Promise<number> {
        return await this.port.createPago(pago);
    }

    async getPagoById(id: number): Promise<Pago | null> {
        return await this.port.getPagoById(id);
    }

    async getAllPagos(): Promise<Pago[]> {
        return await this.port.getAllPagos();
    }

    async updatePago(id: number, pago: Partial<Pago>): Promise<boolean> {
        return await this.port.updatePago(id, pago);
    }

    async deletePago(id: number): Promise<boolean> {
        return await this.port.deletePago(id);
    }
}
