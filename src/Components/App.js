import React, {Component} from 'react';
import Header from './Header';
import Tablero from './Tablero';
import '../Assets/App.css';
import {io} from 'socket.io-client'
import Swal from 'sweetalert2'

const getEstadoInicial = () => {

    return {
        baraja: [],
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
        const socket = io.connect('ws://localhost:3000')  //direccion del servidor y coneccion por medio del socket
        socket.on('connection', (data) =>{
            console.log(data)
        })


            socket.on('deck' , (data) => {
                let baraja2 = data
                this.handleDeck(baraja2)
                console.log(baraja2)
            } )

    }

    reset(){
        const socket = io.connect('ws://localhost:3000')  //direccion del servidor y coneccion por medio del socket
        let inicio = true
        socket.emit('iniciar', inicio)

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
                    console.log(carta)

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

        }, 500)
    }

    verificarSiHayGanador(baraja) {
        if (
            baraja.filter((carta) => !carta.fueAdivinada).length === 0
        ) {
            Swal.fire({
                title: `Has ganado con ${this.state.numeroDeIntentos} intentos !!`,
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Volver a jugar' ,
                confirmButtonText2:this.resetearPartida(),
                timer:5000
            })
        }
        if (this.state.numeroDeIntentos > 35){
            Swal.fire({
                title: `Has perdido has superado los 35 intentos :(`,
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Volver a intentar' ,
                confirmButtonText2:this.resetearPartida(),
                timer:5000
            })
        }
    }

    resetearPartida() {
        this.render()
        this.setState(
            getEstadoInicial(),
            this.componentDidMount()
        );
    }
}

export default App;
