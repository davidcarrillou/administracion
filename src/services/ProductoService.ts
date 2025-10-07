import { supabase } from "../lib/supbabase";
import type { ProductoDetalle } from "../models/Producto";

const table = 'vista_catalogo';
const API_URL = "https://img.astracctv.com.mx/api/producto";

export async function listarProductos(): Promise<ProductoDetalle[]> {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('id_catalogo', { ascending: true });
  if (error) throw error;
  return data as ProductoDetalle[];
}

// 🔹 Eliminar producto por id
export async function eliminarProducto(id_producto: number): Promise<void> {
  const res = await fetch(`${API_URL}/${id_producto}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Error al eliminar producto");
  }
}

// 🔹 Cambiar estado (activo/inactivo)
export async function cambiarEstadoProducto(
  id_producto: number,
  activo: boolean
): Promise<void> {
  const res = await fetch(`${API_URL}/${id_producto}/estado`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ activo }),
  });
  if (!res.ok) {
    throw new Error("Error al cambiar estado del producto");
  }
}