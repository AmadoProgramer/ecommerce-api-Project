// Stock.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Producto } from './Producto';
import { ProveedorEntity } from './Proveedor';

@Entity('stock')
export class Stock {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Producto, { eager: true })
  @JoinColumn({ name: 'productoId' }) // Clave foránea en la tabla
  producto!: Producto;

  @Column()
  productoId!: number;

  @Column()
  lote!: string;

  @Column()
  cantidad!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  precioIngreso!: number;

  @ManyToOne(() => ProveedorEntity, proveedor => proveedor.stocks, { eager: true })
  @JoinColumn({ name: 'proveedorId' })
  proveedor!: ProveedorEntity;

  @Column()
  proveedorId!: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaIngreso!: Date;

  @Column({ type: 'date' })
  fechaVencimiento!: Date;

  @Column({ nullable: true })
  ubicacion?: string;

  @Column({ nullable: true })
  observaciones?: string;
}

