import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Componente funcional para crear y mostrar restaurantes
const CrearRestaurante = ({agregarRestaurante}) => {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [tipo, setTipo] = useState("");
    const [imagen, setImagen] = useState("");
    const [puntuacion, setPuntuacion] = useState(1.0); // Cambiado a float
    const [restaurantes, setRestaurantes] = useState([]);


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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar que la puntuación esté en el rango correcto
        if (puntuacion < 0 || puntuacion > 5) {
            alert("La puntuación debe estar entre 0 y 5");
            return;
        }
        // Incluir puntuación en el nuevo restaurante
        const nuevoRestaurante = { nombre, direccion, tipo, imagen, puntuacion: parseFloat(puntuacion) };
        
        agregarRestaurante(nuevoRestaurante);
        setNombre('');
        setDireccion('');
        setTipo('');
        setImagen('');
        setPuntuacion(1.0); // Resetear puntuación
        navigate('/restaurantes'); 
    };


    const navigate = useNavigate();

    const handleListaRestaurantes = () => {
        // Navega a la ruta de la lista de restaurantes
        navigate("/restaurantes");
    }

    const handleInicio = () => {
        // Navega a la ruta de inicio
        navigate("/home");
    }

    return (
        <div style={{padding: '20px', maxWidth: '600px', margin: '0 auto'}}>
            <h2>Crear Nuevo Restaurante</h2>

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
                        placeholder="Ingrese el nombre del restaurante"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px'}}
                    />
                </div>

                <div style={{marginBottom: '15px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Dirección:</label>
                    <input
                        type="text"
                        placeholder="Ingrese la dirección"
                        value={direccion}
                        onChange={(e) => setDireccion(e.target.value)}
                        required
                        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px'}}
                    />
                </div>

                <div style={{marginBottom: '15px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Tipo de Comida:</label>
                    <select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
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
                        placeholder="https://ejemplo.com/imagen.jpg"
                        value={imagen}
                        onChange={(e) => setImagen(e.target.value)}
                        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px'}}
                    />
                </div>

                <div style={{marginBottom: '20px'}}>
                    <label style={{display: 'block', marginBottom: '5px', fontWeight: 'bold'}}>Puntuación (0.0 - 5.0):</label>
                    <input
                        type="number"
                        min="0"
                        max="5"
                        step="0.1"
                        value={puntuacion}
                        onChange={(e) => setPuntuacion(parseFloat(e.target.value) || 0)}
                        placeholder="Ej: 4.5"
                        required
                        style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px', marginBottom: '10px'}}
                    />
                    
                    {/* Vista previa de las estrellas */}
                    <div style={{padding: '10px', backgroundColor: '#fff', border: '1px solid #ddd', borderRadius: '4px'}}>
                        <span style={{marginRight: '10px', fontWeight: 'bold'}}>Vista previa:</span>
                        {mostrarEstrellas(puntuacion)}
                        <span style={{marginLeft: '10px', color: '#666'}}>({puntuacion}/5.0)</span>
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
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '16px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    ✅ Crear Restaurante
                </button>
            </form>
        </div>
    );
};

export default CrearRestaurante;