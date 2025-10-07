// src/components/TagList.tsx
import React, { useEffect, useState } from 'react';
import type { Tag } from '../../models/Tag';
import { listarTags, eliminarTag } from '../../services/TagService';


interface Props {
  onEdit: (tag: Tag) => void;
}

export const TagList: React.FC<Props> = ({ onEdit }) => {
  const [tags, setTags] = useState<Tag[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    cargar();
    window.addEventListener('navigate', cargar as any);
    return () => window.removeEventListener('navigate', cargar as any);
  }, []);

  const cargar = async () => {
    try {
      const data = await listarTags();
      setTags(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const borrar = async (id: number) => {
    if (!confirm('¿Eliminar este tag?')) return;
    try {
      await eliminarTag(id);
      cargar();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <section className="module">
      <h2>Listado de Tags</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {tags.map(t => (
            <tr key={t.id_tag}>
              <td>{t.id_tag}</td>
              <td>{t.nombre}</td>
              <td>
                <button onClick={() => onEdit(t)}>Editar</button>
                <button onClick={() => borrar(t.id_tag)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
