"use client"

// src/components/MarcaList.tsx
import type React from "react"
import { useEffect, useState } from "react"
import type { Marca } from "../../models/Marca"
import { listarMarcas, eliminarMarca } from "../../services/MarcaService"

interface Props {
  onEdit: (marca: Marca) => void
}

export const MarcaList: React.FC<Props> = ({ onEdit }) => {
  const [marcas, setMarcas] = useState<Marca[]>([])
  const [error, setError] = useState<string>("")

  useEffect(() => {
    cargar()
  }, [])

  const cargar = async () => {
    try {
      const data = await listarMarcas()
      setMarcas(data)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const borrar = async (id: number) => {
    if (!confirm("¿Eliminar esta marca?")) return
    try {
      await eliminarMarca(id)
      cargar()
    } catch (e: any) {
      setError(e.message)
    }
  }

  return (
    <div className="list-container">
      <div className="list-header">
        <h2 className="list-title">Listado de Marcas</h2>
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="table-container">
        <table className="data-table">
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {marcas.map((m) => (
              <tr key={m.id_marca} className="table-row">
                <td className="table-cell">{m.id_marca}</td>
                <td className="table-cell">{m.nombre}</td>
                <td className="table-cell">
                  <span className={`status-badge ${m.activo ? "status-active" : "status-inactive"}`}>
                    {m.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="table-cell">
                  <div className="action-buttons">
                    <button className="action-button edit-button" onClick={() => onEdit(m)}>
                      Editar
                    </button>
                    <button className="action-button delete-button" onClick={() => borrar(m.id_marca)}>
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
