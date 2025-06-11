import { Categoria } from "../../infrastructure/entities/Producto";

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  categoria: Categoria;
}
