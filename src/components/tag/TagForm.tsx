// src/components/TagForm.tsx
import React, { useEffect, useState } from 'react';
import type { Tag } from '../../models/Tag';
import { actualizarTag, crearTag } from '../../services/TagService';

interface Props {
  tagEdit?: Tag;
  onSaved: () => void;
}

export const TagForm: React.FC<Props> = ({ tagEdit, onSaved }) => {
  const [nombre, setNombre] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (tagEdit) {
      setNombre(tagEdit.nombre);
    }
  }, [tagEdit]);

  const reset = () => {
    setNombre('');
    setError('');
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (tagEdit) {
        await actualizarTag({ ...tagEdit, nombre });
      } else {
        await crearTag({ nombre });
      }
      reset();
      onSaved();
    } catch (e: any) {
      // Capturar violación unique
      if (e.message.includes('duplicate key')) {
        setError('El nombre ya existe. Por favor elige otro.');
      } else {
        setError(e.message);
      }
    }
  };

  return (
    <section className="module">
      <h2>{tagEdit ? 'Editar Tag' : 'Crear Tag'}</h2>
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
        <button type="submit">{tagEdit ? 'Actualizar' : 'Crear'}</button>
      </form>
    </section>
  );
};
