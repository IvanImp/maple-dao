import { ConnectWallet, useAddress, useContract, useNFTBalance, Web3Button } from "@thirdweb-dev/react";
import { useState, useEffect, useMemo } from "react";
import * as constants from "./constants.js";

const App = () => {
  const address = useAddress();
  console.log("Address: ", address);

  const editionDropAddress = constants.EDITION_DROP_CONTRACT_ADDRESS;
  const { contract: editionDrop } = useContract(editionDropAddress, "edition-drop");
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to 🍁 MapleDAO</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
  }

  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍁 Maple DAO Member Page</h1>
        <p>Mushroom worthy!</p>
      </div>
    )
  }

  return (
    <div className="landing">
      <h1>Mint your free 🍁 MapleDAO NFT</h1>
      <div className="btn-hero">
        <Web3Button
          contractAddress={editionDropAddress}
          action={contract => {
            contract.erc1155.claim(0, 1);
          }}
          onSuccess={() => {
            console.log(`Successfully Minted! Check it out on OpenSea: https:/testnets.opensea.io/assets/${editionDrop.getAddress()}/0`);
          }}
          onError={error => {
            console.error("Failed to mint NFT", error);
          }}
        >
          Mint your NFT (FREE!)
        </Web3Button>
      </div>
    </div>
  )

};

export default App;
