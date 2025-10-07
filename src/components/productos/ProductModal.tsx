import React from 'react';
import type { ProductoDetalle } from '../../models/Producto';
import LoadingSpinner from '../LoadingSpinner';

interface ProductModalProps {
  productoSeleccionado: ProductoDetalle | null;
  imagenActual: number;
  cargando: boolean;
  cerrarModal: () => void;
  cambiarImagen: (direccion: 'anterior' | 'siguiente') => void;
  seleccionarImagen: (indice: number) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ 
  productoSeleccionado, 
  imagenActual, 
  cargando, 
  cerrarModal, 
  cambiarImagen, 
  seleccionarImagen 
}) => {
  if (!productoSeleccionado) return null;

  return (
    <div className="modal mostrar">
      <div className="modal-contenido">
        <button className="cerrar-modal" onClick={cerrarModal}>
          <i className="fas fa-times"></i>
        </button>
        
        {cargando ? (
          <LoadingSpinner texto="Cargando detalles del producto..." />
        ) : (
          <>
            <h2>{productoSeleccionado.nombre_producto}</h2>
            <p>{productoSeleccionado.descripcion_corta}</p>
            
            <div className="galeria">
              
                <img
                  key={productoSeleccionado.id_catalogo}
                  src={productoSeleccionado.imagen_principal}
                  alt={productoSeleccionado.nombre_producto}
                  className="miniatura"
                />
            </div>
            
            <img
              src={productoSeleccionado.imagen_principal}
              alt={productoSeleccionado.nombre_producto}
              className="imagen-principal"
            />
            
            <div className="navegacion-imagenes">
              <button className="boton" onClick={() => cambiarImagen('anterior')}>
                <i className="fas fa-chevron-left"></i> Anterior
              </button>
              <button className="boton" onClick={() => cambiarImagen('siguiente')}>
                Siguiente <i className="fas fa-chevron-right"></i>
              </button>
            </div>
            
            <h3>Especificaciones</h3>
            <table className="tabla">
              
            </table>
            
            <h3>Información General</h3>
            <table className="tabla">
              <tbody>
                <tr>
                  <td><strong>Precio Original</strong></td>
                  <td>${productoSeleccionado.precio}</td>
                </tr>
                <tr>
                  <td><strong>Precio con Descuento</strong></td>
                  <td>${productoSeleccionado.precio_final} ({productoSeleccionado.descuento_porcentaje}% off)</td>
                </tr>
                <tr>
                  <td><strong>Marca</strong></td>
                  <td>{productoSeleccionado.marca}</td>
                </tr>
                <tr>
                  <td><strong>Modelo</strong></td>
                  <td>{productoSeleccionado.modelo}</td>
                </tr>
                <tr>
                  <td><strong>Color</strong></td>
                  <td>{productoSeleccionado.nombre_color}</td>
                </tr>
                <tr>
                  <td><strong>Cantidad Disponible</strong></td>
                  <td>{productoSeleccionado.cantidad_disponible} unidades</td>
                </tr>
                <tr>
                  <td><strong>Tags</strong></td>
                  <td>{productoSeleccionado.tags.join(', ')}</td>
                </tr>
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductModal;