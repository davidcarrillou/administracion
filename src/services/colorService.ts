// src/services/ColorService.ts

import { supabase } from "../lib/supbabase";
import type { Color } from "../models/Color";


const table = 'color';

// Listar colores
export async function listarColores(): Promise<Color[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('id_color', { ascending: true });

  if (error) throw error;
  return data;
}

// Crear color
export async function crearColor(payload: Omit<Color, 'id_color' | 'fecha_creacion'>) {
  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .single();

  if (error) throw error;
  return data;
}

// Actualizar color
export async function actualizarColor(color: Color) {
  const { data, error } = await supabase
    .from(table)
    .update({
      nombre: color.nombre,
      descripcion: color.descripcion,
      valor: color.valor,
      activo: color.activo
    })
    .eq('id_color', color.id_color)
    .single();

  if (error) throw error;
  return data;
}

// Eliminar color
export async function eliminarColor(id_color: number) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id_color', id_color);

  if (error) throw error;
}
