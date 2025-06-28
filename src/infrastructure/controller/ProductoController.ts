import { ProductoService } from "../../application/ProductoService";
import { Producto } from "../../domain/producto/Producto";
import { Request, Response } from "express";
import { Categoria } from "../../infrastructure/entities/Producto";

export class ProductoController {
  private service: ProductoService;

  constructor(service: ProductoService) {
    this.service = service;
  }

  async createProducto(req: Request, res: Response): Promise<Response> {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    try {
      const idProducto = await this.service.createProducto({ nombre, descripcion, precio, categoria });
      return res.status(201).json({ message: "Producto creado con éxito", idProducto });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      // Validación de cliente
      return msg.includes("Debe") || msg.includes("no válida")
        ? res.status(400).json({ error: msg })
        : res.status(500).json({ error: "Error en servidor", details: msg });
    }
  }

  async getProductoById(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      const producto = await this.service.getProductoById(id);
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      return res.status(200).json(producto);
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return res.status(400).json({ error: msg });
    }
  }

  async getAllProductos(req: Request, res: Response): Promise<Response> {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 20;
      const productos = await this.service.getAllProductos();
      const offset = (page - 1) * limit;
      const paginated = productos.slice(offset, offset + limit);
      return res.status(200).json({ data: paginated, meta: { total: productos.length, page, limit } });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return res.status(500).json({ error: "Error al obtener productos", details: msg });
    }
  }

  async updateProducto(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      await this.service.updateProducto(id, req.body);
      return res.status(200).json({ message: "Producto actualizado con éxito" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("ID inválido") || msg.includes("no válido")
        ? res.status(400).json({ error: msg })
        : msg.includes("no encontrado")
        ? res.status(404).json({ error: msg })
        : res.status(500).json({ error: "Error al actualizar producto", details: msg });
    }
  }

  async deleteProducto(req: Request, res: Response): Promise<Response> {
    const id = Number(req.params.id);
    try {
      await this.service.deleteProducto(id);
      return res.status(200).json({ message: "Producto eliminado correctamente" });
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      return msg.includes("ID inválido")
        ? res.status(400).json({ error: msg })
        : msg.includes("no encontrado")
        ? res.status(404).json({ error: msg })
        : res.status(500).json({ error: "Error al eliminar producto", details: msg });
    }
  }
}
