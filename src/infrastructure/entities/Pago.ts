import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum MetodoPago {
  EFECTIVO = "EFECTIVO",
  TARJETA = "TARJETA",
  TRANSFERENCIA = "TRANSFERENCIA"
}

@Entity({ name: "pago" })
export class Pago {

  @PrimaryGeneratedColumn()
  id_pago!: number;

  @Column({ type: "integer" })
  id_pedido!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  monto!: number;

  @Column({ type: "timestamp" })
  fecha_pago!: Date;

  @Column({ type: "enum", enum: MetodoPago, default: MetodoPago.EFECTIVO })
  metodo_pago!: MetodoPago;

  @Column({ type: "boolean", default: false })
  confirmado!: boolean;
}
