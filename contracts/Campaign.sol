// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

// contract CampaignFactory {
//     address[] public deployedCampaigns;

//     function createCampaign(uint minimum) public {
//         address newCampaign = new Campaign(minimum, msg.sender);

//         deployedCampaigns.push(newCampaign);
//     }

//     function getDeployedCampaigns() public view returns (address[] memory) {
//         return deployedCampaigns;
//     }
// }


// Crowdfunding campaign where manager can create requests to buy materials.
// Manager must have >50% of contributors to approve the purchase request
contract Campaign {
    
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
    }
    
    uint requestCounter; // track no. of requests
    mapping(uint => Request) public requests; 
    // track whether approver voted in specific request
    mapping(uint => address[]) approvalTrackers;
    
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier restricted() {
        require(msg.sender == manager, "is not the campaign manager");
        _;
    }

    constructor(uint minimum) {
        manager = msg.sender;
        minimumContribution = minimum;
        requestCounter = 0;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution, "does not meet minimum sum");

        approvers[msg.sender] = true;
        approversCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        // use memory for new Request
        Request memory newRequest = Request({
           description: description,
           value: value,
           recipient: recipient,
           complete: false,
           approvalCount: 0
        });
        approvalTrackers[requestCounter] = new address [](approversCount);
        requests[requestCounter++] = newRequest;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];

        // check that the sender is a valid approver
        require(approvers[msg.sender], "is not a valid contributor and approver");
        // check that the sender has not voted on the request
        address[] storage approval = approvalTrackers[index];
        for (uint i=0; i<approval.length; i++) {
            require(approval[i] != msg.sender, "must not have voted previously");
        }
        
        // request.approvals[msg.sender] = true;
        approval.push(msg.sender);
        
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted {
        Request storage request = requests[index];

        // ensure at least half of the approvers have approved the request
        require(request.approvalCount > (approversCount / 2));
        // check that each request can only be finalised once
        require(!request.complete);

        request.recipient.transfer(request.value);
        requests[index].complete = true; 
    }
}