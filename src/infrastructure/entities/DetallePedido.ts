import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Pedido } from "./Pedido";
import { Producto } from "./Producto";

@Entity({ name: "detalle_pedido" })
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id_detalle!: number;

  @ManyToOne(() => Pedido, pedido => pedido.detalles, { eager: true })
  @JoinColumn({ name: "id_pedido" })
  pedido!: Pedido;

  @Column()
  id_pedido!: number;
  
  @ManyToOne(() => Producto, producto => producto.detalles, { eager: true })
  @JoinColumn({ name: "id_producto" })
  producto!: Producto;

  @Column()
  id_producto!: number;

  @Column({ type: "integer" })
  cantidad!: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio_unitario!: number;
}

