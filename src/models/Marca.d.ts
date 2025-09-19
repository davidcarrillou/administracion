export type Marca = {
  id_marca: number;       // Identificador único
  nombre: string;         // Nombre de la marca
  descripcion?: string;   // Descripción opcional
  activo: boolean;        // Estado activo/inactivo
  fecha_creacion?: string;// Fecha de creación (ISO string)
}