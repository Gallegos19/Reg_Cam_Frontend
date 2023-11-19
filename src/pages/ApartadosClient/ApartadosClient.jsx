import React from "react";
import { useParams } from "react-router-dom";
import ZapatosData from "../../components/ProductData/ProductData";
import Cards from "../../components/CardClient/CardsClient";
import NavClient from "../../components/NavClient/NavClient";
import Footer from "../../components/Footer/Footer";

export default function Zapatos() {
  const { genero } = useParams();
  const generos = genero.slice(1).charAt(0).toUpperCase() + genero.slice(2);
  const data = ZapatosData[generos.toLowerCase()].zapatos || [];
  const dataNinas = ZapatosData[generos.toLowerCase()].zapatosninas || [];

  // Verificar si ambos arrays de datos son vacíos
  if (
    (data.length === 0 && dataNinas.length === 0) ||
    (!Array.isArray(data) && !Array.isArray(dataNinas))
  ) {
    // Manejo de caso en que ambos arrays son vacíos o no son arrays
    return (
      <div>
        <NavClient />
        {(genero === ":ninos" || genero === ":ninas") && (
          <p>No hay datos disponibles para mostrar.</p>
        )}
        <Footer />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        margin: "auto",
      }}
    >
      <NavClient />
      <div>
        <h2>Apartados</h2>
        
      </div>
      <Footer />
    </div>
  );
}
