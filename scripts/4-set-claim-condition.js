import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";
import * as constants from "../src/constants.js";

(async () => {
    try {
        const editionDrop = await sdk.getContract(constants.EDITION_DROP_CONTRACT_ADDRESS, "edition-drop");
        const claimConditions = [{
            startTime: new Date(),
            maxClaimable: 50_000,
            price: 0,
            maxClaimablePerWallet: 1,
            waitInSeconds: MaxUint256,
        }]

        await editionDrop.claimConditions.set("0", claimConditions);
        console.log("Successfully set claim condition!");
    } catch (error) {
        console.log("Failed to set claim condition", error);
    }
})()