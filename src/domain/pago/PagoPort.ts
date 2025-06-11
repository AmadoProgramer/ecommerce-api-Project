import { Pago } from './Pago';

export interface PagoPort {
  createPago(pago: Omit<Pago, 'id'>): Promise<number>;
  getPagoById(id: number): Promise<Pago | null>;
  updatePago(id: number, pago: Partial<Pago>): Promise<boolean>;
  deletePago(id: number): Promise<boolean>;
  getAllPagos(): Promise<Pago[]>;
}