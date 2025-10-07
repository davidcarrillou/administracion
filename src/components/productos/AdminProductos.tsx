import React, { useEffect, useState } from 'react';
import {listarProductos} from '../../services/ProductoService';
import type { Producto, ProductoCard, ProductoDetalle } from '../../models/Producto';
import type { Filtros } from '../../models/Filtro';
import { Filters } from '../filter/Filters';
import LoadingSpinner from '../LoadingSpinner';
import ProductModal from './ProductModal';
import ProductTable from './ProductTable';


export const AdminProductos: React.FC = () => {
    const [productos, setProductos] = useState<ProductoDetalle[]>([]);
  const [cargando, setCargando] = useState(true);
  const [filtros, setFiltros] = useState<Filtros>({
    nombre: '',
    precioMin: '',
    precioMax: '',
    color: '',
    tag: '',
    especificacion: '',
    valorEspecificacion: '',
    activo: 'todos'
  });
  const [modalAbierto, setModalAbierto] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState<ProductoDetalle | null>(null);
  const [imagenActual, setImagenActual] = useState(0);
  const [temaOscuro, setTemaOscuro] = useState(false);
  const [colorPersonalizado, setColorPersonalizado] = useState('#4361ee');
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 10;

    useEffect(() => {
        const obtenerProductos = async () => {
            try {
                const data = await listarProductos();
                setProductos(data);
                console.log(data);
                setCargando(false);
            } catch (error) {
                console.error('Error al obtener productos:', error);
            }
        };

        obtenerProductos();
    }, []);

  const manejarCambioFiltro = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFiltros(prev => ({
      ...prev,
      [name]: value
    }));
    setPaginaActual(1);
  };

  const filtrarProductos = (): ProductoDetalle[] => {
    return productos.filter(producto => {
      if (filtros.nombre && !producto.nombre_producto.toLowerCase().includes(filtros.nombre.toLowerCase())) {
        return false;
      }
      
      if (filtros.precioMin && producto.precio_final < parseFloat(filtros.precioMin)) {
        return false;
      }
      
      if (filtros.precioMax && producto.precio_final > parseFloat(filtros.precioMax)) {
        return false;
      }
      
      if (filtros.color && !producto.color.toLowerCase().includes(filtros.color.toLowerCase())) {
        return false;
      }
      
      if (filtros.tag && !producto.tags.some(tag => tag.toLowerCase().includes(filtros.tag.toLowerCase()))) {
        return false;
      }
      
      if (filtros.activo !== 'todos') {
        const estadoFiltro = filtros.activo === 'activo';
        if (producto.activo !== estadoFiltro) {
          return false;
        }
      }
      
      return true;
    });
  };

  const productosFiltrados = filtrarProductos();
  
  // Calcular páginas
  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
  const productosPagina = productosFiltrados.slice(indicePrimerProducto, indiceUltimoProducto);
  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const cambiarPagina = (numeroPagina: number) => {
    setPaginaActual(numeroPagina);
    window.scrollTo(0, 0);
  };

  const abrirModal = async (producto: ProductoDetalle) => {
    setCargando(true);
    setModalAbierto(true);
    
    // Simular carga de datos detallados
    await new Promise(resolve => setTimeout(resolve, 1000));
    setProductoSeleccionado(producto);
    setImagenActual(0);
    setCargando(false);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setProductoSeleccionado(null);
  };

  const cambiarImagen = (direccion: 'anterior' | 'siguiente') => {
    if (!productoSeleccionado) return;
    
    if (direccion === 'siguiente') {
      setImagenActual(prev => (prev + 1) % productoSeleccionado.url_imagen.length);
    } else {
      setImagenActual(prev => (prev - 1 + productoSeleccionado.url_imagen.length) % productoSeleccionado.url_imagen.length);
    }
  };

  const seleccionarImagen = (indice: number) => {
    setImagenActual(indice);
  };

  const alternarTema = () => {
    setTemaOscuro(!temaOscuro);
  };

  return (
    <div className="contenedor">


      <Filters 
        filtros={filtros}
        manejarCambioFiltro={manejarCambioFiltro}
      />

      {cargando ? (
        <LoadingSpinner texto="Cargando productos..." />
      ) : (
        <ProductTable 
          productos={productosPagina}
          abrirModal={abrirModal}
          paginaActual={paginaActual}
          totalPaginas={totalPaginas}
          cambiarPagina={cambiarPagina}
        />
      )}

      {modalAbierto && (
        <ProductModal 
          productoSeleccionado={productoSeleccionado}
          imagenActual={imagenActual}
          cargando={cargando}
          cerrarModal={cerrarModal}
          cambiarImagen={cambiarImagen}
          seleccionarImagen={seleccionarImagen}
        />
      )}
    </div>
  );

}