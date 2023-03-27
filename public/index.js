const abiObj =[
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
const contractAddress = "0x88571a503f267de5065792aB1d2cc11c2e406Db1";

const main = async () => {
	const isDappWeb = typeof window.ethereum !== "undefined";

	if (!isDappWeb) {
		alert("MetaMask가 설치되어 있지 않습니다. 정상적인 이용이 불가능합니다.");
		return;
	}

	web3 = new Web3(web3.currentProvider);
	const contract = await new web3.eth.Contract(abiObj, contractAddress);

	const updateEthereumAccount = async () => {
		const currentAccountSpan = document.getElementById("current-account-span")
		await ethereum.request({ method: "eth_accounts"})
		currentAccountSpan.innerText = ethereum.selectedAddress
		contract.defaultAccount = ethereum.selectedAddress
	}

	window.addEventListener("load", async () => {
		const connectEthereumAccountBtn = document.getElementById(
			"connect-ethereum-account-btn"
		);
		connectEthereumAccountBtn.addEventListener("click", async () => {
			await ethereum.request({
				method: "eth_requestAccounts",
			});
			updateEthereumAccount();
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
					areaDiv.classList.add("purchased")
					const areaA = document.createElement("a");
					areaA.href = areaObj.url;
					areaA.target = "_blank";
					areaDiv.appendChild(areaA);
					const areaImg = document.createElement("img");
					areaImg.src = `http://www.google.com/s2/favicons?domain=${areaObj.url}&sz=128`
					areaDiv.appendChild(areaImg);
				}
			});
			mapDiv.appendChild(areaDiv);

		}
	});

	ethereum.on("connect", (connectInfo) => {
		if (ethereum.isConnected()) updateEthereumAccount();
		
		const numPurchasedAreaSpan = document.getElementById("num-purchased-area-span");
		const numRemainAreaSpan = document.getElementById("num-remain-area-span");
		contract.methods.numPurchasedArea().call((err, result) => {
			numPurchasedAreaSpan.innerText = result;
			numRemainAreaSpan.innerText = 10000 - result;
		});
	})

	ethereum.on("accountsChanged", (accounts) => {
		updateEthereumAccount();
	})
}

main();

