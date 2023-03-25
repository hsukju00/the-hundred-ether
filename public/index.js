const abiObj = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			}
		],
		"name": "purchaseArea",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_url",
				"type": "string"
			}
		],
		"name": "replaceAreaUrl",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "withdrawFunds",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "areas",
		"outputs": [
			{
				"internalType": "bool",
				"name": "isPurchased",
				"type": "bool"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "url",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "numPurchasedArea",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
const contractAddress = "0xD4297Ba276a0Db11411A9DcA9a59Ad2d7D3C15b5";
        

const ethereum = window.ethereum;
const checkModernWeb = typeof ethereum !== "undefined";

if (!checkModernWeb)
    alert(
        "MetaMask가 감지되지 않습니다. MetaMask를 설치해야 정상적으로 이용이 가능합니다."
    );

window.addEventListener("load", async () => {
    if (!checkModernWeb) return;

    const web3 = new Web3("http://localhost:8545");
    const contract = await new web3.eth.Contract(abiObj, contractAddress);

    const numPurchasedAreaSpan = document.getElementById("num-purchased-area");
    const numRemainAreaSpan = document.getElementById("num-remain-area");

    contract.methods.numPurchasedArea().call((err, result) => {
        numPurchasedAreaSpan.innerText = result;
        numRemainAreaSpan.innerText = 10000 - result;
    });

    const connectEthereumAccountBtn = document.getElementById(
        "connect-ethereum-account-btn"
    );

    connectEthereumAccountBtn.addEventListener("click", async () => {
        const currentAccountSpan = document.getElementById("current-account");
        const accounts = await ethereum.request({
            method: "eth_requestAccounts",
        });
        contract.defaultAccount = accounts[0];
        currentAccountSpan.innerText = accounts[0];
    });

    const mapDiv = document.getElementById("map");
    for (let i = 0; i < 100; i++) {
        contract.methods.areas(i).call((err, areaObj) => {
            const areaDiv = document.createElement("div");
            areaDiv.id = "area";
            if (areaObj.isPurchased) {
                console.log(areaObj);
                areaDiv.innerText = areaObj.url;
            }
            mapDiv.appendChild(areaDiv);
        });

    }
});
