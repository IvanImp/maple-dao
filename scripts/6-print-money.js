import sdk from "./1-initialize-sdk.js";
import * as constants from "../src/constants.js";

(async () => {
    try {
        const token = await sdk.getContract(constants.TOKEN_CONTRACT_ADDRESS, "token");
        const amount = 1_000_000;

        await token.mint(amount);
        const totalSupply = await token.totalSupply();

        console.log("There is", totalSupply.displayValue, "$MLEAF in circulation");
    } catch (err) {
        console.error("Failed to mint token ", err);
    }
})();