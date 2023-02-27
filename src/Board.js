
import React from 'react';
import Square from './Square';

class Board extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    handleClick(i)
    {
        const squares = this.state.squares.slice();
        if(squares[i] == null)
        {
          squares[i] = this.state.xIsNext ? 'X' : 'O';
          this.setState(
            {
                squares: squares,
                xIsNext: !this.state.xIsNext,
            }
        );
        }
        
    }

    renderSquare(i) {
      return <Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }

    calculateWinner()
    {
        const nullValues = this.state.squares.filter((value) => value === null);
        
        const winningOptions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for(let i=0; i<winningOptions.length; i++)
        {
            const [a, b, c] = winningOptions[i];
            if(this.state.squares[a] === this.state.squares[b] && this.state.squares[a] === this.state.squares[c])
            {
                return this.state.squares[a];
            }
        }
        return (nullValues.length == 0 ? "DRAW" : null);
    }
  
    render() {
        const winner = this.calculateWinner();
        let status;
        if (winner) {
          if(winner == 'DRAW')
          {
            status = 'Game DRAW ';  
          }
          else{
            status = 'Winner: ' + winner;
          }
          
        } else {
          status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
  
      return (
        <div>
          <div className="status">{status}</div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }



  export default Board;