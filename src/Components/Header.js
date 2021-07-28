import React, { Component } from 'react';
import '../Assets/Header.css';

export default class Header extends Component {
    render() {
        return (
            <header>
                <div className="titulo">Memorama - El reto de los 35 intentos</div>
                <div>
                    <button className="boton-reiniciar" onClick={this.props.resetearPartida}>
                        Reiniciar
                    </button>
                </div>
                <div className="titulo">
                    Intentos: {this.props.numeroDeIntentos}
                </div>
            </header>
        );
    }
};

