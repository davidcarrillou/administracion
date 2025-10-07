// src/components/Home.tsx
import type { DatePickerProps } from 'antd';
import { Button, DatePicker, message, Space } from 'antd';
import React, { useEffect, useState, useRef, version } from "react";
import dayjs from "dayjs"; // para manejar fechas fácilmente
import "dayjs/locale/es"; // soporte de idioma español
import locale from "antd/es/date-picker/locale/es_ES";
import { AutoComplete } from 'antd';
import type { AutoCompleteProps } from 'antd';


function click (){
  console.log('click')
}

export const Home: React.FC = () =>{
  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  console.log(date, dateString);
};
const [options, setOptions] = useState<AutoCompleteProps['options']>([]);
  const handleSearch = (value: string) => {
    setOptions(() => {
      if (!value || value.includes('@')) {
        return [];
      }
      return ['gmail.com', '163.com', 'qq.com'].map((domain) => ({
        label: `${value}@${domain}`,
        value: `${value}@${domain}`,
      }));
    });
  };

  return(
  <div className="home">
    <h1>Bienvenido al Panel de Administración</h1>
    <p>Utiliza la navegación para gestionar Marcas y Colores.</p>
    <div className="home-links">
      <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'marca' }))}>
        Gestionar Marcas
      </button>
      <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'color' }))}>
        Gestionar Colores
      </button>
      <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'categoria' }))}>
        Gestionar Categorias
      </button>
      <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'tag' }))}>
        Gestionar Tags
      </button>
      <button onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: 'producto' }))}>
        Registar producto
      </button>
    </div>
    <div>
       <div style={{ padding: '0 24px' }}>
        <h1>antd version: {version}</h1>
        <Space>
          <DatePicker
        />
          <Button type="primary"
          onClick={click}>Primary Button</Button>
          <Button type="primary" loading>
          Loading
        </Button>
        <Button type="primary" size="small" loading>
          Loading
        </Button>
        <AutoComplete
      style={{ width: 200 }}
      onSearch={handleSearch}
      placeholder="input here"
      options={options}
    />
        </Space>
      </div>
    </div>
  </div>)
};
