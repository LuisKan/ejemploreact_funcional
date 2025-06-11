import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Componente funcional para crear y mostrar restaurantes
const CrearRestaurante = ({agregarRestaurante}) => {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const [tipo, setTipo] = useState("");
    const [imagen, setImagen] = useState("");
    const [restaurantes, setRestaurantes] = useState([]);


    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoRestaurante = { nombre, direccion, tipo, imagen };
        
        agregarRestaurante(nuevoRestaurante);
        setNombre('');
        setDireccion('');
        setTipo('');
        setImagen('');
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
        <div>

            <nav>
                <Link to="/restaurantes">ListaRestaurante</Link>
                <br />
                <Link to="/home">Inicio</Link>
            </nav>

            <button onClick={handleInicio}> GO TO INICIO </button>
            <br />
            <button onClick={handleListaRestaurantes}> GO TO LISTA RESTAURANTE </button>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Dirección"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Tipo de comida"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="URL de la imagen"
                    value={imagen}
                    onChange={(e) => setImagen(e.target.value)}
                />
                <button type="submit">Crear Restaurante</button>
            </form>
            
        </div>
    );
};

export default CrearRestaurante;