import {
Entity,
PrimaryGeneratedColumn,
Column,
ManyToOne,
JoinColumn,
} from "typeorm"; 
import { Pedido } from "./Pedido"; 
export enum MetodoPago {
  EFECTIVO = "EFECTIVO",
  TARJETA = "TARJETA",
  TRANSFERENCIA = "TRANSFERENCIA"
}

@Entity({ name: "pago" })
export class Pago {
  @PrimaryGeneratedColumn()
  id_pago!: number;

  @ManyToOne(() => Pedido, pedido => pedido.pagos, { eager: true })
  @JoinColumn({ name: "id_pedido" })
  pedido!: Pedido;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  monto!: number;

  @Column({ type: "timestamp" })
  fecha_pago!: Date;

  @Column({
    type: "enum",
    enum: MetodoPago,
    default: MetodoPago.EFECTIVO,
  })
  metodo_pago!: MetodoPago;

  @Column({ type: "boolean", default: false })
  confirmado!: boolean;
}
