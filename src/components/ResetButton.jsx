import React from "react";

const ResetButton = ({ handleResetGame }) => {
  return (
    <div className="reset-button" onClick={handleResetGame}>
      Reset Game
    </div>
  );
};

export default ResetButton;
