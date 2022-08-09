import React, { useState, useEffect } from "react";
import Navigation from "../components/Navigation";
import { ethers } from "ethers";

import FakeBaycAbi from "../abiStorage/FakeBayc.json";

const FakeBayc = () => {
  const [connectedContract, setConnectedContract] = useState(null);
  const [nameToken, setNameToken] = useState("");
  const [totalSupply, setTotalSupply] = useState("");

  const getConnectedContract = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = await new ethers.Contract(
      "0x6b740C7a965d75A4801642Fabc650DA92CeA47ef",
      FakeBaycAbi.abi,
      signer
    );
    setConnectedContract(connectedContract);
  };

  const displayInfo = async () => {
    try {
      console.log(connectedContract);
      const name = await connectedContract.name();
      setNameToken(name);
      const totalSupply = await connectedContract.totalSupply();
      setTotalSupply(totalSupply.toString());
    } catch (err) {
      console.error(err);
    }
  };
  const claimaToken = async () => {
    const claimT = await connectedContract.claimAToken();
    await claimT.wait();
  };

  useEffect(() => {
    getConnectedContract();
  }, []);

  return (
    <div>
      <Navigation />
      FakeBayc
      <br />
      <button onClick={displayInfo}>Display infos</button>
      <br />
      name of the token : {nameToken}
      <br />
      total totalSupply : {totalSupply}
      <br />
      <button onClick={claimaToken}>claim a token</button>
    </div>
  );
};

export default FakeBayc;
