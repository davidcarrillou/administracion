// src/models/Color.ts

export type Color = {
  id_color: number;
  nombre: string;
  descripcion: string | null;
  valor: string | null;       // Ej. "#007BFF"
  activo: boolean | null;
  fecha_creacion: string | null;
}
