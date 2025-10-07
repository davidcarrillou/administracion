// src/components/header/Header.tsx
import React from "react";
import type {Page} from '../../models/pages'

interface HeaderProps {
  temaOscuro: boolean;
  colorPersonalizado: string;
  alternarTema: () => void;
  manejarCambioColor: (e: React.ChangeEvent<HTMLInputElement>) => void;
  navigate: (page: Page) => void;
  resetAll: () => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  temaOscuro, 
  colorPersonalizado, 
  alternarTema, 
  manejarCambioColor,
  navigate,
  resetAll
}) => {
  return (
    <nav className="navbar">
      <p className="titulo">Panel de Administración</p>
      
      <button onClick={() => { resetAll(); navigate("home"); }}>Inicio</button>
      <button onClick={() => { resetAll(); navigate("marca"); }}>Marcas</button>
      <button onClick={() => { resetAll(); navigate("color"); }}>Colores</button>
      <button onClick={() => { resetAll(); navigate("categoria"); }}>Categorías</button>
      <button onClick={() => { resetAll(); navigate("tag"); }}>Tags</button>
      <button onClick={() => { resetAll(); navigate("producto"); }}>Productos</button>
      <button onClick={() => { resetAll(); navigate("admin"); }}>Admin Productos</button>

      <div className="controles-superiores">
        <input 
          type="color" 
          className="selector-color" 
          value={colorPersonalizado}
          onChange={manejarCambioColor}
          title="Cambiar color principal"
        />
        
        <button onClick={alternarTema}>
          <i className={`fas ${temaOscuro ? "fa-sun" : "fa-moon"}`}></i>
          {temaOscuro ? "Tema Claro" : "Tema Oscuro"}
        </button>

        <button onClick={() => window.location.reload()}>
          <i className="fas fa-sync-alt"></i>
          Actualizar
        </button>
      </div>
    </nav>
  );
};
