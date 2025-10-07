import React from 'react';
import type { ProductoCard, ProductoDetalle } from '../../models/Producto';
import { Pagination } from './Pagination';

interface ProductTableProps {
  productos: ProductoDetalle[];
  abrirModal: (producto: ProductoDetalle) => void;
  paginaActual: number;
  totalPaginas: number;
  cambiarPagina: (numeroPagina: number) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ 
  productos, 
  abrirModal, 
  paginaActual, 
  totalPaginas, 
  cambiarPagina 
}) => {
  return (
    <>
      <div className="tabla-contenedor">
        <table className="tabla">
          <thead className="tabla-cabecera">
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Color</th>
              <th>Precio</th>
              <th>Disponibilidad</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.length > 0 ? (
              productos.map(producto => (
                <tr key={producto.id_catalogo} className="fila-tabla">
                  <td>
                    <img 
                      src={producto.imagen_principal} 
                      alt={producto.nombre_producto}
                      style={{width: '50px', height: '50px', objectFit: 'cover', borderRadius: '6px'}}
                    />
                  </td>
                  <td>{producto.nombre_producto}</td>
                  <td>{producto.marca}</td>
                  <td>{producto.modelo}</td>
                  <td>{producto.color}</td>
                  <td>${producto.precio_final}</td>
                  <td>{producto.cantidad_disponible} unidades</td>
                  <td>
                    <span className={`estado ${producto.activo ? 'activo' : 'inactivo'}`}>
                      {producto.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td>
                    <div className="acciones">
                      <button 
                        className="icono-btn" 
                        title="Ver detalles"
                        onClick={() => abrirModal(producto)}
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="icono-btn" title="Editar">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="icono-btn" title="Eliminar">
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="sin-resultados">
                  No se encontraron productos con los filtros aplicados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPaginas > 1 && (
        <Pagination 
          paginaActual={paginaActual} 
          totalPaginas={totalPaginas} 
          cambiarPagina={cambiarPagina} 
        />
      )}
    </>
  );
};

export default ProductTable;