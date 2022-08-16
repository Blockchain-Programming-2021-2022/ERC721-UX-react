import React, { useState, useEffect, useContext } from "react";
import Navigation from "../components/Navigation";
import { ethers } from "ethers";

import FakeBaycAbi from "../abiStorage/FakeBayc.json";
import { Link, Outlet } from "react-router-dom";
import { BlockchainContext } from "../BlockchainContext";
import FakeBaycDisplay from "../components/FakeBaycDisplay";

const FakeBayc = () => {
  const [nameToken, setNameToken] = useState("");
  const [nftId, setNftId] = useState(0);

  const {
    connectedContract,
    setConnectedContract,
    totalSupply,
    setTotalSupply,
  } = useContext(BlockchainContext);

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
    displayInfo(connectedContract);
  };

  const displayInfo = async (connectedContract) => {
    try {
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
      name of the token : {nameToken}
      <br />
      total totalSupply : {totalSupply}
      <br />
      <button onClick={claimaToken}>claim a token</button>
      <br />
      <p>Make a changement</p>
      <input
        type="text"
        value={nftId}
        onChange={(newval) => setNftId(newval.target.value)}
      />
      {nftId && "hello"}
      <Link to={nftId}>text</Link>
      <Outlet />
    </div>
  );
};

export default FakeBayc;
