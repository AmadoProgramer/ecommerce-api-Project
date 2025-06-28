import { PagoService } from "../../application/services/PagoService";
import { Request, Response } from "express";

export class PagoController {
  private service: PagoService;

  constructor(service: PagoService) {
    this.service = service;
  }

  async createPago(req: Request, res: Response): Promise<Response> {
    const { idPedido, monto, fechaPago, metodoPago, confirmado } = req.body;
    try {
      const id = await this.service.createPago({ idPedido, monto, fechaPago, metodoPago, confirmado });
      return res.status(201).json({ message: "Pago registrado con éxito", idPago: id });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido")
        ? res.status(400).json({ error: msg })
        : res.status(500).json({ error: "Error en servidor", details: msg });
    }
  }

  async getPagoById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      const pago = await this.service.getPagoById(id);
      if (!pago) {
        return res.status(404).json({ error: "Pago no encontrado" });
      }
      return res.status(200).json(pago);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: msg });
    }
  }

  async getAllPagos(_req: Request, res: Response): Promise<Response> {
    try {
      const pagos = await this.service.getAllPagos();
      return res.status(200).json(pagos);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: "Error al obtener pagos", details: msg });
    }
  }

  async updatePago(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      await this.service.updatePago(id, req.body);
      return res.status(200).json({ message: "Pago actualizado con éxito" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido")
        ? res.status(400).json({ error: msg })
        : res.status(404).json({ error: msg });
    }
  }

  async deletePago(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      await this.service.deletePago(id);
      return res.status(200).json({ message: "Pago eliminado con éxito" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido")
        ? res.status(400).json({ error: msg })
        : res.status(404).json({ error: msg });
    }
  }
}
