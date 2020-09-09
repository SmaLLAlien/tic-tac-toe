import React, {useState} from "react";
import Board from "../Board/Board";
import {calculateWinner} from "../helpers/helpers";

const Game = props => {
    const [history, setHistory] = useState([
        {squares: Array(9).fill(null)}
        ]);
    const [stepNumber, setStep] = useState(0);
    const current = history[stepNumber];
    const [xIsNext, changeNext] = useState(true);
    const winner = calculateWinner(current.squares);

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }


    const moves = history.map((step, move) => {
        const desc = move ?
            'Перейти к ходу #' + move :
            'К началу игры';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    const jumpTo = (step) => {
        setStep(step);
        let c = (step % 2) === 0
        changeNext(c);
    }

    const handleClick = (i) => {
        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const copy = [...current.squares];
        if (calculateWinner(copy) || copy[i]) {
            return;
        }
        copy[i] = xIsNext ? 'X' : 'O';

        setHistory(newHistory.concat({squares: copy}));
        changeNext((prevState => !prevState));
        setStep(newHistory.length);
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i) => handleClick(i)} />
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    )
}

export default Game;
