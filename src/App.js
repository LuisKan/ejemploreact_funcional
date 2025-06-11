// Importaciones necesarias
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ListaRestaurantes from "./componentes/ListaRestaurantes";
import Inicio from "./componentes/Inicio";
import CrearRestaurante from "./componentes/CrearRestaurante";
import Restaurante from "./componentes/Restaurante";
import React, { useState } from 'react';

function App() {

  const [restaurantes, setRestaurantes] = useState([
          {
              // Objeto restaurante con propiedades nombre, direccion, tipo e imagen
              nombre: "Cafetería La Unión",
              direccion: "10 de Agosto y Orellana",
              tipo: "Cafeteria",
              imagen: "https://imagenes.primicias.ec/files/main_image_832_468/uploads/2024/05/26/66539bf3ba20b.jpeg"
          },
          {
              nombre: "El Buen Sabor",
              direccion: "Av. Amazonas y Naciones Unidas",
              tipo: "Internacional",
              imagen: "https://imagenes.primicias.ec/files/main_image_832_468/uploads/2024/05/26/66539bf3ba20b.jpeg"
          },
          {
              nombre: "Paquita",
              direccion: "Orellana y Colon",
              tipo: "Grill",
              imagen: "https://imagenes.primicias.ec/files/main_image_832_468/uploads/2024/05/26/66539bf3ba20b.jpeg"
          },
          {
              nombre: "Las Vegas",
              direccion: "Av.Shyris",
              tipo: "Tradicional",
              imagen: "https://imagenes.primicias.ec/files/main_image_832_468/uploads/2024/05/26/66539bf3ba20b.jpeg"
          }
      ]);


  const agregarRestaurante = (nuevoRestaurante) => {
    setRestaurantes([...restaurantes, nuevoRestaurante]);
  };

  const eliminarRestaurante = (index) => {
    setRestaurantes(restaurantes.filter((_, i) => i !== index));
  };


  return (
    <div className="App">
      <h1>Restaurantes</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<Inicio />} />
          <Route path="/restaurantes" element={<ListaRestaurantes restaurantes={restaurantes} eliminarRestaurante={eliminarRestaurante} />} />
          <Route path="/nuevo" element={<CrearRestaurante agregarRestaurante={agregarRestaurante} />} />
          
          {/* Puedes agregar más rutas aquí si es necesario */}
          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </BrowserRouter>





    </div>
  );
}

export default App;