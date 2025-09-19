// src/components/MarcaForm.tsx
import React, { useEffect, useState } from 'react';
import type { Marca } from '../models/Marca';
import { crearMarca, actualizarMarca } from '../services/MarcaService';

interface Props {
  marcaEdit?: Marca;
  onSaved: () => void;
}

export const MarcaForm: React.FC<Props> = ({ marcaEdit, onSaved }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (marcaEdit) {
      setNombre(marcaEdit.nombre);
      setDescripcion(marcaEdit.descripcion || '');
      setActivo(marcaEdit.activo ?? true);
    }
  }, [marcaEdit]);

  const reset = () => {
    setNombre('');
    setDescripcion('');
    setActivo(true);
    setError('');
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (marcaEdit) {
        await actualizarMarca({ ...marcaEdit, nombre, descripcion, activo });
      } else {
        await crearMarca({ nombre, descripcion, activo });
      }
      reset();
      onSaved();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={guardar}>
      <h2>{marcaEdit ? 'Editar Marca' : 'Crear Marca'}</h2>
      {error && <p className="error">{error}</p>}
      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descripción</label>
        <textarea
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={activo}
            onChange={e => setActivo(e.target.checked)}
          />
          Activo
        </label>
      </div>
      <button type="submit">
        {marcaEdit ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};
