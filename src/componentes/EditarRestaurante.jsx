import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

// Componente para editar un restaurante existente
const EditarRestaurante = ({ actualizarRestaurante }) => {
    // Obtiene el parámetro 'id' de la URL
    const { id } = useParams();
    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Estado local para manejar los datos del formulario - incluye puntuacion
    const [restaurante, setrestaurante] = useState({
        nombre: "",
        direccion: "",
        tipo: "",
        imagen: "",
        puntuacion: 1.0 // Cambiado a float
    });

    // Función para mostrar estrellas basadas en la puntuación seleccionada
    const mostrarEstrellas = (puntuacionActual) => {
        const estrellas = [];
        const puntuacionRedondeada = Math.round(puntuacionActual);
        for (let i = 1; i <= 5; i++) {
            if (i <= puntuacionRedondeada) {
                estrellas.push(<span key={i} style={{color: '#ffd700', fontSize: '20px'}}>⭐</span>);
            } else {
                estrellas.push(<span key={i} style={{color: '#ddd', fontSize: '20px'}}>☆</span>);
            }
        }
        return estrellas;
    };

    const handleInicio = () => {
        // Navega a la ruta de inicio
        navigate("/home");
    }

    const handleListaRestaurantes = () => {
        // Navega a la ruta de la lista de restaurantes
        navigate("/restaurantes");
    };

    const baseURL = "http://localhost:8000/api/"; // URL base para las peticiones Axios

    // Efecto para cargar los datos del restaurante al montar el componente o cambiar el id
    useEffect(() => {
        axios.get(baseURL + `restaurantes/${id}`)
            .then((res) => {
                // Actualiza el estado con los datos obtenidos, incluyendo puntuacion
                setrestaurante({
                    nombre: res.data.nombre || "",
                    direccion: res.data.direccion || "",
                    tipo: res.data.tipo || "",
                    imagen: res.data.imagen || "",
                    puntuacion: parseFloat(res.data.puntuacion) || 1.0 // Cambiado para manejar float
                });
            })
            .catch(() => {
                // Muestra alerta si ocurre un error al cargar los datos
                alert("Error al cargar los datos del restaurante.");
            });
    }, [id]);

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setrestaurante({
            ...restaurante, 
            [name]: name === 'puntuacion' ? parseFloat(value) || 0 : value // Cambiado a parseFloat
        });
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar que la puntuación esté en el rango correcto
        if (restaurante.puntuacion < 0 || restaurante.puntuacion > 5) {
            alert("La puntuación debe estar entre 0 y 5");
            return;
        }
        // Llama a la función para actualizar el restaurante
        actualizarRestaurante(id, {
            ...restaurante,
            puntuacion: parseFloat(restaurante.puntuacion)
        });
        // Redirige a la lista de restaurantes
        navigate("/restaurantes");
    };

    return (
        <div style={{padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
            <h2>Editar Restaurante</h2>

            <div style={{marginBottom: '20px'}}>
                <button onClick={handleInicio} style={{marginRight: '10px', padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}> 
                    🏠 IR A INICIO 
                </button>
                <button onClick={handleListaRestaurantes} style={{padding: '8px 16px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}> 
                    📋 IR A LISTA RESTAURANTES 
                </button>
            </div>

            <form onSubmit={handleSubmit} style={{backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', border: '1px solid #ddd'}}>
                
                <div style={{marginBottom: '15px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Nombre del Restaurante:</label>
                    <input 
                        type="text" 
                        name="nombre" 
                        placeholder="Nombre del restaurante" 
                        value={restaurante.nombre} 
                        onChange={handleChange}
                        required
                        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px'}}
                    />
                </div>

                <div style={{marginBottom: '15px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Dirección:</label>
                    <input 
                        type="text" 
                        name="direccion" 
                        placeholder="Dirección" 
                        value={restaurante.direccion} 
                        onChange={handleChange}
                        required
                        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px'}}
                    />
                </div>

                <div style={{marginBottom: '15px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Tipo de Comida:</label>
                    <select
                        name="tipo"
                        value={restaurante.tipo}
                        onChange={handleChange}
                        required
                        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px'}}
                    >
                        <option value="">Seleccione un tipo</option>
                        <option value="Comida Internacional">Comida Internacional</option>
                        <option value="Pizzería">Pizzería</option>
                        <option value="Japonés">Japonés</option>
                        <option value="Cafetería">Cafetería</option>
                        <option value="Mexicano">Mexicano</option>
                        <option value="Italiano">Italiano</option>
                        <option value="Chino">Chino</option>
                        <option value="Vegetariano">Vegetariano</option>
                        <option value="Parrilla">Parrilla</option>
                        <option value="Mariscos">Mariscos</option>
                    </select>
                </div>

                <div style={{marginBottom: '15px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>URL de la Imagen:</label>
                    <input 
                        type="url" 
                        name="imagen" 
                        placeholder="https://ejemplo.com/imagen.jpg" 
                        value={restaurante.imagen} 
                        onChange={handleChange}
                        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px'}}
                    />
                </div>

                <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Puntuación (0.0 - 5.0):</label>
                    <input
                        type="number"
                        name="puntuacion"
                        min="0"
                        max="5"
                        step="0.1"
                        value={restaurante.puntuacion}
                        onChange={handleChange}
                        placeholder="Ej: 4.5"
                        required
                        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', marginBottom: '10px'}}
                    />
                    
                    {/* Vista previa de las estrellas */}
                    <div style={{padding: '10px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px'}}>
                        <span style={{marginRight: '10px', fontWeight: 'bold'}}>Vista previa:</span>
                        {mostrarEstrellas(restaurante.puntuacion)}
                        <span style={{marginLeft: '10px', color: '#666'}}>({restaurante.puntuacion}/5.0)</span>
                    </div>
                    
                    {/* Mensaje de ayuda */}
                    <div style={{marginTop: '5px', fontSize: '12px', color: '#666'}}>
                        Ingrese un número decimal entre 0.0 y 5.0 (ej: 4.7, 3.2, 5.0)
                    </div>
                </div>

                <button 
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: '#ffc107',
                        color: '#212529',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    💾 Guardar Cambios
                </button>
            </form>
        </div>
    );
};

export default EditarRestaurante;
