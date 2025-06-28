import { Request, Response } from "express";
import { StockService } from "../../application/services/StockService";
import { Stock } from "../../domain/stock/Stock";

export class StockController {
  private app: StockService;

  constructor(app: StockService) {
    this.app = app;
  }

  async createStock(req: Request, res: Response): Promise<Response> {
    try {
      const {
        productoId,
        lote,
        cantidad,
        precioIngreso,
        proveedorId,
        fechaIngreso,
        fechaVencimiento,
        ubicacion,
        observaciones,
      } = req.body;

      // Validaciones
      if (!lote || lote.trim().length < 3) {
        return res.status(400).json({ error: "Lote inválido (mín. 3 caracteres)" });
      }

      if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
        return res.status(400).json({ error: "Cantidad debe ser mayor a 0" });
      }

      if (!precioIngreso || isNaN(precioIngreso) || precioIngreso <= 0) {
        return res.status(400).json({ error: "Precio de ingreso debe ser mayor a 0" });
      }

      if (!productoId || isNaN(productoId) || productoId <= 0) {
        return res.status(400).json({ error: "ID de producto inválido" });
      }

      if (!proveedorId || isNaN(proveedorId) || proveedorId <= 0) {
        return res.status(400).json({ error: "ID de proveedor inválido" });
      }
      if (!fechaIngreso || isNaN(Date.parse(fechaIngreso))){
        return res.status(400).json({error: "Fecha de Ingreso invalidada"})
      }

      if (!fechaVencimiento || isNaN(Date.parse(fechaVencimiento))) {
        return res.status(400).json({ error: "Fecha de vencimiento inválida" });
      }

      const nuevoStock: Omit<Stock, "id"> = {
        productoId,
        lote: lote.trim(),
        cantidad,
        precioIngreso,
        proveedorId,
        fechaIngreso: new Date(fechaIngreso),
        fechaVencimiento: new Date(fechaVencimiento),
        ubicacion: ubicacion?.trim(),
        observaciones: observaciones?.trim(),
      };

      const id = await this.app.createStock(nuevoStock);
      return res.status(201).json({ message: "Stock registrado exitosamente", id });
    } catch (error) {
      return res.status(500).json({
        error: "Error al registrar el stock",
        details: error instanceof Error ? error.message : error,
      });
    }
  }

  async getStockByProduct(req: Request, res: Response): Promise<Response> {
    try {
      const productoId = parseInt(req.params.productoId);
      if (isNaN(productoId) || productoId <= 0) {
        return res.status(400).json({ error: "ID de producto inválido" });
      }

      const registros = await this.app.getStockByProduct(productoId);
      return res.status(200).json(registros);
    } catch (error) {
      return res.status(500).json({
        error: "Error al obtener stock",
        details: error instanceof Error ? error.message : error,
      });
    }
  }

  async deleteStock(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: "ID inválido para eliminar" });
      }

      await this.app.deleteStock(id);
      return res.status(200).json({ message: "Stock eliminado correctamente" });
    } catch (error) {
      return res.status(500).json({
        error: "Error al eliminar el stock",
        details: error instanceof Error ? error.message : error,
      });
    }
  }
}
