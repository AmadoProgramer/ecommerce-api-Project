import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from "typeorm";
import { DetallePedido } from "./DetallePedido";

export enum Categoria {
  ROPA = "ROPA",
  COLLAR = "COLLAR"
}

@Entity({ name: "producto" })
export class Producto {
  @PrimaryGeneratedColumn()
  id_producto!: number;

  @Column({ type: "character varying", length: 100 })
  nombre!: string;

  @Column({ type: "text" })
  descripcion!: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  precio!: number;

  @Column({ type: "enum", enum: Categoria, default: Categoria.ROPA })
  categoria!: Categoria;

  @OneToMany(() => DetallePedido, detalle => detalle.producto)
  detalles!: DetallePedido[];
}

