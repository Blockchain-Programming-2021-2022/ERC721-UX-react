import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BlockchainContext } from "../BlockchainContext";
import axios from "axios";
import { ethers } from "ethers";
const FakeNefturiansDisplay = () => {
  const params = useParams();
  const address = params.userAddress;
  const [balance, setBalance] = useState(0);
  const { connectedContract } = useContext(BlockchainContext);

  const getDisplayNft = async (address) => {
    const balanceOf = await connectedContract.balanceOf(address);
    setBalance(balanceOf.toString());
  };

  useEffect(() => {
    if (connectedContract != null) {
      getDisplayNft(address);
    }
  }, [address, connectedContract]);

  return <div>{balance}</div>;
};

export default FakeNefturiansDisplay;
