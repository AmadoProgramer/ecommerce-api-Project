export interface Stock {
  id?: number;
  productoId: number;
  lote: string;
  cantidad: number;
  precioIngreso: number;
  proveedorId: number;
  fechaIngreso: Date;
  fechaVencimiento: Date;
  ubicacion?: string;
  observaciones?: string;
}
