import React from 'react';

interface LoadingSpinnerProps {
  texto?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ texto = "Cargando..." }) => {
  return (
    <div className="spinner">
      <i className="fas fa-spinner spinner-icono"></i>
      <p className="spinner-texto">{texto}</p>
    </div>
  );
};

export default LoadingSpinner;