import React from 'react'
import NavClient from '../../components/NavClient/NavClient'
import Cards from '../../components/CardClient/CardsClient'
import adidas from '../../assets/adidashombre.jpg'
import adidasF from '../../assets/adidasmujer.jpg'
export default function Adidas() {
    const productos = [
        { id: 1, marca: "Nike", imagen: adidas, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 2, marca: "Nike", imagen: adidas, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 3, marca: "Nike", imagen: adidas, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 4, marca: "Nike", imagen: adidas, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 5, marca: "Nike", imagen: adidas, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
        // Agrega más productos según sea necesario
      ];
      const productos2 = [
        { id: 6, marca: "Nike", imagen: adidasF, modelo: "Nike ", precio: 2000,cantidad:1, star: 5 },
        { id: 7, marca: "Nike", imagen: adidasF, modelo: "Nike ", precio: 3000,cantidad:1, star: 4 },
        { id: 8, marca: "Nike", imagen: adidasF, modelo: "Nike ", precio: 1000,cantidad:1, star: 3 },
        { id: 9, marca: "Nike", imagen: adidasF, modelo: "Nike ", precio: 2300,cantidad:1, star: 2 },
        { id: 10, marca: "Nike", imagen: adidasF, modelo: "Nike ", precio: 2500,cantidad:1, star: 5 }
        // Agrega más productos según sea necesario
      ];
  return (
    <div style={{display:'flex', flexDirection:'column', width:'100%', margin:'auto'}}>
        <NavClient />

        <div style={{display:'flex', flexDirection:'column', width:'80%',margin:'auto',marginTop:'2%'}}>
        <h3 style={{fontFamily:'Poppins',marginBottom:'2%'}}>Caballero</h3>
        <div style={{display:'flex', width:'100%',margin:'auto',flexWrap:'wrap'}}>
        {productos.map(producto => (
          <Cards
            key={producto.id}
            id={producto.id}
            marca={producto.marca}
            imagen={producto.imagen}
            modelo={producto.modelo}
            precio={producto.precio}
            stars={producto.star}
          />
        ))}
        </div>
        <h3 style={{fontFamily:'Poppins',marginBottom:'2%'}}>Dama</h3>
        <div style={{display:'flex', width:'100%',margin:'auto',flexWrap:'wrap'}}>
        {productos2.map(producto => (
          <Cards
            key={producto.id}
            id={producto.id}
            marca={producto.marca}
            imagen={producto.imagen}
            modelo={producto.modelo}
            precio={producto.precio}
            stars={producto.star}
          />
        ))}
        </div>
        </div>
    </div>
  )
}

