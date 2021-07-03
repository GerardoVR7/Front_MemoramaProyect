import React from "react";
import '../Assets/Board.css'
export default class Board extends React.Component{
    render() {

        const  cartas = [1,2,3,4,5];

        return(
            <div className="board">
                {
                    cartas.map((carta) => <spam> {carta} </spam>)
                }
            </div>
        )
    }
}