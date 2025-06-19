import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// Componente para editar un restaurante existente
const EditarRestaurante = ({ actualizarRestaurante }) => {
    // Obtiene el parámetro 'id' de la URL
    const { id } = useParams();
    // Hook para navegar entre rutas
    const navigate = useNavigate();

    // Estado local para manejar los datos del formulario
    const [formData, setFormData] = useState({
        nombre: "",
        direccion: "",
        tipo: "",
        imagen: ""
    });

    const handleInicio = () => {
        // Navega a la ruta de inicio
        navigate("/home");
    }

    const handleListaRestaurantes = () => {
        // Navega a la ruta de la lista de restaurantes
        navigate("/restaurantes");
    };

    // Efecto para cargar los datos del restaurante al montar el componente o cambiar el id
    useEffect(() => {
        axios.get(`http://localhost:3001/restaurante/${id}`)
            .then((res) => {
                // Actualiza el estado con los datos obtenidos
                setFormData(res.data);
            })
            .catch(() => {
                // Muestra alerta si ocurre un error al cargar los datos
                alert("Error al cargar los datos del restaurante.");
            });
    }, [id]);

    // Maneja los cambios en los campos del formulario
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    // Maneja el envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Llama a la función para actualizar el restaurante
        actualizarRestaurante(id, formData);
        // Redirige a la lista de restaurantes
        navigate("/restaurantes");
    };

    return (
        <div>
            <button onClick={handleInicio}> GO TO INICIO </button>
            <br />
            <button onClick={handleListaRestaurantes}>GO TO LISTA </button>

            <h2>Editar Restaurante</h2>
            <form onSubmit={handleSubmit}>
                {/* Campo para el nombre */}
                <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleChange} />
                {/* Campo para la dirección */}
                <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} onChange={handleChange} />
                {/* Campo para el tipo */}
                <input type="text" name="tipo" placeholder="Tipo" value={formData.tipo} onChange={handleChange} />
                {/* Campo para la imagen */}
                <input type="text" name="imagen" placeholder="Imagen" value={formData.imagen} onChange={handleChange} />
                {/* Botón para guardar los cambios */}
                <br />
                <button type="submit">Guardar Cambios</button>
            </form>
        </div>
    );
};

export default EditarRestaurante;
