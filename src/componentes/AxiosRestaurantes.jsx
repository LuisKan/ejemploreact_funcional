import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function AxiosRestaurantes() {


    const [restaurantes, setRestaurantes] = useState([]);
    const [error, setError] = useState(null);
    const [clientes, setClientes] = useState([]);

    const fetchRestaurantes = () => {
        axios.get("http://localhost:3001/restaurante")
            .then(response => {
                setRestaurantes(response.data);
                setError(null);
            })
            .catch(() => {
                setError("Error al cargar los restaurantes");
            });
    };

    const fetchClientes = () => {
        axios.get("http://localhost:3001/clientes")
            .then(response => {
                setClientes(response.data);
                setError(null);
            })
            .catch(() => {
                setError("Error al cargar los clientes");
            });
    };

    const fetchRestaurantesYClientes = () => {
        fetchRestaurantes();
        fetchClientes();
    };

    const navigate = useNavigate();
    const handleListaRestaurantes = () => {
        // Navega a la ruta de la lista de restaurantes
        navigate("/restaurantes");
    };
    const handleInicio = () => {
        // Navega a la ruta de inicio
        navigate("/home");
    };


    return (
        <div>
            <button onClick={fetchRestaurantesYClientes}>Cargar Datos</button>
            <nav>
                <Link to="/restaurantes">ListaRestaurante</Link>
                <br />
                <Link to="/home">Inicio</Link>
            </nav>
            <button onClick={handleInicio}> GO TO INICIO </button>
            <br />
            <button onClick={handleListaRestaurantes}> GO TO LISTA RESTAURANTE </button>

            {error && <p>{error}</p>}
            <ul>
                <h3>Lista de Restaurantes</h3>
                {restaurantes.map((restaurante, index) => (
                    <li key={index}>{restaurante.nombre}</li>
                ))}
                <h3>Lista de Clientes</h3>
                {clientes.map((cliente, index) => (
                    <li key={index}>{cliente.nombre}</li>
                ))}

            </ul>
        </div>
    );
}

export default AxiosRestaurantes;
