// Importaciones necesarias
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ListaRestaurantes from "./componentes/ListaRestaurantes";
import Inicio from "./componentes/Inicio";
import CrearRestaurante from "./componentes/CrearRestaurante";
import Restaurante from "./componentes/Restaurante";
import AxiosRestaurantes from "./componentes/AxiosRestaurantes";
import EditarRestaurante from "./componentes/EditarRestaurante";

import React, { useState } from 'react';
import axios from "axios";

const baseURL = "http://localhost:8000/api/"; // URL base para las peticiones Axios


function App() {

  const [restaurantes, setRestaurantes] = useState([]);
  const [error, setError] = useState(null);

  const fetchRestaurantes = () => {
    axios.get(baseURL + "restaurantes")
      .then(response => {
        setRestaurantes(response.data);
        setError(null);
      })
      .catch(() => {
        setError("Error al cargar los restaurantes");
      });
  };

  React.useEffect(() => {
    fetchRestaurantes();
  }, []);


  const agregarRestaurante = (nuevoRestaurante) => {
    axios.post(baseURL + "restaurantes", nuevoRestaurante)
      .then(response => {
        setRestaurantes([...restaurantes, response.data]);
        setError(null);
      })
      .catch(() => {
        setError("Error al agregar el restaurante");
      });
  };

  const eliminarRestaurante = (id) => {
    axios.delete(baseURL + `restaurantes/${id}`)
      .then(() => {
        setRestaurantes(restaurantes.filter(restaurante => restaurante._id !== id));
        setError(null);
      })
      .catch(() => {
        setError("Error al eliminar el restaurante");
      });
  };

  const actualizarRestaurante = (id, actualizado) => {
    axios.put(baseURL + `restaurantes/${id}`, actualizado)
      .then(response => {
        setRestaurantes(restaurantes.map(restaurante => restaurante._id === id ? response.data : restaurante));
        setError(null);
      })
      .catch(() => {
        setError("Error al actualizar el restaurante");
      });
  };


  // Estado para manejar los contadores totales de likes y dislikes
  const [totales, setTotales] = useState({ likes: 0, dislikes: 0 });

  // Datos de restaurantes con puntuaciones incluidas
  /*const datosRestaurantes = [
    {
      nombre: "Restaurante El Buen Sabor",
      direccion: "Calle Principal 123",
      tipo: "Comida Internacional",
      imagen: "https://via.placeholder.com/300x200?text=El+Buen+Sabor",
      puntuacion: 4
    },
    {
      nombre: "Pizzería Don Luigi",
      direccion: "Avenida Italia 456",
      tipo: "Pizzería",
      imagen: "https://via.placeholder.com/300x200?text=Don+Luigi",
      puntuacion: 5
    },
    {
      nombre: "Sushi Zen",
      direccion: "Plaza Japón 789",
      tipo: "Japonés",
      imagen: "https://via.placeholder.com/300x200?text=Sushi+Zen",
      puntuacion: 3
    },
    {
      nombre: "Café Central",
      direccion: "Centro Histórico 321",
      tipo: "Cafetería",
      imagen: "https://via.placeholder.com/300x200?text=Cafe+Central",
      puntuacion: 4
    }
  ];*/

  // Handler para incrementar likes totales
  const handlerLikeTotales = () => {
    setTotales(prevTotales => ({
      ...prevTotales,
      likes: prevTotales.likes + 1
    }));
  };

  // Handler para incrementar dislikes totales
  const handlerDislikeTotales = () => {
    setTotales(prevTotales => ({
      ...prevTotales,
      dislikes: prevTotales.dislikes + 1
    }));
  };

  return (
    <div className="App">
      <h1>Restaurantes</h1>
      <header className="App-header">
        <h1>Guía de Restaurantes</h1>
        <div style={{marginBottom: '20px'}}>
          <h3>Totales Globales:</h3>
          <p>Likes Totales: {totales.likes}</p>
          <p>Dislikes Totales: {totales.dislikes}</p>
        </div>
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Inicio />} />
            <Route path="/restaurantes" element={<ListaRestaurantes restaurantes={restaurantes} eliminarRestaurante={eliminarRestaurante} handlerLikeTotales={handlerLikeTotales} handlerDislikeTotales={handlerDislikeTotales} />} />
            <Route path="/nuevo" element={<CrearRestaurante agregarRestaurante={agregarRestaurante} />} />
            <Route path="/editar/:id" element={<EditarRestaurante actualizarRestaurante={actualizarRestaurante} />} />
            <Route path="/axios" element={<AxiosRestaurantes />} />

            {/* Puedes agregar más rutas aquí si es necesario */}
            <Route path="*" element={<h2>Página no encontrada</h2>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;