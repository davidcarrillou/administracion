"use client"

import { Layout, Menu } from "antd"
import {
  HomeOutlined,
  ShoppingOutlined,
  AppstoreOutlined,
  TagsOutlined,
  BgColorsOutlined,
  UnorderedListOutlined,
  PercentageOutlined,
} from "@ant-design/icons"
import type { MenuProps } from "antd"

const { Sider } = Layout

type ElementoMenu = Required<MenuProps>["items"][number]

interface PropiedadesMenuLateral {
  seccionActual: string
  cambiarSeccion: (seccion: string) => void
}

export default function MenuLateral({ seccionActual, cambiarSeccion }: PropiedadesMenuLateral) {
  const elementosMenu: ElementoMenu[] = [
    {
      key: "inicio",
      icon: <HomeOutlined />,
      label: "Inicio",
    },
    {
      key: "productos",
      icon: <ShoppingOutlined />,
      label: "Productos",
    },
    {
      key: "catalogos",
      icon: <AppstoreOutlined />,
      label: "Catálogos",
      children: [
        {
          key: "marcas",
          icon: <TagsOutlined />,
          label: "Marcas",
        },
        {
          key: "categorias",
          icon: <UnorderedListOutlined />,
          label: "Categorías",
        },
        {
          key: "etiquetas",
          icon: <TagsOutlined />,
          label: "Etiquetas",
        },
      ],
    },
    {
      key: "colores",
      icon: <BgColorsOutlined />,
      label: "Colores",
    },
    {
      key: "descuentos",
      icon: <PercentageOutlined />,
      label: "Descuentos",
    },
  ]

  const alSeleccionarMenu: MenuProps["onClick"] = (e) => {
    cambiarSeccion(e.key)
  }

  return (
    <Sider width={250} theme="light">
      <div
        style={{
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
          borderBottom: "1px solid rgb(var(--color-border))",
        }}
      >
        Dashboard Admin
      </div>
      <Menu
        mode="inline"
        selectedKeys={[seccionActual]}
        defaultOpenKeys={["catalogos"]}
        items={elementosMenu}
        onClick={alSeleccionarMenu}
        style={{ borderRight: 0 }}
      />
    </Sider>
  )
}
