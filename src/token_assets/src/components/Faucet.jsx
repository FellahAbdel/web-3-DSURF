import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { useState } from "react";

function Faucet() {
  const [isDisabled, setDisable] = useState(false);
  const [answerResult, setAnswer] = useState("Gimme Gimme");
  async function handleClick(event) {
    setDisable(true);
    const answer = await token.payOut();
    setAnswer(answer.toLocaleString());
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>
        Get your free DDiallo tokens here! Claim 10,000 DANG coins to your
        account.
      </label>
      <p className="trade-buttons">
        <button id="btn-payout" onClick={handleClick} disabled={isDisabled}>
          {answerResult}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
