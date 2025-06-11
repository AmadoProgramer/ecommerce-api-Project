import { DetallePedido } from './DetallePedido';

export interface DetallePedidoPort {
  createDetallePedido(detallePedido: Omit<DetallePedido, 'id'>): Promise<number>;
  getDetallePedidoById(id: number): Promise<DetallePedido | null>;
  updateDetallePedido(id: number, detallePedido: Partial<DetallePedido>): Promise<boolean>;
  deleteDetallePedido(id: number): Promise<boolean>;
  getAllDetallePedidos(): Promise<DetallePedido[]>;
}