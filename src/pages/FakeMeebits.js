import React, { useState, useEffect, useContext } from "react";
import { BlockchainContext } from "../BlockchainContext";
import FakeMeebitsAbi from "../abiStorage/FakeMeebits.json";
import Navigation from "../components/Navigation";
import { ethers } from "ethers";

const FakeMeebits = () => {
  const { connectedContract, setConnectedContract } =
    useContext(BlockchainContext);

  const getConnectedContract = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = await new ethers.Contract(
      "0x66e0f56e86906fd7ee186d29a1a25dc12019c7f3",
      FakeMeebitsAbi.abi,
      signer
    );
    setConnectedContract(connectedContract);
  };

  useEffect(() => {
    getConnectedContract();
  }, []);

  return (
    <div>
      <Navigation />

      <br />
      <input type="text" />
      <button>Mint</button>
    </div>
  );
};

export default FakeMeebits;
