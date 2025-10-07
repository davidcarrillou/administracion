// src/App.tsx
import React, { useState, useEffect } from "react";
import { Home } from "./components/Home";
import { CategoriaForm } from "./components/categorias/CategoriaForm";
import { CategoriaList } from "./components/categorias/CategoriaList";
import { ColorForm } from "./components/color/ColorForm";
import { ColorList } from "./components/color/ColorList";
import { MarcaForm } from "./components/marca/MarcaForm";
import { MarcaList } from "./components/marca/MarcaList";
import { TagForm } from "./components/tag/TagForm";
import { TagList } from "./components/tag/TagList";
import type { Categoria } from "./models/Categoria";
import type { Color } from "./models/Color";
import type { Marca } from "./models/Marca";
import type { Tag } from "./models/Tag";
import { AdminProductos } from "./components/productos/AdminProductos";
import { ProductForm } from "./components/productos/ProductForm";
import { Header } from "./components/header/Header";
import type {Page} from './models/pages'


export const App: React.FC = () => {
  const [page, setPage] = useState<Page>("home");
  const [marcaEdit, setMarcaEdit] = useState<Marca>();
  const [colorEdit, setColorEdit] = useState<Color>();
  const [categoriaEdit, setCategoriaEdit] = useState<Categoria>();
  const [tagEdit, setTagEdit] = useState<Tag>();

  // Para tema y color
  const [temaOscuro, setTemaOscuro] = useState(false);
  const [colorPersonalizado, setColorPersonalizado] = useState('#4361ee');

  useEffect(() => {
    const handler = (e: any) => setPage(e.detail);
    window.addEventListener("navigate", handler);
    return () => window.removeEventListener("navigate", handler);
  }, []);

  const resetAll = () => {
    setMarcaEdit(undefined);
    setColorEdit(undefined);
    setCategoriaEdit(undefined);
    setTagEdit(undefined);
  };

   // Aplicar tema oscuro/claro
    useEffect(() => {
      if (temaOscuro) {
        document.body.classList.add('tema-oscuro');
      } else {
        document.body.classList.remove('tema-oscuro');
      }
    }, [temaOscuro]);
  
    // Aplicar color personalizado
    useEffect(() => {
      document.documentElement.style.setProperty('--color-primario', colorPersonalizado);
      
      // Calcular color secundario (más oscuro)
      const hexToRgb = (hex: string) => {
        const bigint = parseInt(hex.slice(1), 16);
        return {
          r: (bigint >> 16) & 255,
          g: (bigint >> 8) & 255,
          b: bigint & 255
        };
      };
      
      const rgbToHex = (r: number, g: number, b: number) => '#' + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
      }).join('');
      
      const rgb = hexToRgb(colorPersonalizado);
      const secundario = rgbToHex(
        Math.max(0, rgb.r - 30),
        Math.max(0, rgb.g - 30),
        Math.max(0, rgb.b - 30)
      );
      
      document.documentElement.style.setProperty('--color-secundario', secundario);
    }, [colorPersonalizado]);

  return (
    <div>
      <Header 
        temaOscuro={temaOscuro}
        colorPersonalizado={colorPersonalizado}
        alternarTema={() => setTemaOscuro(!temaOscuro)}
        manejarCambioColor={(e) => setColorPersonalizado(e.target.value)}
        navigate={setPage}
        resetAll={resetAll}
      />

      <main>
        {page === "home" && <Home />}
        {page === "marca" && (
          <>
            <MarcaForm marcaEdit={marcaEdit} onSaved={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "marca" }))} />
            <MarcaList onEdit={(m) => setMarcaEdit(m)} />
          </>
        )}
        {page === "color" && (
          <>
            <ColorForm colorEdit={colorEdit} onSaved={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "color" }))} />
            <ColorList onEdit={(c) => setColorEdit(c)} />
          </>
        )}
        {page === "categoria" && (
          <>
            <CategoriaForm categoriaEdit={categoriaEdit} onSaved={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "categoria" }))} />
            <CategoriaList onEdit={(c) => setCategoriaEdit(c)} />
          </>
        )}
        {page === "tag" && (
          <>
            <TagForm tagEdit={tagEdit} onSaved={() => window.dispatchEvent(new CustomEvent("navigate", { detail: "tag" }))} />
            <TagList onEdit={(t) => setTagEdit(t)} />
          </>
        )}
        {page === "producto" && <ProductForm />}
        {page === "admin" && <AdminProductos />}
      </main>
    </div>
  );
};
