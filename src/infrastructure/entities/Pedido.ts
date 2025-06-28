import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany
} from "typeorm";
import { Cliente } from "./Cliente";
import { DetallePedido } from "./DetallePedido";
import { Pago } from './Pago';


export enum EstadoPedido {
  PENDIENTE = "PENDIENTE",
  ENVIADO = "ENVIADO",
  ENTREGADO = "ENTREGADO",
  CANCELADO = "CANCELADO"
}

@Entity({ name: "pedido" })
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido!: number;

  @ManyToOne(() => Cliente, { eager: true })
  @JoinColumn({ name: "id_cliente" }) // clave foránea
  cliente!: Cliente;

  @Column()
  id_cliente!: number;

  @Column({ type: "timestamp" })
  fecha!: Date;

  @Column({
    type: "enum",
    enum: EstadoPedido,
    default: EstadoPedido.PENDIENTE,
  })
  estado!: EstadoPedido;

  @OneToMany(() => DetallePedido, detalle => detalle.pedido)
  detalles!: DetallePedido[];

  @OneToMany(() => Pago, pago => pago.pedido)
  pagos!: Pago[];
}
