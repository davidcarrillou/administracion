"use client"

// src/components/MarcaForm.tsx
import type React from "react"
import { useEffect, useState } from "react"
import type { Marca } from "../../models/Marca"
import { crearMarca, actualizarMarca } from "../../services/MarcaService"

interface Props {
  marcaEdit?: Marca
  onSaved: () => void
}

export const MarcaForm: React.FC<Props> = ({ marcaEdit, onSaved }) => {
  const [nombre, setNombre] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [activo, setActivo] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (marcaEdit) {
      setNombre(marcaEdit.nombre)
      setDescripcion(marcaEdit.descripcion || "")
      setActivo(marcaEdit.activo ?? true)
    }
  }, [marcaEdit])

  const reset = () => {
    setNombre("")
    setDescripcion("")
    setActivo(true)
    setError("")
  }

  const guardar = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (marcaEdit) {
        await actualizarMarca({ ...marcaEdit, nombre, descripcion, activo })
      } else {
        await crearMarca({ nombre, descripcion, activo })
      }
      reset()
      onSaved()
    } catch (e: any) {
      setError(e.message || "Error al guardar la marca")
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">{marcaEdit ? "Editar Marca" : "Crear Marca"}</h2>
      {error && <div className="error-message">{error}</div>}

      {(!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) && (
        <div className="error-message">
          ⚠️ Para usar esta aplicación, necesitas configurar las variables de entorno de Supabase en Project Settings:
          <br />• VITE_SUPABASE_URL
          <br />• VITE_SUPABASE_ANON_KEY
        </div>
      )}

      <form onSubmit={guardar}>
        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input
            type="text"
            className="form-input"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
            placeholder="Ingresa el nombre de la marca"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-textarea"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción opcional de la marca"
          />
        </div>
        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              className="checkbox-input"
              id="activo"
              checked={activo}
              onChange={(e) => setActivo(e.target.checked)}
            />
            <label className="checkbox-label" htmlFor="activo">
              Marca activa
            </label>
          </div>
        </div>
        <button type="submit" className="form-button">
          {marcaEdit ? "Actualizar Marca" : "Crear Marca"}
        </button>
      </form>
    </div>
  )
}
