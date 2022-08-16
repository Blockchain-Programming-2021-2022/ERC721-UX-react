import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import Navigation from "../components/Navigation";

const ChainInfo = () => {
  const [chainId, setChainId] = useState(0);
  const [latestBlock, setLatestBlock] = useState(0);
  const [account, setAccount] = useState("");
  const [errorpage, setErrorPage] = useState(false);

  const ethersbegin = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const block = await provider.getBlockNumber();
    setLatestBlock(block);
  };
  const getChainId = async () => {
    const chainNumber = await window.ethereum.chainId;
    setChainId(chainNumber);
  };

  const handleClickConnect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setAccount(account);
    ethersbegin();
  };

  useEffect(() => {
    console.log("in");
    getChainId();
    if (window.ethereum.isConnected()) {
      handleClickConnect();
    }
  }, []);

  window.ethereum.on("chainChanged", async (chainId) => {
    setErrorPage(true);
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x4" }], // chainId must be in hexadecimal numbers
    });
    getChainId();
    handleClickConnect();
    setErrorPage(false);
  });

  return (
    <div>
      <Navigation />
      chainInfo
      <br />
      {errorpage ? (
        <p>Error page switch on Rinkeby network please</p>
      ) : (
        <div>
          chainId = {chainId}
          <br />
          <button onClick={handleClickConnect}>
            {account ? account : <p>connect</p>}
          </button>
          <br />
          latest Block = {latestBlock}
        </div>
      )}
    </div>
  );
};

export default ChainInfo;
