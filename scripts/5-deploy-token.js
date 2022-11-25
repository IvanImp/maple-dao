import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";

(async () => {
    try {
        const tokenAddress = await sdk.deployer.deployToken({
            name: "MapleDAO Governance Token",
            symbol: "MLEAF",
            primary_sale_recipient: AddressZero,
        });
        console.log("Successfully deployed token contract, address:", tokenAddress);
    } catch (err) {
        console.error("Failed to deploy token contract", err);
    }
})();