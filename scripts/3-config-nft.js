import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";
import * as constants from "../src/constants.js";

(async () => {
    try {
        const editionDrop = await sdk.getContract(constants.EDITION_DROP_CONTRACT_ADDRESS, "edition-drop");
        await editionDrop.createBatch([
            {
                name: "Common Meso",
                description: "This NFT will give you access to MapleDAO!",
                image: readFileSync("scripts/assets/meso.png"),
            },
        ])
        console.log("Successfully created a new NFT in the drop!");
    } catch (error) {
        console.error("Failed to create the new NFT", error);
    }
})()