import { ConnectWallet, useAddress, useContract, useNFTBalance, Web3Button } from "@thirdweb-dev/react";
import { useState, useEffect, useMemo } from "react";
import * as constants from "./constants.js";

const App = () => {
  const address = useAddress();
  console.log("Address: ", address);

  const { contract: editionDrop } = useContract(constants.EDITION_DROP_CONTRACT_ADDRESS, "edition-drop");
  const { contract: token } = useContract(constants.TOKEN_CONTRACT_ADDRESS, "token");
  const { data: nftBalance } = useNFTBalance(editionDrop, address, "0");

  const [memberTokenAmounts, setMemberTokenAmounts] = useState([]);
  const [memberAddresses, setMemberAddresses] = useState([]);

  const shortenAddress = (str) => {
    return str.substring(0, 6) + '...' + str.substring(str.length - 4);
  };

  const hasClaimedNFT = useMemo(() => {
    return nftBalance && nftBalance.gt(0)
  }, [nftBalance])

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllAddresses = async () => {
      try {
        const memberAddresses = await editionDrop?.history.getAllClaimerAddresses(0);
        setMemberAddresses(memberAddresses);
        console.log("Member addresses", memberAddresses);
      } catch (err) {
        console.error("Failed to get member list", err);
      }
    };

    getAllAddresses();
  }, [hasClaimedNFT, editionDrop?.history]);

  useEffect(() => {
    if (!hasClaimedNFT) {
      return;
    }

    const getAllBalances = async () => {
      try {
        const memberTokens = await token?.history.getAllHolderBalances();
        setMemberTokenAmounts(memberTokens);
        console.log("Member tokens", memberTokens);
      } catch (err) {
        console.error("Failed to get balances", err);
      }
    };

    getAllBalances();
  }, [hasClaimedNFT, token?.history]);

  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      const member = memberTokenAmounts?.find(({ holder }) => { holder === address });
      return {
        address,
        tokenAmount: member?.balance.displayValue || '0',
      };
    });
  }, [memberAddresses, memberTokenAmounts]);

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
        <div>
          <div>
            <h2>Member List</h2>
            <table className="card">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="landing">
      <h1>Mint your free 🍁 MapleDAO NFT</h1>
      <div className="btn-hero">
        <Web3Button
          contractAddress={constants.EDITION_DROP_CONTRACT_ADDRESS}
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
