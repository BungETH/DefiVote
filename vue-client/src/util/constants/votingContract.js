const address = '0xB969C291a8D504F198025a04C179c68b5Aac393c'
const ABI =    [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "previousOwner",
          "type": "address"
        },
        {
          "indexed": true,
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "OwnershipTransferred",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "ProposalRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "ProposalsRegistrationEnded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "ProposalsRegistrationStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "voter",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "proposalId",
          "type": "uint256"
        }
      ],
      "name": "Voted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "voterAddress",
          "type": "address"
        }
      ],
      "name": "VoterRegistered",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "VotesTallied",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "VotingSessionEnded",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [],
      "name": "VotingSessionStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "enum Voting.WorkflowStatus",
          "name": "previousStatus",
          "type": "uint8"
        },
        {
          "indexed": false,
          "internalType": "enum Voting.WorkflowStatus",
          "name": "newStatus",
          "type": "uint8"
        }
      ],
      "name": "WorkflowStatusChange",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "listProposals",
      "outputs": [
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
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
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "proposalCounts",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "_value",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "renounceOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "newOwner",
          "type": "address"
        }
      ],
      "name": "transferOwnership",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "whiteList",
      "outputs": [
        {
          "internalType": "bool",
          "name": "isRegistered",
          "type": "bool"
        },
        {
          "internalType": "bool",
          "name": "hasVoted",
          "type": "bool"
        },
        {
          "internalType": "uint256",
          "name": "votedProposalId",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [],
      "name": "workflowState",
      "outputs": [
        {
          "internalType": "enum Voting.WorkflowStatus",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "isVoter",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "registerVoter",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "startProposalRegistration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        }
      ],
      "name": "registerProposal",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "endProposalRegistration",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "VotingSessionStart",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "idProposal",
          "type": "uint256"
        }
      ],
      "name": "Vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "VotingSessionEnd",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "countVotes",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getWinningProposal",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
  ]
export {address, ABI}