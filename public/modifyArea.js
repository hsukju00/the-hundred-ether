import { abiObj, contractAddress } from "./config.js";

web3 = new Web3(web3.currentProvider);
const contract = await new web3.eth.Contract(
    abiObj,
    contractAddress
);

const indexSelect = document.getElementById("index");
contract.methods.getOwnermapByOwner(web3.utils.toChecksumAddress(ethereum.selectedAddress)).call((err, indexs) => {
    if (err) {
        console.error(err);
        return;
    }
    let writable_indexs = [...indexs]
    writable_indexs.sort();
    writable_indexs.forEach((index) => {
        const indexOption = document.createElement("option");
        indexOption.value = index;
        indexOption.innerText = `area ${index}`;
        indexSelect.appendChild(indexOption);
    })
})

const form = document.getElementById("form")
form.onsubmit = async (event) => {
    event.preventDefault();

    const url = document.getElementById("url").value;
    const index = document.getElementById("index").value;
    const comment = document.getElementById("comment").value;

    web3 = new Web3(web3.currentProvider);
    const contract = await new web3.eth.Contract(
        abiObj,
        contractAddress
    );

    contract.methods.modifyArea(index, url, comment).send(
        {
            from: ethereum.selectedAddress,
            value: web3.utils.unitMap.ether / 10000,
        },
        () => {
            setInterval(() => {
                window.opener.location.reload();
                window.close();
            }),
                500;
        }
    );
};

