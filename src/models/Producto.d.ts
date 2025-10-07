// src/models/Producto.ts

export type Producto = {
  nombre: string;
  modelo: string;
  descripcion_corta: string;
  precio: number;
  id_marca: number;
  id_color: number;
  id_categoria: number;
  activo: boolean;
  tags: string[];
  imagenes: File[];  // Ficheros seleccionados en el input
}

export type ProductoCard = {
  id_catalogo: number;
  nombre_producto: string;
  modelo: string;
  marca: string;
  color: string;
  memoria: string;
  ram: string;
  precio: number;
  precio_final: number;
  descuento_porcentaje: number;
  cantidad_disponible: number;
  imagen_principal: string;
  tags: string[];
  activo: boolean;
}

export interface ProductoDetalle extends ProductoCard {
  descripcion_corta: string;
  categoria: string;
  nombre_color: string;
  valor_color: string;
  fecha: string;
  url_imagen: string[];
  especificaciones: Record<string, string>;
}