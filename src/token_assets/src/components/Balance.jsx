import React, { useState } from "react";
import { Principal } from "@dfinity/principal";
import { token } from "../../../declarations/token";

function Balance() {
  const [inputValue, setValue] = useState("");
  const [balance, setBalance] = useState("");
  const [isHidden, setHidden] = useState(true);

  async function handleClick() {
    // console.log("Balance Button Clicked");
    const principalId = Principal.fromText(inputValue);
    const ownerBalance = await token.balanceOf(principalId);
    const currencySymbol = await token.getSymbol();
    setHidden(false);
    setBalance(ownerBalance.toLocaleString() + " " + currencySymbol);
  }

  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputValue}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </p>
      <p className="trade-buttons">
        <button id="btn-request-balance" onClick={handleClick}>
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {balance}</p>
    </div>
  );
}

export default Balance;
