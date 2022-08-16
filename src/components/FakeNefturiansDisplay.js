import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BlockchainContext } from "../BlockchainContext";
import axios from "axios";
import { ethers } from "ethers";
const FakeNefturiansDisplay = () => {
  const params = useParams();
  const address = params.userAddress;
  const [balance, setBalance] = useState(0);
  const [nftsInfo, setNftsInfo] = useState(null);
  const { connectedContract } = useContext(BlockchainContext);

  const getDisplayNft = async (address) => {
    const balanceOf = await connectedContract.balanceOf(address);
    setBalance(balanceOf.toString());
    getNftId(balanceOf);
  };
  const getNftId = async (balance) => {
    let allTokenInfo = new Map();
    for (let pas = 0; pas < parseInt(balance); pas++) {
      const idNft = await connectedContract.tokenOfOwnerByIndex(address, pas);
      const tokenUriUrl = await connectedContract.tokenURI(idNft);
      const tokenUri = await axios.get(tokenUriUrl);
      allTokenInfo.set(idNft.toString(), tokenUri);
    }
    setNftsInfo(allTokenInfo);
  };

  useEffect(() => {
    if (connectedContract != null) {
      getDisplayNft(address);
    }
  }, [connectedContract]);

  return (
    <div>
      {balance}
      <br />
      {nftsInfo &&
        Array.from(nftsInfo.keys()).map((element, i) => {
          return (
            <p key={i}>
              {" "}
              <img
                src={`https://api.nefturians.io/nefturians/images/${element}`}
                alt=""
              />{" "}
              name : {nftsInfo.get(element).data.name}
            </p>
          );
        })}
    </div>
  );
};

export default FakeNefturiansDisplay;
