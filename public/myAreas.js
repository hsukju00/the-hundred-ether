import { abiObj, contractAddress } from "./config.js";

web3 = new Web3(web3.currentProvider);
const contract = await new web3.eth.Contract(
    abiObj,
    contractAddress
);

const myAreaDiv = document.getElementById("my-area-div");
contract.methods.getPurchasedAreasByOwner(web3.utils.toChecksumAddress(ethereum.selectedAddress)).call((err, areas) => {
    if (err) {
        console.log(err);
        return;
    }

    myAreaDiv.innerText = ""

    let writable_areas = [...areas]
    writable_areas.sort((a, b) => {
        return a.index - b.index
    });
    writable_areas.forEach((area) => {
        const areaDiv = document.createElement("div");
        const areaIndexH1 = document.createElement("h1");
        areaIndexH1.innerText = `Area ${area.index}`;
        areaDiv.appendChild(areaIndexH1);
        const areaUrlH3 = document.createElement("h3");
        areaUrlH3.innerText = area.url;
        areaDiv.appendChild(areaUrlH3);
        const areaCommentP = document.createElement("p");
        areaCommentP.innerText = area.comment;
        areaDiv.appendChild(areaCommentP);

        areaDiv.classList.add("area-div");
        myAreaDiv.appendChild(areaDiv);
    })
});
