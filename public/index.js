const main = async () => {
    const isDappWeb = typeof window.ethereum !== "undefined";

    if (!isDappWeb) {
        alert(
            "MetaMask가 설치되어 있지 않습니다. 정상적인 이용이 불가능합니다."
        );
        return;
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
    };

    window.addEventListener("load", async () => {
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
                "myArea.html",
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
            areaDiv.className = "area";
            contract.methods.areas(i).call((err, areaObj) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (areaObj.isPurchased) {
                    areaDiv.classList.add("purchased");
                    const areaA = document.createElement("a");
                    areaA.href = areaObj.url;
                    areaA.target = "_blank";
                    areaDiv.appendChild(areaA);
                    const areaImg = document.createElement("img");
                    areaImg.src = `http://www.google.com/s2/favicons?domain=${areaObj.url}&sz=256`;
                    areaDiv.appendChild(areaImg);
                    const areaCommentP = document.createElement("p");
                    areaCommentP.classList.add("area-comment-p");
                    areaCommentP.innerText = areaObj.comment;
                    areaDiv.appendChild(areaCommentP);
                } else {
                    areaDiv.classList.add("unpurchased");
                    areaDiv.innerText = i;
                }
            });
            mapDiv.appendChild(areaDiv);
        }
    });

    ethereum.on("connect", (connectInfo) => {
        updateEthereumAccount();

        const numPurchasedAreaSpan = document.getElementById(
            "num-purchased-area-span"
        );
        const numRemainAreaSpan = document.getElementById(
            "num-remain-area-span"
        );
        contract.methods.numPurchasedArea().call((err, result) => {
            numPurchasedAreaSpan.innerText = result;
            numRemainAreaSpan.innerText = 100 - result;
        });
    });

    ethereum.on("accountsChanged", (accounts) => {
        updateEthereumAccount();
    });
};

main();
