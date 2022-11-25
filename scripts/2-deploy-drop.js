import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
    try {
        const editionDropAddress = await sdk.deployer.deployEditionDrop({
            name: "MapleDAO meso",
            description: "A DAO for maple fans.",
            image: readFileSync("scripts/assets/meso.png"),
            primary_sale_recipient: AddressZero,
        })

        const editionDrop = await sdk.getContract(editionDropAddress, "edition-drop");

        const metadata = await editionDrop.metadata.get();

        console.log("Successfully deployed editionDrop contract, address: ", editionDropAddress);
        console.log("editionDrop metadata: ", metadata);
    } catch (err) {
        console.error("Failed to deploy editionDrop contract", error);
    }
})();