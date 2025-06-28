export interface Proveedor {
  id?: number;
  nombre: string;
  ruc: string;
  email?: string;
  telefono?: string;
  direccion?: string;
  contactoNombre?: string;
  contactoTelefono?: string;
  contactoEmail?: string;
  fechaRegistro?: Date;
  activo?: boolean;
}
