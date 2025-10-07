// src/models/Categoria.ts

export type Categoria = {
  id_categoria: number;
  nombre: string;
  descripcion: string | null;
  activo: boolean | null;
  fecha_creacion: string | null;
}
