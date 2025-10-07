// src/components/CategoriaForm.tsx
import React, { useEffect, useState } from 'react';
import type { Categoria } from '../../models/Categoria';
import { actualizarCategoria, crearCategoria } from '../../services/CategoriaService';


interface Props {
  categoriaEdit?: Categoria;
  onSaved: () => void;
}

export const CategoriaForm: React.FC<Props> = ({ categoriaEdit, onSaved }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [activo, setActivo] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (categoriaEdit) {
      setNombre(categoriaEdit.nombre);
      setDescripcion(categoriaEdit.descripcion || '');
      setActivo(categoriaEdit.activo ?? true);
    }
  }, [categoriaEdit]);

  const reset = () => {
    setNombre('');
    setDescripcion('');
    setActivo(true);
    setError('');
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (categoriaEdit) {
        await actualizarCategoria({ ...categoriaEdit, nombre, descripcion, activo });
      } else {
        await crearCategoria({ nombre, descripcion, activo });
      }
      reset();
      onSaved();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <section className="module">
      <h2>{categoriaEdit ? 'Editar Categoría' : 'Crear Categoría'}</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={guardar}>
        <div className="form-group">
          <label>Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>

        <div className="form-group checkbox-group">
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
          {categoriaEdit ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </section>
  );
};
