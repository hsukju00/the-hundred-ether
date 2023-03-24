// SPDX-License-Identifier: NONE

pragma solidity >= 0.7.0;

contract TheHundredEther {
    
    struct Area {
        bool isPurchased;
        address owner;
        string url;
    }

    address public owner;
    uint public numPurchasedArea;
    Area[10000] private areas;

    constructor() {
        owner = msg.sender;
        numPurchasedArea = 0;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function purchaseArea(uint _index, string memory _url) public payable {
        require(!areas[_index].isPurchased);
        require(msg.value == 0.01 ether);

        Area storage area = areas[_index];
        area.owner = msg.sender;
        area.url = _url;
        numPurchasedArea++;
    }

    function replaceAreaUrl(uint _index, string memory _url) public payable {
        require(areas[_index].owner == msg.sender);

        Area storage area = areas[_index];
        area.url = _url;
    }

    function withdrawFunds() public onlyOwner {
        if (!payable(owner).send(address(this).balance))
            revert();
    }

}