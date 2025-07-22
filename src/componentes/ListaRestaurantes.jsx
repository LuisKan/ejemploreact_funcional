import { useState } from "react";
import Restaurante from "./Restaurante";
import CrearRestaurante from "./CrearRestaurante";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React from "react";
import "./ListaRestaurantes.css";

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
        <div className="lista-restaurantes-container">
            <h2 className="lista-restaurantes-title">🍽️ Lista de Restaurantes</h2>
            
            <div className="navigation-buttons">
                <button onClick={handleInicio} className="btn btn-home">
                    <span className="btn-icon">🏠</span>
                    IR A INICIO
                </button>
                <button onClick={handleCrearRestaurante} className="btn btn-create">
                    <span className="btn-icon">➕</span>
                    CREAR RESTAURANTE
                </button>
            </div>

            {restaurantes.length === 0 ? (
                <div className="no-restaurantes">
                    <p>No hay restaurantes disponibles. ¡Crea el primero!</p>
                </div>
            ) : (
                <div className="restaurantes-grid">
                    {restaurantes.map((restaurante) => (
                        <div key={restaurante._id} className="restaurante-card">
                            {/* Renderiza el componente Restaurante con sus props y handlers de likes/dislikes */}
                            <Restaurante
                                nombre={restaurante.nombre}
                                direccion={restaurante.direccion}
                                tipo={restaurante.tipo}
                                imagen={restaurante.imagen}
                                puntuacion={restaurante.puntuacion}
                                handlerLikeTotales={handlerLikeTotales}
                                handlerDislikeTotales={handlerDislikeTotales}
                            />
                            <div className="restaurante-actions">
                                <button 
                                    onClick={() => eliminarRestaurante(restaurante._id)}
                                    className="btn btn-delete"
                                >
                                    <span className="btn-icon">🗑️</span>
                                    Eliminar
                                </button>
                                <button 
                                    onClick={() => navigate(`/editar/${restaurante._id}`)}
                                    className="btn btn-edit"
                                >
                                    <span className="btn-icon">✏️</span>
                                    Editar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            
            <div className="likes-counter">
                <h3>
                    💖 Likes Totales: 
                    <span className="likes-total-number">{likesTotales}</span>
                </h3>
            </div>
        </div>
    );
}


export default ListaRestaurantes;


