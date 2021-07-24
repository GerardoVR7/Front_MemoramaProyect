import React, { Component } from 'react';
import Header from './Header';
import Tablero from './Tablero';
import '../Assets/App.css';
import construirBaraja from '../utils/construirBaraja';
import { io } from 'socket.io-client'


const getEstadoInicial = () => {
    const baraja = construirBaraja();

    return {
        baraja,
        parejaSeleccionada: [],
        estaComparando: false,
        numeroDeIntentos: 0
    };
}



class App extends Component {

    constructor(props) {
        super(props);
        this.state = getEstadoInicial();
    }
    componentDidMount(){
        const socket = io.connect('ws://localhost:3000')  //'ws://localhost:3000'
        socket.on('connection', (data) =>{
            console.log(data)
        })

        /*socket.on('deck' , (data) => {
            const baraja2 = data
            this.handleDeck(baraja2)
            console.log(baraja2)
        } )*/

    }

    handleDeck (deck) {
        this.setState({baraja: deck})
    }

    render() {
        return (
            <div className="App">
                <Header
                    numeroDeIntentos={this.state.numeroDeIntentos}
                    resetearPartida={() => this.resetearPartida()}
                />
                <Tablero
                    baraja={this.state.baraja}
                    parejaSeleccionada={this.state.parejaSeleccionada}
                    seleccionarCarta={(carta) => this.seleccionarCarta(carta)}
                />
            </div>
        );
    }

    seleccionarCarta(carta) {
        if (
            this.state.estaComparando ||
            this.state.parejaSeleccionada.indexOf(carta) > -1 ||
            carta.fueAdivinida
        ) {
            return;
        }

        const parejaSeleccionada = [...this.state.parejaSeleccionada, carta];
        this.setState({
            parejaSeleccionada
        });

        if (parejaSeleccionada.length === 2) {
            this.compararPareja(parejaSeleccionada);
        }
    }

    compararPareja(parejaSeleccionada) {
        this.setState({estaComparando: true});

        setTimeout(() => {
            const [primeraCarta, segundaCarta] = parejaSeleccionada;
            let baraja = this.state.baraja;

            if (primeraCarta.icono === segundaCarta.icono) {
                baraja = baraja.map((carta) => {
                    if (carta.icono !== primeraCarta.icono) {
                        return carta;
                    }

                    return {...carta, fueAdivinada: true};
                });
            }

            this.verificarSiHayGanador(baraja);
            this.setState({
                parejaSeleccionada: [],
                baraja,
                estaComparando: false,
                numeroDeIntentos: this.state.numeroDeIntentos + 1
            })
        }, 1000)
    }

    verificarSiHayGanador(baraja) {
        if (
            baraja.filter((carta) => !carta.fueAdivinada).length === 0
        ) {
            alert(`Ganaste en ${this.state.numeroDeIntentos} intentos!`);
        }
    }

    resetearPartida() {
        this.setState(
            getEstadoInicial()
        );
    }
}

export default App;
