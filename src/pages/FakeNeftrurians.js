import React, { useState, useEffect, useContext } from "react";
import Navigation from "../components/Navigation";
import { ethers } from "ethers";
import { BlockchainContext } from "../BlockchainContext";
import FakeNefturianAbi from "../abiStorage/FakeNefturians.json";

import { Link, Outlet } from "react-router-dom";

const FakeNeftrurians = () => {
  const { connectedContract, setConnectedContract } =
    useContext(BlockchainContext);
  const [priceToken, setPriceToken] = useState(null);
  const [searchedAddress, setSearchedAddress] = useState("");

  const getConnectedContract = async () => {
    const { ethereum } = window;
    if (!ethereum) return;

    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const connectedContract = await new ethers.Contract(
      "0x14e68d0ba29c07478bd68f4a479a0211bd48ca4e",
      FakeNefturianAbi.abi,
      signer
    );
    setConnectedContract(connectedContract);
    getPriceToken(connectedContract);
  };
  const getPriceToken = async (connectedContract) => {
    const priceToken = await connectedContract.tokenPrice();
    setPriceToken(ethers.utils.formatEther(priceToken.toString()));
  };

  const buyToken = async () => {
    const val = (
      parseFloat(priceToken) + parseFloat(Math.pow(10, -17))
    ).toString();
    console.log(val);
    const buyTokenTx = await connectedContract.buyAToken({
      value: ethers.utils.parseEther(val),
    });
    buyTokenTx.wait();
  };

  useEffect(() => {
    getConnectedContract();
  }, []);
  return (
    <div>
      <Navigation></Navigation>
      The price of a token is {priceToken} eth.
      <br />
      <button onClick={buyToken}>Buy a token</button>
      <input
        type="text"
        value={searchedAddress}
        onChange={(newval) => {
          setSearchedAddress(newval.target.value);
        }}
      ></input>
      <Link to={searchedAddress}>text</Link>
      <Outlet />
    </div>
  );
};

export default FakeNeftrurians;
