import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "cliente" })
export class Cliente {

  @PrimaryGeneratedColumn()
  id_cliente!: number;

  @Column({ type: "character varying", length: 100 })
  nombre!: string;

  @Column({ type: "character varying", length: 100, unique: true })
  email!: string;

  @Column({ type: "character varying", length: 20 })
  telefono!: string;

  @Column({ type: "character varying", length: 20 })
  cedula!: string;

  @Column({ type: "character varying", length: 255 })
  direccion!: string;

  @Column({ type: "character varying", length: 60 })
  contrasena_hash!: string;
}
