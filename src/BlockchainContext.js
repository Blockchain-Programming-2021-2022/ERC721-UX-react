import { useState, createContext } from "react";

export const BlockchainContext = createContext();

export const BlockchainProvider = ({ children }) => {
  const [connectedContract, setConnectedContract] = useState(null);
  const [totalSupply, setTotalSupply] = useState("");
  return (
    <BlockchainContext.Provider
      value={{
        connectedContract,
        setConnectedContract,
        totalSupply,
        setTotalSupply,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};
