// SPDX-License-Identifier: NONE

pragma solidity >= 0.7.0;

contract TheOneEther {
    
    struct Area {
        bool isPurchased;
        address owner;
        string url;
        string comment;
    }

    address public owner;
    uint public numPurchasedArea;
    Area[100] public areas;

    constructor() {
        owner = msg.sender;
        numPurchasedArea = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function purchaseArea(uint index, string memory url, string memory comment) public payable {
        require(0 <= index || index < 100);
        require(msg.value == 0.01 ether);
        require(!areas[index].isPurchased);

        Area storage area = areas[index];
        area.isPurchased = true;
        area.owner = msg.sender;
        area.url = url;
        area.comment = comment;
        numPurchasedArea++;
    }

    function modifyArea(uint index, string memory url, string memory comment) public payable {
        require(0 <= index || index < 100);
        require(msg.value == 0.0001 ether);
        require(areas[index].owner == msg.sender);

        Area storage area = areas[index];
        area.url = url;
        area.comment = comment;
    }

    function withdrawFunds() public onlyOwner {
        if (!payable(owner).send(address(this).balance))
            revert();
    }

}