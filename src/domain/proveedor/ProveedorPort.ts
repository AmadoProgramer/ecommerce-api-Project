import { Proveedor } from './Proveedor';

export interface ProveedorPort {
  createProveedor(proveedor: Omit<Proveedor, 'id' | 'fechaRegistro'>): Promise<number>;
  getAllProveedores(): Promise<Proveedor[]>;
  getProveedorById(id: number): Promise<Proveedor | null>;
  updateProveedor(id: number, data: Partial<Proveedor>): Promise<boolean>;
  deleteProveedor(id: number): Promise<boolean>;
}

