import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "detalle_pedido" })
export class DetallePedido {

  @PrimaryGeneratedColumn()
  id_detalle!: number;

  @Column({ type: "integer" })
  id_pedido!: number;

  @Column({ type: "integer" })
  id_producto!: number;

  @Column({ type: "integer" })
  cantidad!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio_unitario!: number;
}
