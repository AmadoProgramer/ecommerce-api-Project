import { PedidoService } from "../../application/PedidoService";
import { Request, Response } from "express";

export class PedidoController {
  private service: PedidoService;

  constructor(service: PedidoService) {
    this.service = service;
  }

  async createPedido(req: Request, res: Response): Promise<Response> {
    const { id_cliente, fecha, estado } = req.body;
    try {
      // Validación de id_cliente
      if (isNaN(Number(id_cliente)) || id_cliente <= 0) {
        return res.status(400).json({ error: "ID de cliente inválido" });
      }
      // Parsear y validar fecha
      const fechaDate = new Date(fecha);
      if (!(fechaDate instanceof Date) || isNaN(fechaDate.getTime())) {
        return res.status(400).json({ error: "Fecha de pedido inválida" });
      }
      // Delegar a servicio (sin id_pedido en payload)
      const idPedido = await this.service.createPedido({ id_cliente, fecha: fechaDate, estado });
      return res.status(201).json({ message: "Pedido creado con éxito", idPedido });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido") || msg.includes("no válido")
        ? res.status(400).json({ error: msg })
        : res.status(500).json({ error: "Error en servidor", details: msg });
    }
  }

  async getPedidoById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      const pedido = await this.service.getPedidoById(id);
      if (!pedido) {
        return res.status(404).json({ error: "Pedido no encontrado" });
      }
      return res.status(200).json(pedido);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: msg });
    }
  }

  async getAllPedidos(req: Request, res: Response): Promise<Response> {
    try {
      const pedidos = await this.service.getAllPedidos();
      return res.status(200).json(pedidos);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: "Error al obtener pedidos", details: msg });
    }
  }

  async updatePedido(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    const { fecha, estado } = req.body;
    try {
      const data: Partial<any> = {};
      if (fecha !== undefined) data.fecha = new Date(fecha);
      if (estado !== undefined) data.estado = estado;
      await this.service.updatePedido(id, data);
      return res.status(200).json({ message: "Pedido actualizado con éxito" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido")
        ? res.status(400).json({ error: msg })
        : msg.includes("no válido")
        ? res.status(400).json({ error: msg })
        : msg.includes("no encontrado")
        ? res.status(404).json({ error: msg })
        : res.status(500).json({ error: "Error al actualizar pedido", details: msg });
    }
  }

  async deletePedido(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      await this.service.deletePedido(id);
      return res.status(200).json({ message: "Pedido eliminado con éxito" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido")
        ? res.status(400).json({ error: msg })
        : msg.includes("no encontrado")
        ? res.status(404).json({ error: msg })
        : res.status(500).json({ error: "Error al eliminar pedido", details: msg });
    }
  }

  async cancelPedido(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      await this.service.cancelPedido(id);
      return res.status(200).json({ message: "Pedido cancelado con éxito" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("inválido")
        ? res.status(400).json({ error: msg })
        : res.status(500).json({ error: "Error al cancelar pedido", details: msg });
    }
  }
}