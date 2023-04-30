// SPDX-License-Identifier: NONE
pragma solidity >=0.8.0;

contract TheOneEther {
    struct Area {
        uint8 index;
        bool isPurchased;
        address owner;
        string url;
        string comment;
        uint256 purchasedDate;
        uint256 modifiedDate;
    }

    address public owner;
    uint256 public numPurchasedAreas;
    Area[100] public purchasedAreas;
    mapping(address => uint8[]) public ownerMap;

    constructor() {
        owner = msg.sender;
        numPurchasedAreas = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function getAllPurchasedAreas() public view returns (Area[] memory) {
        uint8 cnt = 0;
        Area[] memory ret = new Area[](numPurchasedAreas);
        for (uint8 i = 0; i < 100; i++) {
            if (purchasedAreas[i].isPurchased) {
                ret[cnt] = purchasedAreas[i];
                cnt++;
            }
        }
        return ret;
    }

    function getPurchasedAreasByOwner(address _owner)
        public
        view
        returns (Area[] memory)
    {
        require(
            ownerMap[_owner].length != 0,
            "This account has no purchased areas."
        );

        uint8 cnt = 0;
        Area[] memory ret = new Area[](ownerMap[_owner].length);
        for (uint8 i = 0; i < ownerMap[_owner].length; i++) {
            ret[cnt] = purchasedAreas[ownerMap[_owner][i]];
            cnt++;
        }
        return ret;
    }

    function getOwnermapByOwner(address _owner)
        public
        view
        returns (uint8[] memory)
    {
        require(
            ownerMap[_owner].length != 0,
            "This account has no purchased areas."
        );

        uint8 cnt = 0;
        uint8[] memory ret = new uint8[](ownerMap[_owner].length);
        for (uint8 i = 0; i < ownerMap[_owner].length; i++) {
            ret[cnt] = ownerMap[_owner][i];
            cnt++;
        }
        return ret;
    }

    function purchaseArea(
        uint8 index,
        string memory url,
        string memory comment
    ) public payable {
        require(msg.value == 0.01 ether, "The amount sent must be 0.01 ether.");
        require(0 <= index && index < 100, "Index must be between 0 and 99.");
        require(
            !purchasedAreas[index].isPurchased,
            "The area you want to purchase must be an unpurchased area."
        );

        Area memory area = Area(
            index,
            true,
            msg.sender,
            url,
            comment,
            block.timestamp,
            0
        );
        purchasedAreas[index] = area;
        numPurchasedAreas++;
        ownerMap[msg.sender].push(index);
    }

    function modifyArea(
        uint8 index,
        string memory url,
        string memory comment
    ) public payable {
        require(
            msg.value == 0.0001 ether,
            "The amount sent must be 0.0001 ether."
        );
        require(0 <= index && index < 100, "Index must be between 0 and 99.");
        require(
            purchasedAreas[index].isPurchased,
            "You need to access the purchased area."
        );
        require(
            purchasedAreas[index].owner == msg.sender,
            "The area you want to change must belong to you."
        );

        Area storage area = purchasedAreas[index];
        area.url = url;
        area.comment = comment;
        area.modifiedDate = block.timestamp;
    }

    function done() public onlyOwner {
        require(numPurchasedAreas == 100);
        if (!payable(owner).send(address(this).balance)) revert();
    }
}
