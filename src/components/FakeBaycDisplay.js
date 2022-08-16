import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ethers } from "ethers";
import FakeBaycAbi from "../abiStorage/FakeBayc.json";
import { BlockchainContext } from "../BlockchainContext";
import axios from "axios";

const FakeBaycDisplay = () => {
  const [tokenDetail, setTokenDetail] = useState(null);
  const [tokenUnExist, setTokenUnExist] = useState(null);
  const params = useParams();
  const nftId = params.nftId;

  const {
    connectedContract,
    setConnectedContract,
    totalSupply,
    setTotalSupply,
  } = useContext(BlockchainContext);

  const getDetail = async () => {
    const tokenUri = await connectedContract.tokenURI(nftId);
    const detail = await axios.get(tokenUri);
    setTokenDetail(detail.data);
  };

  useEffect(() => {
    if (nftId < totalSupply) {
      setTokenUnExist(false);
      getDetail(connectedContract);
    } else {
      setTokenUnExist(true);
    }
  }, [nftId, connectedContract]);

  return (
    <div>
      {tokenUnExist
        ? "error that nft doesn't exist"
        : tokenDetail && (
            <div>
              <img
                src={`https://ipfs.io/ipfs/${tokenDetail.image.split("//")[1]}`}
                alt=""
              />
              {tokenDetail.attributes.map((elem, i) => {
                return (
                  <p key={i}>
                    <span> attribute number {i}</span>
                    &nbsp;{elem.trait_type} {elem.value}
                  </p>
                );
              })}
            </div>
          )}
    </div>
  );
};

export default FakeBaycDisplay;
