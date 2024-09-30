import "./App.css";
import { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess } from "chess.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(game.fen());
  const [message, setMessage] = useState("White's Turn");

  const handleOnDrop = ({ sourceSquare, targetSquare }) => {
    try {
      // attempts to make a move
      game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });

      // if the move is legal, updates the
      // board position and player turn
      setFen(game.fen());
      setMessage(game.turn() === "w" ? "White's Turn" : "Black's Turn");

      // checks if the move is a checkmate or a draw
      if (game.isGameOver()) {
        if (game.isCheckmate()) {
          toast.info(`${game.turn() === "w" ? "Black" : "White"} Wins!`);
          return;
        }

        if (game.isDraw()) {
          toast.info("Draw!");
          return;
        }
      }

      // checks if the move is a check
      if (game.isCheck()) {
        setMessage(`${game.turn() === "w" ? "White" : "Black"} is in check!`);
        return;
      }
    } catch (error) {
      setFen(game.fen());
      toast.warning("Illegal Move. Try Again");
    }
  };

  // handles game reset
  const handleResetGame = () => {
    game.reset();
    setFen(game.fen());
    setMessage("White's Turn");
  };

  return (
    <div>
      <Chessboard
        width={800}
        darkSquareStyle={{ backgroundColor: "#779556" }}
        lightSquareStyle={{ backgroundColor: "#ebecd0" }}
        position={fen}
        onDrop={handleOnDrop}
      />
      <div className="turn-reset-container">
        <p className="status">{message}</p>
        <div className="reset-button" onClick={handleResetGame}>
          Reset Game
        </div>
      </div>
      <ToastContainer position="bottom-left" />
    </div>
  );
}

export default App;
