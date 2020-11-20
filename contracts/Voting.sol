// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Voting is Ownable {

    enum WorkflowStatus {
        RegisteringVoters,
        ProposalsRegistrationStarted,
        ProposalsRegistrationEnded,
        VotingSessionStarted,
        VotingSessionEnded,
        VotesTallied
    }
    
    WorkflowStatus public workflowState;

    struct Voter {
        bool isRegistered;
        bool hasVoted;
        uint votedProposalId;
    }
    
    mapping(address => Voter) public whiteList;
    
    struct Proposal {
        string description;
        uint voteCount;
    }
    
    mapping(uint => Proposal) public listProposals;
    
    Counters.Counter private _proposalCounts;

    uint winningProposalId;
    
    event VoterRegistered(address voterAddress);
    event ProposalsRegistrationStarted();
    event ProposalsRegistrationEnded();
    event ProposalRegistered(uint proposalId);
    event VotingSessionStarted();
    event VotingSessionEnded();
    event Voted (address voter, uint proposalId);
    event VotesTallied();
    
    event WorkflowStatusChange(WorkflowStatus previousStatus, WorkflowStatus newStatus);

    function isVoter(address _address) public view onlyOwner returns(bool) {
      return whiteList[_address].isRegistered;
    }

    function registerVoter(address _address) public onlyOwner {
        require(!whiteList[_address].isRegistered, "Voter already Registered");

        Voter memory newVoter;
        newVoter.isRegistered = true;

        whiteList[_address] = newVoter;

        emit VoterRegistered(_address);
    }

    function startProposalRegistration() external onlyOwner {
        require(workflowState == WorkflowStatus.RegisteringVoters, "Error with the WorkflowStatus");

        WorkflowStatus oldState = workflowState;
        workflowState = WorkflowStatus.ProposalsRegistrationStarted;

        emit WorkflowStatusChange(oldState, workflowState);
        emit ProposalsRegistrationStarted();
    }
}
