# 프로젝트1 - The One Ether

# The One Ether

 

### 팀원

- 홍석주(20193398)

## 이 프로젝트를 만든 이유

이 프로젝트는 밀리언달러 홈페이지라는 웹사이트에서 영감을 받았습니다.

[밀리언 달러 홈페이지](https://ko.wikipedia.org/wiki/밀리언_달러_홈페이지)

이 프로젝트는 영국인 학생이 학자금을 벌기위해 시작한 프로젝트입니다.

해당 웹페이지는 1000 x 1000 픽셀 그리드로 된 백만 화소로 이루어져 있으며, 이 화소를 구매하면 자신의 그림과, url, 표어를 광고할 수 있게 만들어놨고, 10 x 10 픽셀씩 한 화소 당 1달러에 팔아 백만 달러를 벌려고 했다고 합니다.

이것을 보고 이것보다 약간 간단한 버전으로 이더리움 화폐를 거래해 광고를 할 수 있는 DApp을 만들고자 했습니다.

## 개요

The One Ether에서는 일정한 크기의 총 100개의 구역을 팔고있으며, 구역을 구매하면, 자신의 url과 표어를 등록하여 광고할 수 있습니다.

구역은 각각 0.01 ether에 판매되고 있으며, 밀리언달러 홈페이지와는 다르게 구역의 url과 comment의 변경이 가능합니다. 이는 0.0001 ether의 가격입니다.

## 구현

해당 내용은 ganache 네트워크에서 작동하도록 만들었습니다.

먼저 스마트 컨트랙트를 살펴보겠습니다.

```solidity
struct Area {
    uint8 index;
    bool isPurchased;
    address owner;
    string url;
    string comment;
    uint purchasedDate;
    uint modifiedDate;
}

address public owner;
uint8 public numPurchasedAreas;
Area[100] public areas;
mapping(address => uint8[]) public ownerMap;
```

Area 구조체는 한 구역을 나타내는 구조체입니다.

총 100개의 Area 구조체 배열을 선언했고, 구매된 구역의 수를 파악하기 위해 numPurchasedAreas를 선언했습니다.

아래에 있는 ownerMap 변수는, 특정 owner가 구매한 구역을 알아내기 위해 선언했습니다.

```solidity
function purchaseArea(uint8 index, string memory url, string memory comment) public payable {
    require(msg.value == 0.01 ether, "The amount sent must be 0.01 ether.");
    require(0 <= index && index < 100, "Index must be between 0 and 99.");
    require(!areas[index].isPurchased, "The area you want to purchase must be an unpurchased area.");

    Area storage area = areas[index];
    area.index = index;
    area.isPurchased = true;
    area.owner = msg.sender;
    area.url = url;
    area.comment = comment;
    area.purchasedDate = block.timestamp;
    numPurchasedAreas++;
    ownerMap[msg.sender].push(index);
}
```

먼저 구역을 구매하기 위한 함수입니다.

DApp에서 절차에 따라 구매하게 되면 들어오는 인자값의 문제가 없겠지만, 비정상적인 접근을 막기위해 송신된 비트코인의 양과 index값, 해당 구역이 구매된 구역인지 확인했습니다.

index의 area값을 들어온 인자값으로 수정하고, ownerMap에 보낸사람의 구매한 구역 배열에 index를 추가했습니다.

```solidity
function modifyArea(uint8 index, string memory url, string memory comment) public payable {
    require(msg.value == 0.0001 ether, "The amount sent must be 0.0001 ether.");
    require(0 <= index && index < 100, "Index must be between 0 and 99.");
    require(areas[index].isPurchased, "You need to access the purchased area.");
    require(areas[index].owner == msg.sender, "The area you want to change must belong to you.");

    Area storage area = areas[index];
    area.url = url;
    area.comment = comment;
    area.modifiedDate = block.timestamp;
}
```

구역의 url과 comment의 수정을 위한 함수입니다.

구매와 달리 해당 구역이 자신의 소유임을 확인하는 과정이 있습니다.

```solidity
function done() public onlyOwner {
    require(numPurchasedAreas == 100);
    if (!payable(owner).send(address(this).balance))
        revert();
}
```

해당 컨트랙트가 끝났을때, 컨트랙트의 잔금을 받을 수 있는 함수입니다.

```solidity
function getAllPurchasedAreas() view public returns (Area[] memory) {
    uint8 cnt = 0;
    Area[] memory ret = new Area[](numPurchasedAreas);
    for (uint8 i=0; i<100; i++) {
        if (areas[i].isPurchased) {
            ret[cnt] = areas[i];
            cnt++;
        }
    }
    return ret;
}
```

모든 구매 구역을 얻기 위한 함수입니다.

처음엔 메인화면에서 100개의 구역을 전부 확인하는 방식을 사용했지만, 이건 네트워크의 비용을 늘리는 행위라고 생각했습니다.

따라서 컨트랙트쪽에서 처리 후 필요한 데이터만을 보내는 방식을 위해 정해진 크기의 배열을 새로 만들어 반환하는 방식으로 바꾸었습니다.

```solidity
function getPurchasedAreasByOwner(address _owner) view public returns (Area[] memory) {
    require(ownerMap[_owner].length != 0, "This account has no purchased areas.");

    uint8 cnt = 0;
    Area[] memory ret = new Area[](ownerMap[_owner].length);
    for (uint8 i=0; i<ownerMap[_owner].length; i++) {
        ret[cnt] = areas[ownerMap[_owner][i]];
        cnt++;
    }
    return ret;
}
```

계정의 주소 값으로 해당 계정의 구역을 반환하는 함수입니다.

이를 구현하기 위해 ownerMap이라는 address to uint8[] 의 mapping 변수를 선언해두었습니다.

자신이 구매한 구역을들 확인하기 위해 사용했습니다.

```solidity
function getOwnermapByOwner(address _owner) view public returns (uint8[] memory) {
    require(ownerMap[_owner].length != 0, "This account has no purchased areas.");

    uint8 cnt = 0;
    uint8[] memory ret = new uint8[](ownerMap[_owner].length);
    for (uint8 i=0; i<ownerMap[_owner].length; i++) {
        ret[cnt] = ownerMap[_owner][i];
        cnt++;
    }
    return ret;
}
```

ownerMap에 들어있는 구매한 구역의 배열을 얻기위한 함수입니다.

자신의 구역 중 변경할 수 있는 구역을 나타내기 위해 사용했습니다.

다음은 소스코드 내의 핵심 로직들을 살펴보겠습니다.

```solidity
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
```

메인화면에서 구역 현황을 가져오는 부분입니다.

getAllPurchasedAreas 함수를 호출하여 구매된 모든 구역을 가져와 html element를 생성해서 정보를 추가했습니다.

```solidity
contract.methods.areas(index).call((err, areaObj) => {
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
```

구매 form의 onsubmit event의 일부입니다.

컨트랙트 인스턴스로 먼저 구역이 구매되었는지 확인하고, 그렇지 않다면 구매 함수를 호출합니다.

```solidity
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

// 생략

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
```

구역 정보를 바꾸는 form의 onsubmit event의 일부입니다.

먼저 자신이 소유하고 있는 구역의 index를 전부 가져온 뒤에 이를 option으로 추가하여 select 할 수 있게 만들었고, 이 form의 정보를 담아 modifyArea 함수를 호출할 수 있도록 했습니다.

```solidity
contract.methods.getPurchasedAreasByOwner(web3.utils.toChecksumAddress(ethereum.selectedAddress)).call((err, areas) => {
    if (err) {
        console.log(err);
        return;
    }

    myAreaDiv.innerText = ""

    let writable_areas = [...areas]
    writable_areas.sort((a, b) => {
        return a.index - b.index
    });
    writable_areas.forEach((area) => {
        const areaDiv = document.createElement("div");
        const areaIndexH1 = document.createElement("h1");
        areaIndexH1.innerText = `Area ${area.index}`;
        areaDiv.appendChild(areaIndexH1);
        const areaUrlH3 = document.createElement("h3");
        areaUrlH3.innerText = area.url;
        areaDiv.appendChild(areaUrlH3);
        const areaCommentP = document.createElement("p");
        areaCommentP.innerText = area.comment;
        areaDiv.appendChild(areaCommentP);

        areaDiv.classList.add("area-div");
        myAreaDiv.appendChild(areaDiv);
    })
});
```

마지막으로 자신이 소유한 구역들의 목록 현황을 가져오는 부분입니다.

getPurchasedAreasByOwner 함수를 통해 해당 계정이 소유한 모든 구역을 불러와 html element를 생성해서 정보를 추가했습니다.

## 시연동영상

동작이 되는 모습은 시연동영상을 통해 확인이 가능합니다.
[네트워크최신기술 project1 - The One Ether](https://youtu.be/z3Tj4VIdLNM)
