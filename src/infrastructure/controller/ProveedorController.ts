import { Request, Response } from 'express';
import { ProveedorService } from '../../application/services/ProveedorService';

export class ProveedorController {
  constructor(private app: ProveedorService) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const id = await this.app.createProveedor(req.body);
      return res.status(201).json({ message: 'Proveedor creado', id });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async list(_req: Request, res: Response): Promise<Response> {
    try {
      const data = await this.app.getAllProveedores();
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const proveedor = await this.app.getProveedorById(id);
      if (!proveedor) return res.status(404).json({ error: 'Proveedor no encontrado' });
      return res.json(proveedor);
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const updated = await this.app.updateProveedor(id, req.body);
      if (!updated) return res.status(404).json({ error: 'Proveedor no encontrado' });
      return res.json({ message: 'Proveedor actualizado' });
    } catch (error) {
      return res.status(400).json({ error: (error as Error).message });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = parseInt(req.params.id);
      const deleted = await this.app.deleteProveedor(id);
      if (!deleted) return res.status(404).json({ error: 'Proveedor no encontrado' });
      return res.json({ message: 'Proveedor eliminado' });
    } catch (error) {
      return res.status(500).json({ error: (error as Error).message });
    }
  }
}
