import { abiObj, contractAddress } from "./config.js"

const isDappWeb = typeof window.ethereum !== "undefined";

if (!isDappWeb) {
    alert(
        "MetaMask가 설치되어 있지 않습니다. 정상적인 이용이 불가능합니다."
    );
}

web3 = new Web3(web3.currentProvider);
const contract = await new web3.eth.Contract(abiObj, contractAddress);

const updateEthereumAccount = async () => {
    const currentAccountSpan = document.getElementById(
        "current-account-span"
    );
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
        currentAccountSpan.innerText = accounts[0];
    } else {
        currentAccountSpan.innerText = "unconnected";
    }

    const numPurchasedAreaSpan = document.getElementById(
        "num-purchased-area-span"
    );
    const numRemainAreaSpan = document.getElementById(
        "num-remain-area-span"
    );
    contract.methods.numPurchasedAreas().call((err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        numPurchasedAreaSpan.innerText = result;
        numRemainAreaSpan.innerText = 100 - result;
    });
};

window.addEventListener('load', async () => {
    updateEthereumAccount();

    const connectEthereumAccountBtn = document.getElementById(
        "connect-ethereum-account-btn"
    );
    connectEthereumAccountBtn.addEventListener(
        "click",
        async () =>
            await ethereum.request({
                method: "eth_requestAccounts",
            })
    );
    const buyAreaBtn = document.getElementById("buy-area-btn");
    const myAreaBtn = document.getElementById("my-area-btn");
    const modifyAreaBtn = document.getElementById("modify-area-btn");
    buyAreaBtn.addEventListener("click", () => {
        window.open(
            "buyArea.html",
            "_blank",
            "popup, width=450, height=500"
        );
    });
    myAreaBtn.addEventListener("click", () => {
        window.open(
            "myAreas.html",
            "_blank",
            "popup, width=800, height=500"
        );
    });
    modifyAreaBtn.addEventListener("click", () => {
        window.open(
            "modifyArea.html",
            "_blank",
            "popup, width=450, height=500"
        );
    });

    const mapDiv = document.getElementById("map");
    for (let i = 0; i < 100; i++) {
        const areaDiv = document.createElement("div");
        areaDiv.classList.add("area");
        areaDiv.classList.add("unpurchased")
        areaDiv.id = `area-${i}`
        areaDiv.innerText = i;
        mapDiv.appendChild(areaDiv);
    }

    contract.methods.getAllPurchasedAreas().call((err, areas) => {
        if (err) {
            console.error(err);
            return;
        }

        areas.forEach((area) => {
            const areaDiv = document.getElementById(`area-${area.index}`)
            areaDiv.classList.remove("unpurchased")
            areaDiv.innerText = '';
            areaDiv.classList.add("purchased");
            const areaA = document.createElement("a");
            areaA.href = area.url;
            areaA.target = "_blank";
            areaDiv.appendChild(areaA);
            const areaImg = document.createElement("img");
            areaImg.src = `http://www.google.com/s2/favicons?domain=${area.url}&sz=256`;
            areaDiv.appendChild(areaImg);
            const areaCommentP = document.createElement("p");
            areaCommentP.classList.add("area-comment-p");
            areaCommentP.innerText = area.comment;
            areaDiv.appendChild(areaCommentP);
        });
    })
})

ethereum.on("accountsChanged", (accounts) => {
    console.log(accounts);
    updateEthereumAccount();
});

