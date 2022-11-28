import sdk from "./1-initialize-sdk.js";
import * as constants from "../src/constants.js";

(async () => {
    try {
        const editionDrop = await sdk.getContract(constants.EDITION_DROP_CONTRACT_ADDRESS, "edition-drop");
        const token = await sdk.getContract(constants.TOKEN_CONTRACT_ADDRESS, "token");

        // grab all address of people who owned MLEAF, which has a tokenId of 0
        const walletAddress = await editionDrop.history.getAllClaimerAddresses(0);

        if (walletAddress.length === 0) {
            console.log("Theres no NFTs have been claimed yet!")
            process.exit(0);
        }

        const airdropTargets = walletAddress.map((address) => {
            const randomAmount = Math.floor(Math.random() * 1000);
            console.log("Going to airdrop", randomAmount, "tokens to", address);

            const airdropTarget = {
                toAddress: address,
                amount: randomAmount
            };

            return airdropTarget;
        });

        console.log(airdropTargets);
        await token.transferBatch(airdropTargets);
        console.log("Successfully airdropped tokens to all the holders of the NFTs!");
    } catch (err) {
        console.error("Failed to airdrop tokens", err);
    }
})();