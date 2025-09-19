// src/services/MarcaService.ts

import { supabase } from "../lib/supbabase";
import type { Marca } from "../models/Marca";

const table = 'marca';

// Listar todas las marcas
export async function listarMarcas(): Promise<Marca[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('id_marca', { ascending: true });

  if (error) throw error;
  return data;
}

// Crear una nueva marca
export async function crearMarca(payload: Omit<Marca, 'id_marca' | 'fecha_creacion'>) {
  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .single();

  if (error) throw error;
  return data;
}

// Actualizar una marca existente
export async function actualizarMarca(marca: Marca) {
  const { data, error } = await supabase
    .from(table)
    .update({
      nombre: marca.nombre,
      descripcion: marca.descripcion,
      activo: marca.activo
    })
    .eq('id_marca', marca.id_marca)
    .single();

  if (error) throw error;
  return data;
}

// Eliminar una marca por ID
export async function eliminarMarca(id_marca: number) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id_marca', id_marca);

  if (error) throw error;
}