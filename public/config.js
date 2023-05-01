export const abiObj = [
    {
        "inputs": [],
        "name": "done",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "index",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "comment",
                "type": "string"
            }
        ],
        "name": "modifyArea",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint8",
                "name": "index",
                "type": "uint8"
            },
            {
                "internalType": "string",
                "name": "url",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "comment",
                "type": "string"
            }
        ],
        "name": "purchaseArea",
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
                "internalType": "uint8",
                "name": "index",
                "type": "uint8"
            },
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
            },
            {
                "internalType": "string",
                "name": "comment",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "purchasedDate",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "modifiedDate",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllPurchasedAreas",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "index",
                        "type": "uint8"
                    },
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
                    },
                    {
                        "internalType": "string",
                        "name": "comment",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "purchasedDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "modifiedDate",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TheOneEther.Area[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getOwnermapByOwner",
        "outputs": [
            {
                "internalType": "uint8[]",
                "name": "",
                "type": "uint8[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "getPurchasedAreasByOwner",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "uint8",
                        "name": "index",
                        "type": "uint8"
                    },
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
                    },
                    {
                        "internalType": "string",
                        "name": "comment",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "purchasedDate",
                        "type": "uint256"
                    },
                    {
                        "internalType": "uint256",
                        "name": "modifiedDate",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct TheOneEther.Area[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "numPurchasedAreas",
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
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "ownerMap",
        "outputs": [
            {
                "internalType": "uint8",
                "name": "",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]
export const contractAddress = "0xDA929A761E57220c4B96a6E94844Cc7f896E0958"

