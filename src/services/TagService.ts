import { supabase } from "../lib/supbabase";
import type { Tag } from "../models/Tag";

const table = 'tag';

// Listar todos los tags
export async function listarTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('id_tag', { ascending: true });
  if (error) throw error;
  return data;
}

// Crear un nuevo tag
export async function crearTag(payload: Omit<Tag, 'id_tag'>) {
  const { data, error } = await supabase
    .from(table)
    .insert(payload)
    .single();
  if (error) throw error;
  return data;
}

// Actualizar un tag existente
export async function actualizarTag(tag: Tag) {
  const { data, error } = await supabase
    .from(table)
    .update({ nombre: tag.nombre })
    .eq('id_tag', tag.id_tag)
    .single();
  if (error) throw error;
  return data;
}

// Eliminar un tag por ID
export async function eliminarTag(id_tag: number) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id_tag', id_tag);
  if (error) throw error;
}
