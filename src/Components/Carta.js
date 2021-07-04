import React, { Component } from "react";
import "../Assets/Carta.css";
import FlipCart from 'react-flipcard-2'

export  default class Carta extends Component{
    render() {
        return(
            <div className="carta">
                <FlipCart>
                    <div className="portada"></div>
                    <div className="contenido">
                        <i className={`fa ${this.props.icono} fa-5x`}></i>
                    </div>
                </FlipCart>
            </div>
        )
    }
}