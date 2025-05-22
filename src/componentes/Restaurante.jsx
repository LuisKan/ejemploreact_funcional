/*import React from "react";
import "./Restaurante"; //importamos el css

class Restaurante extends React.Component {

    constructor(props){ //constructor se ejeecuta una sola vez, al crear el componente
        //llama al constructor de la clase padre, en este caso React.Component
        super(props);//llamamos al constructor de la clase padre
        this.state = {
            likes: 0 //inicializamos el estado del componente, es un objeto
        }
        //this.handlerLike = this.handlerLike.bind(this); //bind es una funcion que se usa para enlazar el contexto de la funcion con el contexto de la clase, en este caso el contexto de la clase Restaurante
        //el this de esta funcion es el this de la clase Restaurante, no el this de la funcion handlerLike
    }

    /*handlerLike() {
        this.setState({ likes: this.state.likes + 1 }) //actualizamos el estado del componente, setState es una funcion que actualiza el estado del componente
     }*/

   /* handlerLike = () => { //es una funcion de flecha, el this de la funcion es el this de la clase Restaurante
        this.setState({ likes: this.state.likes + 1 }) //actualizamos el estado del componente, setState es una funcion que actualiza el estado del componente
    }

    render() { // el render es una funcion que se ejecuta cada vez que cambie alguno de estos elementos, las props o el estado del componente

        const { nombre, direccion, tipo, imagen } = this.props ; //Desestructuramos las propiedades del componente Restaurante, es un objeto

        return (//todo lo que esta dentro de return es jsx y todo lo que esta afuera es js/
            <div>
                <h1>{nombre}</h1>
                <h3>{direccion}</h3>
                <h4>{tipo}</h4>
                <img src={imagen} alt={nombre}/>
                <h4> Likes: {this.state.likes}</h4>
                <button onClick={this.handlerLike}>LIKE</button> 
                
            </div>
        );
    }


}

export default Restaurante;  //disponible para otros archivos
*/

import React, {useState} from "react";
import "./Restaurante.css"; // importamos el css

function Restaurante(props){

    const { nombre, direccion, tipo, imagen } = props; //Desestructuramos las propiedades del componente Restaurante, es un objeto
    const [likes, setLikes] = useState(0); //inicializamos el estado del componente, es un objeto
    const handlerLike = () => {setLikes(likes + 1);} //actualizamos el estado del componente, setState es una funcion que actualiza el estado del componente;

    return (//todo lo que esta dentro de return es jsx y todo lo que esta afuera es js/
        <div>
            <h1>{nombre}</h1>
            <h3>{direccion}</h3>
            <h4>{tipo}</h4>
            <img src={imagen} alt={nombre}/>
            <h4> Likes: {likes}</h4>
            <button onClick={handlerLike}>LIKE</button>
        </div>
    );
}

export default Restaurante; //disponible para otros archivos

