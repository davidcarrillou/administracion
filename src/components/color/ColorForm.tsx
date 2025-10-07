// src/components/ColorForm.tsx
import React, { useEffect, useState } from 'react';
import type { Color } from '../../models/Color';
import { actualizarColor, crearColor } from '../../services/colorService';

interface Props {
  colorEdit?: Color;
  onSaved: () => void;
}

export const ColorForm: React.FC<Props> = ({ colorEdit, onSaved }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [valor, setValor] = useState('#000000');
  const [activo, setActivo] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (colorEdit) {
      setNombre(colorEdit.nombre);
      setDescripcion(colorEdit.descripcion || '');
      setValor(colorEdit.valor || '#000000');
      setActivo(colorEdit.activo ?? true);
    }
  }, [colorEdit]);

  const reset = () => {
    setNombre('');
    setDescripcion('');
    setValor('#000000');
    setActivo(true);
    setError('');
  };

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (colorEdit) {
        await actualizarColor({ ...colorEdit, nombre, descripcion, valor, activo });
      } else {
        await crearColor({ nombre, descripcion, valor, activo });
      }
      reset();
      onSaved();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <section className="module">
      <h2>{colorEdit ? 'Editar Color' : 'Crear Color'}</h2>
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

        <div className="form-group">
          <label>Valor</label>
          <div className="color-input-group">
            <input
              type="color"
              value={valor}
              onChange={e => setValor(e.target.value)}
            />
            <div
              className="color-preview-large"
              style={{ backgroundColor: valor }}
            />
            <span className="color-code">{valor}</span>
          </div>
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
          {colorEdit ? 'Actualizar' : 'Crear'}
        </button>
      </form>
    </section>
  );
};