import { DetallePedidoService } from "../../application/DetallePedidoService";
import { Request, Response } from "express";

export class DetallePedidoController {
  private service: DetallePedidoService;

  constructor(service: DetallePedidoService) {
    this.service = service;
  }

  async createDetallePedido(req: Request, res: Response): Promise<Response> {
    const { idPedido, idProducto, cantidad, precioUnitario } = req.body;
    try {
      const idDetalle = await this.service.createDetallePedido({ idPedido, idProducto, cantidad, precioUnitario });
      return res.status(201).json({ message: "Detalle de pedido creado con éxito", idDetalle });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido") || msg.includes("mayor")
        ? res.status(400).json({ error: msg })
        : res.status(500).json({ error: "Error en servidor", details: msg });
    }
  }

  async getDetallePedidoById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      const detalle = await this.service.getDetallePedidoById(id);
      if (!detalle) {
        return res.status(404).json({ error: "Detalle de pedido no encontrado" });
      }
      return res.status(200).json(detalle);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: msg });
    }
  }

  async getAllDetallePedidos(_req: Request, res: Response): Promise<Response> {
    try {
      const list = await this.service.getAllDetallePedidos();
      return res.status(200).json(list);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: "Error al obtener detalles de pedido", details: msg });
    }
  }

  async updateDetallePedido(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      await this.service.updateDetallePedido(id, req.body);
      return res.status(200).json({ message: "Detalle de pedido actualizado con éxito" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido")
        ? res.status(400).json({ error: msg })
        : msg.includes("no encontrado")
        ? res.status(404).json({ error: msg })
        : res.status(500).json({ error: "Error al actualizar detalle de pedido", details: msg });
    }
  }

  async deleteDetallePedido(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      await this.service.deleteDetallePedido(id);
      return res.status(200).json({ message: "Detalle de pedido eliminado con éxito" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido")
        ? res.status(400).json({ error: msg })
        : msg.includes("no encontrado")
        ? res.status(404).json({ error: msg })
        : res.status(500).json({ error: "Error al eliminar detalle de pedido", details: msg });
    }
  }
}
