import { Proveedor } from "../../domain/proveedor/Proveedor";
import { ProveedorPort } from "../../domain/proveedor/ProveedorPort";

export class ProveedorService {
  constructor(private readonly port: ProveedorPort) {}

  async createProveedor(proveedor: Omit<Proveedor, 'id' | 'fechaRegistro'>): Promise<number> {
    if (!proveedor.nombre || proveedor.nombre.trim().length < 3) {
      throw new Error("Nombre del proveedor inválido");
    }
    if (!proveedor.ruc || proveedor.ruc.trim().length < 5) {
      throw new Error("RUC inválido");
    }
    return await this.port.createProveedor(proveedor);
  }

  getAllProveedores(): Promise<Proveedor[]> {
    return this.port.getAllProveedores();
  }

  getProveedorById(id: number): Promise<Proveedor | null> {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido");
    return this.port.getProveedorById(id);
  }

  updateProveedor(id: number, data: Partial<Proveedor>): Promise<boolean> {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido");
    return this.port.updateProveedor(id, data);
  }

  deleteProveedor(id: number): Promise<boolean> {
    if (isNaN(id) || id <= 0) throw new Error("ID inválido");
    return this.port.deleteProveedor(id);
  }
}
