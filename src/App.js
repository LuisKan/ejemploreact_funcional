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




function App() {

  const [restaurantes, setRestaurantes] = useState([]);
  const [error, setError] = useState(null);

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

  React.useEffect(() => {
    fetchRestaurantes();
  }, []);


  const agregarRestaurante = (nuevoRestaurante) => {
    axios.post("http://localhost:3001/restaurante", nuevoRestaurante)
      .then(response => {
        setRestaurantes([...restaurantes, response.data]);
        setError(null);
      })
      .catch(() => {
        setError("Error al agregar el restaurante");
      });
  };

  const eliminarRestaurante = (id) => {
    axios.delete(`http://localhost:3001/restaurante/${id}`)
      .then(() => {
        setRestaurantes(restaurantes.filter(restaurante => restaurante.id !== id));
        setError(null);
      })
      .catch(() => {
        setError("Error al eliminar el restaurante");
      });
  };

  const actualizarRestaurante = (id, actualizado) => {
    axios.put(`http://localhost:3001/restaurante/${id}`, actualizado)
      .then(response => {
        setRestaurantes(restaurantes.map(restaurante => restaurante.id === id ? response.data : restaurante));
        setError(null);
      })
      .catch(() => {
        setError("Error al actualizar el restaurante");
      });
  };


  return (
    <div className="App">
      <h1>Restaurantes</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Inicio />} />
          <Route path="/restaurantes" element={<ListaRestaurantes restaurantes={restaurantes} eliminarRestaurante={eliminarRestaurante} />} />
          <Route path="/nuevo" element={<CrearRestaurante agregarRestaurante={agregarRestaurante} />} />
          <Route path="/editar/:id" element={<EditarRestaurante actualizarRestaurante={actualizarRestaurante} />} />
          <Route path="/axios" element={<AxiosRestaurantes />} />

          {/* Puedes agregar más rutas aquí si es necesario */}
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </BrowserRouter>





    </div>
  );
}

export default App;