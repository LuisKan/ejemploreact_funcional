import react from "react";
import Restaurante from "./Restaurante";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Inicio = () => {  

    const navigate = useNavigate();

    const handleListaRestaurantes = () => {
        // Navega a la ruta de la lista de restaurantes
        navigate("/restaurantes");
    };

    const handleCrearRestaurante = () => {
        // Navega a la ruta de crear un nuevo restaurante
        navigate("/nuevo");
    };


    return (
        <div className="inicio">
            <h1>Bienvenido a la App de Restaurantes</h1>
            <p>Explora los mejores restaurantes de la ciudad.</p>
            <nav>
                <Link to="/restaurantes">ListaRestaurante</Link> 
                <br />
                <Link to="/nuevo">CrearRestaurante</Link> 
            </nav>

            <button onClick={handleListaRestaurantes}>GO TO LISTA </button>
            <br />
            <button onClick={handleCrearRestaurante}>GO TO CREAR RESTAURANTE</button>
            
        </div>
    );
}

export default Inicio;