export interface Pago {
  id: number;
  idPedido: number;
  monto: number;
  fechaPago: Date;
  metodoPago: string;
  confirmado: boolean;
}