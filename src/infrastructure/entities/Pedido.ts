import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum EstadoPedido {
  PENDIENTE = "PENDIENTE",
  ENVIADO = "ENVIADO",
  ENTREGADO = "ENTREGADO"
}

@Entity({ name: "pedido" })
export class Pedido {

  @PrimaryGeneratedColumn()
  id_pedido!: number;

  @Column({ type: "integer" })
  id_cliente!: number;

  @Column({ type: "timestamp" })
  fecha!: Date;

  @Column({ type: "enum", enum: EstadoPedido, default: EstadoPedido.PENDIENTE })
  estado!: EstadoPedido;
}
