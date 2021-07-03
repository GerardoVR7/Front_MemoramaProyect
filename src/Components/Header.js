import React from 'react';
import '../Assets/Header.css';

class Header extends React.Component {
    render() {
        return(
            <React.Fragment>
                <header>
                    <div className="titulo"> React Memorama</div>
                    <div>
                        <button className="boton-reiniciar">
                            Reiniciar
                        </button>
                    </div>
                    <div className="titulo">
                        Intentos:
                    </div>
                </header>
            </React.Fragment>
        )
    }
}

export default Header;