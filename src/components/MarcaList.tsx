// src/components/MarcaList.tsx
import React, { useEffect, useState } from 'react';
import type { Marca } from '../models/Marca'
import { listarMarcas, eliminarMarca } from '../services/MarcaService';

interface Props {
  onEdit: (marca: Marca) => void;
}

export const MarcaList: React.FC<Props> = ({ onEdit }) => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    cargar();
  }, []);

  const cargar = async () => {
    try {
      const data = await listarMarcas();
      setMarcas(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const borrar = async (id: number) => {
    if (!confirm('¿Eliminar esta marca?')) return;
    try {
      await eliminarMarca(id);
      cargar();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div>
      <h2>Listado de Marcas</h2>
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
          {marcas.map(m => (
            <tr key={m.id_marca}>
              <td>{m.id_marca}</td>
              <td>{m.nombre}</td>
              <td>{m.activo ? 'Sí' : 'No'}</td>
              <td>
                <button onClick={() => onEdit(m)}>Editar</button>
                <button onClick={() => borrar(m.id_marca)}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
