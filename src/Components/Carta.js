import React, {Component} from 'react';
import '../Assets/Carta.css'
import ReactCardFlip from 'react-card-flip';

export default class Carta extends Component {
    render() {
        return (
            <div className="carta" onClick={this.props.seleccionarCarta}>
                <ReactCardFlip
                    isFlipped = {this.props.estaSiendoComparada || this.props.fueAdivinada}
                >
                    <div className="portada"/>
                    <div className="contenido">
                        <i className={`fa ${this.props.icono} fa-5x`}/>
                    </div>
                </ReactCardFlip>
            </div>
        )
    }
};