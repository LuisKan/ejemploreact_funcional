import react from "react";
import Restaurante from "./Restaurante";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Inicio.css";

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

    const handleAxiosRestaurantes = () => {
        // Navega a la ruta de AxiosRestaurantes
        navigate("/axios");
    };


    return (
        <div className="inicio">
            <h1>🍽️ Bienvenido a la App de Restaurantes</h1>
            <p>
                Explora los mejores restaurantes de la ciudad. 
                Descubre nuevos sabores, comparte tus experiencias y 
                encuentra tu próximo lugar favorito para comer.
            </p>

            <div className="inicio-buttons">
                <button onClick={handleListaRestaurantes} className="btn-lista">
                    <span className="btn-icon">📋</span>
                    Ver Lista de Restaurantes
                </button>
                
                <button onClick={handleCrearRestaurante} className="btn-crear">
                    <span className="btn-icon">➕</span>
                    Crear Nuevo Restaurante
                </button>
            </div>
        </div>
    );
}

export default Inicio;