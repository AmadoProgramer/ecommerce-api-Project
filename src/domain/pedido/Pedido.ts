import { EstadoPedido } from "../../infrastructure/entities/Pedido";

export interface Pedido {
  id_pedido: number;
  id_cliente: number;
  fecha: Date;
  estado: EstadoPedido;
}