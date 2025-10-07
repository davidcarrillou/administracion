import React from 'react';
import type { Filtros } from '../../models/Filtro';

interface FiltersProps {
  filtros: Filtros;
  manejarCambioFiltro: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export const Filters: React.FC<FiltersProps> = ({ filtros, manejarCambioFiltro }) => {
  return (
    <div className="filtros">
      <h2 className="filtros-titulo">
        <i className="fas fa-filter"></i>
        Filtros de Búsqueda
      </h2>
      <div className="filtros-campos">
        <div className="campo">
          <label className="etiqueta">Nombre del producto</label>
          <input
            type="text"
            className="entrada"
            name="nombre"
            value={filtros.nombre}
            onChange={manejarCambioFiltro}
            placeholder="Buscar por nombre..."
          />
        </div>
        
        <div className="campo">
          <label className="etiqueta">Precio Mínimo</label>
          <input
            type="number"
            className="entrada"
            name="precioMin"
            value={filtros.precioMin}
            onChange={manejarCambioFiltro}
            placeholder="Precio mínimo"
          />
        </div>
        
        <div className="campo">
          <label className="etiqueta">Precio Máximo</label>
          <input
            type="number"
            className="entrada"
            name="precioMax"
            value={filtros.precioMax}
            onChange={manejarCambioFiltro}
            placeholder="Precio máximo"
          />
        </div>
        
        <div className="campo">
          <label className="etiqueta">Color</label>
          <input
            type="text"
            className="entrada"
            name="color"
            value={filtros.color}
            onChange={manejarCambioFiltro}
            placeholder="Filtrar por color..."
          />
        </div>
        
        <div className="campo">
          <label className="etiqueta">Tag</label>
          <input
            type="text"
            className="entrada"
            name="tag"
            value={filtros.tag}
            onChange={manejarCambioFiltro}
            placeholder="Filtrar por tag..."
          />
        </div>
        
        <div className="campo">
          <label className="etiqueta">Estado</label>
          <select
            className="seleccion"
            name="activo"
            value={filtros.activo}
            onChange={manejarCambioFiltro}
          >
            <option value="todos">Todos</option>
            <option value="activo">Activos</option>
            <option value="inactivo">Inactivos</option>
          </select>
        </div>
      </div>
    </div>
  );
};