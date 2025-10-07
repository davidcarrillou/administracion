// src/components/ProductForm.tsx
import React, { useEffect, useState, useRef } from "react";
import { listarCategorias } from "../../services/CategoriaService";
import { listarColores } from "../../services/colorService";
import { listarMarcas } from "../../services/MarcaService";
import { listarTags } from "../../services/TagService";
import "./ProductForm.css";
import type { Producto } from "../../models/Producto";

export const ProductForm: React.FC = () => {
  // estados de catálogo
  const [marcas, setMarcas] = useState<{ id_marca: number; nombre: string }[]>([]);
  const [colores, setColores] = useState<{ id_color: number; nombre: string }[]>([]);
  const [categorias, setCategorias] = useState<{ id_categoria: number; nombre: string }[]>([]);
  const [suggestTags, setSuggestTags] = useState<string[]>([]);

  // estados del formulario
  const [nombre, setNombre] = useState("");
  const [modelo, setModelo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState<number>(0);
  const [idMarca, setIdMarca] = useState<number >(0);
  const [idColor, setIdColor] = useState<number >(0);
  const [idCategoria, setIdCategoria] = useState<number>(0);
  const [activo, setActivo] = useState(true);

  // tags dinámicos
  const [tags, setTags] = useState<string[]>([]);
  const tagInputRef = useRef<HTMLInputElement>(null);

  // imágenes
  const [imagenes, setImagenes] = useState<File[]>([]);
  const [preview, setPreview] = useState<string[]>([]);

  // especificaciones
  const [especificaciones, setEspecificaciones] = useState<{ clave: string; valor: string }[]>([]);
  const [clave, setClave] = useState("");
  const [valor, setValor] = useState("");

  // descuento
  const [descuento, setDescuento] = useState<number | "">("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");

  // stock
  const [stock, setStock] = useState({ ubicacion: "", cantidad_disponible: "" });

  // cargar catálogos
  useEffect(() => {
    listarMarcas().then(setMarcas);
    listarColores().then(setColores);
    listarCategorias().then(setCategorias);
    listarTags().then((t) => setSuggestTags(t.map((x) => x.nombre)));
  }, []);

  // crear tag
  const addTag = (text: string) => {
    const t = text.trim();
    if (!t || tags.includes(t)) return;
    setTags((prev) => [...prev, t]);
  };

  const onTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(tagInputRef.current!.value);
      tagInputRef.current!.value = "";
    }
  };

  const removeTag = (idx: number) => {
    setTags((prev) => prev.filter((_, i) => i !== idx));
  };

  const onFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setImagenes(files);
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const addSpec = () => {
    if (clave.trim() && valor.trim()) {
      setEspecificaciones([...especificaciones, { clave, valor }]);
      setClave("");
      setValor("");
    }
  };

  const removeSpec = (i: number) => {
    setEspecificaciones(especificaciones.filter((_, idx) => idx !== i));
  };

  // enviar
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (idMarca === 0 || idColor === 0 || idCategoria === 0) {
      alert("Selecciona marca, color y categoría");
      return;
    }

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("modelo", modelo);
    formData.append("descripcion_corta", descripcion);
    formData.append("precio", precio.toString());
    formData.append("id_marca", idMarca.toString());
    formData.append("id_color", idColor.toString());
    formData.append("id_categoria", idCategoria.toString());
    formData.append("activo", activo ? "true" : "false");
    formData.append("tags", JSON.stringify(tags));

    // especificaciones
    formData.append("especificaciones", JSON.stringify(especificaciones));

    // descuento opcional
    if (descuento) {
      formData.append(
        "descuento",
        JSON.stringify({
          porcentaje: descuento,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin,
        })
      );
    }

    // stock opcional
    if (stock.ubicacion && stock.cantidad_disponible) {
      formData.append("stock", JSON.stringify(stock));
    }

    imagenes.forEach((file) => {
      formData.append("imagenes", file);
    });

    try {
      const res = await fetch("https://img.astracctv.com.mx/api/producto/registrar", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Error al registrar el producto");

      const data = await res.json();
      console.log("Producto registrado:", data);
      alert("Producto creado con éxito ✅");

      // reset
      setNombre("");
      setModelo("");
      setDescripcion("");
      setPrecio(0);
      setIdMarca(0);
      setIdColor(0);
      setIdCategoria(0);
      setActivo(true);
      setTags([]);
      setImagenes([]);
      setPreview([]);
      setEspecificaciones([]);
      setClave("");
      setValor("");
      setDescuento("");
      setFechaInicio("");
      setFechaFin("");
      setStock({ ubicacion: "", cantidad_disponible: "" });
    } catch (err) {
      console.error(err);
      const payload: Producto = {
      nombre,
      modelo,
      descripcion_corta: descripcion,
      precio,
      id_marca: idMarca,
      id_color: idColor,
      id_categoria: idCategoria,
      activo,
      tags,
      imagenes
    };
      console.log(formData);
      alert("Hubo un error al crear el producto ❌");
    }
  };

  return (
    <section className="product-form fade-in">
      <h2>
        <i className="fas fa-box-open"></i> Registrar Producto
      </h2>
      <form onSubmit={onSubmit} className="form-card">
        {/* Nombre */}
        <div className="form-group">
          <label>
            <i className="fas fa-tag"></i> Nombre
          </label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
        </div>

        {/* Modelo */}
        <div className="form-group">
          <label>
            <i className="fas fa-barcode"></i> Modelo
          </label>
          <input type="text" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
        </div>

        {/* Descripción */}
        <div className="form-group">
          <label>
            <i className="fas fa-align-left"></i> Descripción corta
          </label>
          <textarea maxLength={500} value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
        </div>

        {/* Precio */}
        <div className="form-group">
          <label>
            <i className="fas fa-dollar-sign"></i> Precio
          </label>
          <input className="precio" type="number" step="0.01" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value))} required />
        </div>

        {/* Marca */}
        <div className="form-group">
          <label>
            <i className="fas fa-industry"></i> Marca
          </label>
          <select value={idMarca} onChange={(e) => setIdMarca(Number(e.target.value))} required>
            <option value="0">-- Selecciona marca --</option>
            {marcas.map((m) => (
              <option key={m.id_marca} value={m.id_marca}>
                {m.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div className="form-group">
          <label>
            <i className="fas fa-palette"></i> Color
          </label>
          <select value={idColor} onChange={(e) => setIdColor(Number(e.target.value))} required>
            <option value="0">-- Selecciona color --</option>
            {colores.map((c) => (
              <option key={c.id_color} value={c.id_color}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Categoría */}
        <div className="form-group">
          <label>
            <i className="fas fa-list"></i> Categoría
          </label>
          <select value={idCategoria} onChange={(e) => setIdCategoria(Number(e.target.value))} required>
            <option value="0">-- Selecciona categoría --</option>
            {categorias.map((cat) => (
              <option key={cat.id_categoria} value={cat.id_categoria}>
                {cat.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Activo */}
        <div className="form-group checkbox-group">
          <label>
            <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)} />
            <i className="fas fa-check-circle"></i> Activo
          </label>
        </div>

        {/* Tags */}
        <div className="form-group">
          <label>
            <i className="fas fa-tags"></i> Tags
          </label>
          <div className="tags-container" onClick={() => tagInputRef.current?.focus()}>
            {tags.map((t, i) => (
              <div className="tag" key={i}>
                {t}
                <span className="remove" onClick={() => removeTag(i)}>
                  ×
                </span>
              </div>
            ))}
            <input ref={tagInputRef} type="text" placeholder="Añade tags..." onKeyDown={onTagKeyDown} />
          </div>
        </div>

        {/* Especificaciones */}
        <div className="form-group">
          <label>
            <i className="fas fa-cogs"></i> Características
          </label>
          <div className="specs">
            <input type="text" placeholder="Clave" value={clave} onChange={(e) => setClave(e.target.value)} />
            <input type="text" placeholder="Valor" value={valor} onChange={(e) => setValor(e.target.value)} />
            <button type="button" onClick={addSpec}>
              ➕ Añadir
            </button>
          </div>
          <ul className="spec-list">
            {especificaciones.map((s, i) => (
              <li key={i}>
                <strong>{s.clave}</strong>: {s.valor}
                <button type="button" onClick={() => removeSpec(i)}>
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Descuento */}
        <div className="form-group">
          <label>
            <i className="fas fa-percent"></i> Descuento (opcional)
          </label>
          <input
            type="number"
            min={1}
            max={100}
            placeholder="%"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value ? +e.target.value : "")}
          />
          <div className="discount-dates">
            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </div>
        </div>

        {/* Stock */}
        <div className="form-group">
          <label>
            <i className="fas fa-boxes"></i> Stock
          </label>
          <input
            type="text"
            placeholder="Ubicación"
            value={stock.ubicacion}
            onChange={(e) => setStock({ ...stock, ubicacion: e.target.value })}
          />
          <input
            type="number"
            placeholder="Cantidad disponible"
            value={stock.cantidad_disponible}
            onChange={(e) => setStock({ ...stock, cantidad_disponible: e.target.value })}
          />
        </div>

        {/* Imágenes */}
        <div className="form-group">
          <label>
            <i className="fas fa-images"></i> Imágenes
          </label>
          <input type="file" accept="image/*" multiple onChange={onFilesChange} />
          <div className="preview">
            {preview.map((src, i) => (
              <img key={i} src={src} alt={`preview-${i}`} />
            ))}
          </div>
        </div>

        <button type="submit" className="btn-primary">
          <i className="fas fa-paper-plane"></i> Registrar producto
        </button>
      </form>
    </section>
  );
};
