import React, { useState } from "react";
import style from "./Buscador.module.css";

function Buscador() {
  const [filtradoNombre, setFiltrado] = useState([]);
  const arr = ["a", "b", "c", "d", "especial", "facil", "g", "h", "i"];

  const handleChange = ({ target }) => {
    const inputValue = target.value;
    const filtered = arr
      .filter((nombre) => nombre.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, 5);
  
    setFiltrado(filtered);
  };
  

  return (
    <div className={style.group}>
      <input
        placeholder="Search"
        type="search"
        className={style.input}
        onChange={handleChange}
        list="x"
      />
      <svg className={style.icon} aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>

      <datalist id="x">
        {filtradoNombre.map((nombre, index) => (
          <option key={index} value={nombre} />
        ))}
      </datalist>
    </div>
  );
}

export default Buscador;