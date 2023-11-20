import React, { useState, useEffect } from "react";
import Style from "./inventarioAdmin.module.css";
import NavAdmin from "../../components/NavAdmin/NavAdmin";
import Card from "../../components/molecules/card/Card";
import tennis from "../../assets/nikeDunk.webp";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InventarioAdmin() {
  const [productos, setProductos] = useState(JSON.parse(localStorage.getItem("productos")) || []);
  const [nuevoProducto, setNuevoProducto] = useState(null);
  const [modelos, setModelos] = useState(["Nike", "Puma", "Adidas", "Pirma"]);

  useEffect(() => {
    // Obtener el token almacenado localmente (puedes implementar esto según tus necesidades)
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getCalzados(); // Mover esta línea aquí para asegurarse de que token esté definido
    }
  }, []);
  

  const getCalzados = async () => {
    try {
      const response = await fetch("http://localhost:8080/v1/Calzados?page=1&size=10", {
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token a la solicitud
        },
      });
      if (!response.ok) {
        throw new Error("Error al obtener calzados");
      }
      const data = await response.json();
      setProductos(data.data);
    } catch (error) {
      console.error("Error al obtener calzados:", error);
      toast.error("Error al obtener calzados");
    }
  };
  

  const abrirFormulario = () => {
    setNuevoProducto({
      id: Date.now(),
      marca: "",
      modelo: "",
      cantidad: 1,
      talla: "23",
      precio: "",
      idCliente: "",
      imagen: tennis,
    });
  };

  const cerrarFormulario = () => {
    setNuevoProducto(null);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNuevoProducto((prevProducto) => ({
          ...prevProducto,
          imagen: reader.result,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setNuevoProducto((prevProducto) => ({
        ...prevProducto,
        [name]: value,
      }));
    }
  };

  const agregarProducto = () => {
    if (!nuevoProducto.marca || !nuevoProducto.modelo || !nuevoProducto.cantidad || nuevoProducto.cantidad < 0 || !nuevoProducto.talla || nuevoProducto.talla < 0 || !nuevoProducto.precio || nuevoProducto.precio < 0) {
      toast.error("Completa todas las casillas y asegúrate de que los números no sean negativos.");
    } else {
      if (!productos.some((producto) => producto.marca === nuevoProducto.marca)) {
        setProductos([...productos, { marca: nuevoProducto.marca, productos: [nuevoProducto] }]);
        toast.success("Producto agregado correctamente.");
      } else {
        const nuevosProductos = productos.map((producto) =>
          producto.marca === nuevoProducto.marca
            ? { ...producto, productos: [...producto.productos, nuevoProducto] }
            : producto
        );
        setProductos(nuevosProductos);
        toast.success("Producto agregado correctamente.");
      }

      cerrarFormulario();
    }
  };

  const eliminarProducto = (marca, id) => {
    const nuevosProductos = productos.map((producto) =>
      producto.marca === marca
        ? {
          ...producto,
          productos: producto.productos.filter((prod) => prod.id !== id),
        }
        : producto
    );
    setProductos(nuevosProductos);
    toast.success("Producto eliminado correctamente.");
  };

  const editarProducto = (marca, id, productoEditado) => {
    const nuevosProductos = productos.map((producto) =>
      producto.marca === marca
        ? {
          ...producto,
          productos: producto.productos.map((prod) =>
            prod.id === id ? { ...prod, ...productoEditado } : prod
          ),
        }
        : producto
    );
    setProductos(nuevosProductos);
    toast.success("Producto editado correctamente.");
  };

  return (
    <div>
      <div className={Style.contenedor}>
        <NavAdmin />
        <div className={Style.contenedorCard}>
          <div className={Style.bt}>
            <button className={Style.agregar} onClick={abrirFormulario}>
              Agregar Producto
            </button>
          </div>

          <br />
          <div className={Style.formularioContainer}>
            {nuevoProducto && (
              <div className={Style.formulario}>
                <h3>Ingrese los detalles del nuevo producto:</h3>
                <form>
                  <div className={Style.formGroup}>
                    <label>
                      Marca:
                      <select name="marca" value={nuevoProducto.marca} onChange={handleChange}>
                        <option value="">Seleccionar Marca</option>
                        {modelos.map((modelo) => (
                          <option key={modelo} value={modelo}>
                            {modelo}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                  <div className={Style.formGroup}>
                    <label>
                      Modelo:
                      <select name="modelo" value={nuevoProducto.modelo} onChange={handleChange}>
                        <option value="">Seleccionar Modelo</option>
                        <option value="Modelo1">Modelo1</option>
                        <option value="Modelo2">Modelo2</option>
                        <option value="Modelo3">Modelo3</option>
                        <option value="Modelo4">Modelo4</option>
                      </select>
                    </label>
                  </div>
                  <div className={Style.formGroup}>
                    <label>
                      Cantidad:
                      <input
                        type="number"
                        name="cantidad"
                        value={nuevoProducto.cantidad}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className={Style.formGroup}>
                    <label>
                      Talla:
                      <input
                        type="number"
                        name="talla"
                        value={nuevoProducto.talla}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className={Style.formGroup}>
                    <label>
                      Precio:
                      <input
                        type="number"
                        name="precio"
                        value={nuevoProducto.precio}
                        onChange={handleChange}
                      />
                    </label>
                  </div>
                  <div className={Style.formGroup}>
                    <label>
                      Imagen:
                      <input type="file" name="imagen" onChange={handleChange} />
                    </label>
                  </div>

                  <div className={Style.opciones}>
                    <button type="button" onClick={agregarProducto}>
                      Agregar
                    </button>
                    <button type="button" onClick={cerrarFormulario}>
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>


          {productos.map(({ marca, productos }) => (
            <div key={marca} className={Style.contenido}>
              <h3>{marca}</h3>
              <div className={Style.cards}>
                {productos.map((producto) => (
                  <Card
                    key={producto.id}
                    {...producto}
                    onEliminar={() => eliminarProducto(marca, producto.id)}
                    onEditar={(productoEditado) => editarProducto(marca, producto.id, productoEditado)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
