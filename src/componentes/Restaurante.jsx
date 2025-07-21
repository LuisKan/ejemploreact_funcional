// Importa React y el hook useState desde la librería react
import React, {useState} from "react";
// Importa el archivo de estilos CSS para el componente Restaurante
import "./Restaurante.css"; // importamos el css
import ListaRestaurantes from "./ListaRestaurantes"; // Importa el componente ListaRestaurantes


// Define el componente funcional Restaurante que recibe props como argumento
function Restaurante(props){

    // Desestructura las propiedades recibidas por el componente, incluyendo puntuacion
    const { nombre, direccion, tipo, imagen, puntuacion, handlerLikeTotales, handlerDislikeTotales} = props; 
    
    // Inicializa el estado local preferencias con likes y dislikes en 0 usando useState
    const [preferencias, setPreferencias] = useState({likes: 0, dislikes: 0}); 
    // Extrae los valores de likes y dislikes del estado preferencias
    const likes = preferencias.likes;
    const dislikes = preferencias.dislikes;

    // Función para mostrar estrellas basadas en la puntuación
    const mostrarEstrellas = (puntuacion) => {
        const estrellas = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= puntuacion) {
                estrellas.push(<span key={i} style={{color: '#ffd700'}}>⭐</span>);
            } else {
                estrellas.push(<span key={i} style={{color: '#ddd'}}>☆</span>);
            }
        }
        return estrellas;
    };

    // Define la función handlerLike para manejar el evento de dar like
    const handlerLike = () => {
        // Actualiza el estado preferencias incrementando el contador de likes en 1
        setPreferencias((prevPreferencias) => ({ 
            ...prevPreferencias,
            likes: prevPreferencias.likes + 1
        }));
        // Llama a la función handlerLikeTotales para actualizar el contador global de likes
        handlerLikeTotales(); 
    }
    // Define la función handlerDislike para manejar el evento de dar dislike
    const handlerDislike = () => {
        // Actualiza el estado preferencias decrementando el contador de dislikes en 1
        setPreferencias((prevPreferencias) => ({ 
            ...prevPreferencias,
            dislikes: prevPreferencias.dislikes - 1
        }));
        // Llama a la función handlerDislikeTotales para actualizar el contador global de dislikes
        handlerDislikeTotales(); 
    }

    // Retorna el JSX que representa la estructura visual del componente
    return (
        <div>
            {/* Muestra el nombre del restaurante */}
            <h1>{nombre}</h1>            
            {/* Muestra la dirección del restaurante */}
            <h3>{direccion}</h3>
            {/* Muestra el tipo de restaurante */}
            <h4>{tipo}</h4>
            {/* Muestra la puntuación del restaurante con estrellas */}
            <div style={{margin: '10px 0'}}>
                <h4>Puntuación: {puntuacion}/5</h4>
                <div style={{fontSize: '20px'}}>{mostrarEstrellas(puntuacion)}</div>
            </div>
            {/* Muestra la imagen del restaurante */}
            <img src={imagen} alt={nombre}/>
            {/* Muestra el número de likes */}
            <h4> Likes: {likes}</h4>
            {/* Muestra el número de dislikes */}
            <h4> Dislikes: {dislikes}</h4>
            {/* Botón para dar like, ejecuta handlerLike al hacer clic */}
            <button onClick={handlerLike}>LIKE</button>
            {/* Botón para dar dislike, ejecuta handlerDislike al hacer clic */}
            <button onClick={handlerDislike}>DISLIKE</button>
            
        </div>
    );
}

// Exporta el componente Restaurante para que pueda ser utilizado en otros archivos
export default Restaurante; //disponible para otros archivos
