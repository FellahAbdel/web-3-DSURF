import React, { useState } from "react";
import { token } from "../../../declarations/token";
import { Principal } from "@dfinity/principal";

function Transfer() {
  const [buttonAnswer, setTextAnswer] = useState("Transfer");
  const [amount, setAmount] = useState("");
  const [recipientId, setId] = useState("");
  const [isDisabled, setDisable] = useState(false);
  const [isHidden, setHidden] = useState(false);
  const [feedback, setFeedBack] = useState("");

  async function handleClick() {
    setDisable(true);
    console.log(typeof recipientId);
    const recipient = Principal.fromText(recipientId);
    const amountToTransfer = Number(amount);
    const result = await token.transfer(recipient, amountToTransfer);
    setFeedBack(result);
    setDisable(false);
  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                onChange={(e) => {
                  setId(e.target.value);
                }}
                type="text"
                id="transfer-to-id"
                value={recipientId}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                id="amount"
                value={amount}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button id="btn-transfer" onClick={handleClick} disabled={isDisabled}>
            {buttonAnswer}
          </button>
        </p>
        <p hidden={isHidden}>{feedback}</p>
      </div>
    </div>
  );
}

export default Transfer;
