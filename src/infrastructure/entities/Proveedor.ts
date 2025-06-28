import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { StockEntity } from './Stock';

@Entity('proveedor', { schema: 'ecommerce' })
export class ProveedorEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ unique: true })
  ruc!: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  telefono?: string;

  @Column({ nullable: true })
  direccion?: string;

  @Column({ name: 'contacto_nombre', nullable: true })
  contactoNombre?: string;

  @Column({ name: 'contacto_telefono', nullable: true })
  contactoTelefono?: string;

  @Column({ name: 'contacto_email', nullable: true })
  contactoEmail?: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaRegistro!: Date;

  @Column({ default: true })
  activo!: boolean;

  @OneToMany(() => StockEntity, stock => stock.proveedor)
  stocks!: StockEntity[];
}
