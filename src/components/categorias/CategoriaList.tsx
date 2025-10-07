// src/components/CategoriaList.tsx
import React, { useEffect, useState } from 'react';
import type { Categoria } from '../../models/Categoria';
import { listarCategorias, eliminarCategoria } from '../../services/CategoriaService';


interface Props {
  onEdit: (categoria: Categoria) => void;
}

export const CategoriaList: React.FC<Props> = ({ onEdit }) => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    cargar();
    window.addEventListener('navigate', cargar as any);
    return () => window.removeEventListener('navigate', cargar as any);
  }, []);

  const cargar = async () => {
    try {
      const data = await listarCategorias();
      setCategorias(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const borrar = async (id: number) => {
    if (!confirm('¿Eliminar esta categoría?')) return;
    try {
      await eliminarCategoria(id);
      cargar();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <section className="module">
      <h2>Listado de Categorías</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(c => (
            <tr key={c.id_categoria}>
              <td>{c.id_categoria}</td>
              <td>{c.nombre}</td>
              <td>{c.activo ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => onEdit(c)}>Editar</button>
                <button onClick={() => borrar(c.id_categoria)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
