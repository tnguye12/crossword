import React from 'react';
import Board from "./Board";

export const BOARD_SIZE = 7;

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(BOARD_SIZE ** 2).fill(""),
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (squares[i]) return; // don't allow writing over
        squares[i] = this.state.xIsNext ? "X" : "O";
        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    undo() {
        const stepNumber = this.state.stepNumber;
        const history = this.state.history.slice();
        const xIsNext = this.state.xIsNext;

        if (stepNumber > 0) {
            this.setState({
                stepNumber: stepNumber - 1,
                history: history.slice(0, history.length-1),
                xIsNext: !xIsNext
            })
        }
    }

    reset() {
        const history = this.state.history.slice();
        this.setState({
            stepNumber: 0,
            history: [history[0]],
            xIsNext: true
        })
    }

    render() {
        const history = this.state.history;
        const current = history[history.length - 1];
        const status = 'Next player: ' + (this.state.xIsNext ? "X" : "O");

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <button onClick={() => this.undo()}>
                        undo
                    </button>
                    <button onClick={() => this.reset()}>
                        reset
                    </button>
                </div>
            </div>
        );
    }
}

export default Game