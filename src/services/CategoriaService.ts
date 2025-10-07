// src/services/CategoriaService.ts

import { supabase } from "../lib/supbabase";
import type { Categoria } from "../models/Categoria";


const table = 'categoria';

// Listar todas las categorías
export async function listarCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('id_categoria', { ascending: true });
  if (error) throw error;
  return data;
}

// Crear categoría
export async function crearCategoria(payload: Omit<Categoria, 'id_categoria' | 'fecha_creacion'>) {
  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .single();
  if (error) throw error;
  return data;
}

// Actualizar categoría
export async function actualizarCategoria(categoria: Categoria) {
  const { data, error } = await supabase
    .from(table)
    .update({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion,
      activo: categoria.activo,
    })
    .eq('id_categoria', categoria.id_categoria)
    .single();
  if (error) throw error;
  return data;
}

// Eliminar categoría
export async function eliminarCategoria(id_categoria: number) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id_categoria', id_categoria);
  if (error) throw error;
}
