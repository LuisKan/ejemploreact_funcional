import { useState } from "react";
import Restaurante from "./Restaurante";
import CrearRestaurante from "./CrearRestaurante";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";

// Componente funcional para listar restaurantes, recibe la lista de restaurantes y las funciones de like y dislike como props
function ListaRestaurantes({ restaurantes, setRestaurantes, eliminarRestaurante }) {

    // Define el estado para el contador total de likes
    const [likesTotales, setLikesTotales] = useState(0);

    // Función para incrementar el contador de likes totales
    const handlerLikeTotales = () => {
        setLikesTotales((prevState) => prevState + 1); // Incrementa el contador de likes totales
    };

    // Función para decrementar el contador de likes totales
    const handlerDislikeTotales = () => {
        setLikesTotales((prevState) => prevState - 1); // Decrementa el contador de likes totales
    }

    // Función que agrega un nuevo restaurante al estado de restaurantes
    const agregarRestaurante = (nuevo) => {
        setRestaurantes([...restaurantes, nuevo]); // Añade el nuevo restaurante al array existente
    };

    const navigate = useNavigate();

    const handleCrearRestaurante = () => {
        // Navega a la ruta de crear un nuevo restaurante
        navigate("/nuevo");
    }

    const handleInicio = () => {
        // Navega a la ruta de inicio
        navigate("/home");
    }

    // Renderiza el componente App
    return (
        // Contenedor principal de la aplicación
        <div>

            <nav>
                <Link to="/nuevo">CrearRestaurante</Link>
                <br />
                <Link to="/home">Inicio</Link>
            </nav>

            <button onClick={handleInicio}> GO TO INICIO </button>
            <br />
            <button onClick={handleCrearRestaurante}> GO TO CREAR RESTAURANTE </button>


            {restaurantes.map((restaurante) => (
                <div key={restaurante.id} style={{ marginBottom: "20px" }}>
                    {/* Renderiza el componente Restaurante con sus props y handlers de likes/dislikes */}
                    <Restaurante
                        nombre={restaurante.nombre}
                        direccion={restaurante.direccion}
                        tipo={restaurante.tipo}
                        imagen={restaurante.imagen}
                        handlerLikeTotales={handlerLikeTotales}
                        handlerDislikeTotales={handlerDislikeTotales}
                    />
                    <button onClick={() => eliminarRestaurante(restaurante.id)}>
                        Eliminar Restaurante
                    </button>
                    <button onClick={() => navigate(`/editar/${restaurante.id}`)}>Editar Restaurante</button>

                </div>
            ))}
            <div style={{ marginTop: "20px" }}>
                <h3>Likes totales: {likesTotales}</h3>
            </div>

            <div style={{ marginTop: "30px" }}>
                {/* Título del formulario */}
                <h2>Agregar Nuevo Restaurante</h2>
                {/* Renderiza el componente CrearRestaurante y pasa la función para agregar */}
                <CrearRestaurante onCrear={agregarRestaurante} />
            </div>
        </div>
    );
}


export default ListaRestaurantes;


