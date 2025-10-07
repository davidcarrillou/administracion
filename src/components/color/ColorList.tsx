// src/components/ColorList.tsx
import React, { useEffect, useState } from 'react';
import type { Color } from '../../models/Color';
import { listarColores, eliminarColor } from '../../services/colorService';

interface Props {
  onEdit: (color: Color) => void;
}

export const ColorList: React.FC<Props> = ({ onEdit }) => {
  const [colores, setColores] = useState<Color[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    cargar();
    // Escuchar eventos de navegación para recargar si vuelven aquí
    window.addEventListener('navigate', cargar as any);
    return () => window.removeEventListener('navigate', cargar as any);
  }, []);

  const cargar = async () => {
    try {
      const data = await listarColores();
      setColores(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const borrar = async (id: number) => {
    if (!confirm('¿Eliminar este color?')) return;
    try {
      await eliminarColor(id);
      cargar();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <section className="module">
      <h2>Listado de Colores</h2>
      {error && <p className="error">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Valor</th>
            <th>Activo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {colores.map(c => (
            <tr key={c.id_color}>
              <td>{c.id_color}</td>
              <td>{c.nombre}</td>
              <td>
                <span
                  className="color-preview"
                  style={{ backgroundColor: c.valor || '#fff' }}
                />
                {c.valor}
              </td>
              <td>{c.activo ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => onEdit(c)}>Editar</button>
                <button onClick={() => borrar(c.id_color)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
