// src/App.tsx
import React, { useState } from 'react';
import type { Marca } from './models/Marca';
import { MarcaList } from './components/MarcaList';
import { MarcaForm } from './components/MarcaForm';

export const App: React.FC = () => {
  const [marcaEdit, setMarcaEdit] = useState<Marca>();

  const refrescar = () => {
    setMarcaEdit(undefined);
  };

  return (
    <div className="container">
      <MarcaForm marcaEdit={marcaEdit} onSaved={refrescar} />
      <MarcaList onEdit={m => setMarcaEdit(m)} />
    </div>
  );
};
