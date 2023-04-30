import { abiObj, contractAddress } from "./config.js"

const submitForm = async (event) => {
    event.preventDefault();

    const url = document.getElementById("url").value;
    const index = document.getElementById("index").value;
    const comment = document.getElementById("comment").value;

    web3 = new Web3(web3.currentProvider);
    const contract = await new web3.eth.Contract(
        abiObj,
        contractAddress
    );

    contract.methods.purchasedAreas(index).call((err, areaObj) => {
        if (err) {
            console.log(err);
            return;
        }

        if (!areaObj.isPurchased) {
            contract.methods.purchaseArea(index, url, comment).send(
                {
                    from: ethereum.selectedAddress,
                    value: web3.utils.unitMap.ether / 100,
                },
                () => {
                    setInterval(() => {
                        window.opener.location.reload();
                        window.close();
                    }, 500);
                }
            );
        } else {
            alert("This area has already been purchased.");
        }
    });
};

window.addEventListener("load", () => {
    const form = document.getElementById("form")
    form.onsubmit = submitForm;
})
