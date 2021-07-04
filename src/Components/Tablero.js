import React, { Component} from "react";
import "../Assets/Tablero.css";
import Carta from "./Carta";

export default class Tablero extends Component {
    render() {
        return (
            <div className="tablero">
                {
                    this.props.baraja.map((carta) => <Carta icono = { carta.icono}/>)
                }
            </div>
        )
    }
}