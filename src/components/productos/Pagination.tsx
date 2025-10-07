import React from 'react';

interface PaginationProps {
  paginaActual: number;
  totalPaginas: number;
  cambiarPagina: (numeroPagina: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({ paginaActual, totalPaginas, cambiarPagina }) => {
  return (
    <div className="paginacion">
      {Array.from({ length: totalPaginas }, (_, i) => i + 1).map(numero => (
        <button
          key={numero}
          className={`pagina-btn ${paginaActual === numero ? 'activa' : ''}`}
          onClick={() => cambiarPagina(numero)}
        >
          {numero}
        </button>
      ))}
    </div>
  );
};

