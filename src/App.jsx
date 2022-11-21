import { ConnectWallet, useAddress } from "@thirdweb-dev/react";

const App = () => {
  const address = useAddress();
  console.log("Address: ", address);

  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to MapleDAO</h1>
        <div className="btn-hero">
          <ConnectWallet />
        </div>
      </div>
    );
  }

  return (
    <div className="landing">
      <h1>Wallet connected!</h1>
    </div>
  )

};

export default App;
