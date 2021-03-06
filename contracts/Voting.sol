// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Voting is Ownable {

    using Counters for Counters.Counter;

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

    Counters.Counter public proposalCounts;

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

    function registerProposal(string memory _description) external {
        require(workflowState == WorkflowStatus.ProposalsRegistrationStarted, "Error with the WorkflowStatus");
        require(whiteList[msg.sender].isRegistered, "User is not registred has a voter !");

        Proposal memory newProposal;
        newProposal.description = _description;

        proposalCounts.increment();

        listProposals[proposalCounts.current()] = newProposal;

        emit ProposalRegistered(proposalCounts.current());
    }

    function endProposalRegistration() external onlyOwner {
        require(workflowState == WorkflowStatus.ProposalsRegistrationStarted, "Error with the WorkflowStatus");

        WorkflowStatus oldState = workflowState;
        workflowState = WorkflowStatus.ProposalsRegistrationEnded;

        emit WorkflowStatusChange(oldState, workflowState);
        emit ProposalsRegistrationEnded();
    }

    function VotingSessionStart() external onlyOwner {
        require(workflowState == WorkflowStatus.ProposalsRegistrationEnded, "Error with the WorkflowStatus");

        WorkflowStatus oldState = workflowState;
        workflowState = WorkflowStatus.VotingSessionStarted;

        emit WorkflowStatusChange(oldState, workflowState);
        emit VotingSessionStarted();
    }

    function Vote(uint idProposal) external  {
        require(workflowState == WorkflowStatus.VotingSessionStarted, "Error with the WorkflowStatus");
        require(whiteList[msg.sender].isRegistered, "User is not registred has a voter !");
        require(!whiteList[msg.sender].hasVoted, "Voter has already voted");

        listProposals[idProposal].voteCount++;
        whiteList[msg.sender].hasVoted = true;
        whiteList[msg.sender].votedProposalId = idProposal;

        emit Voted(msg.sender, idProposal);
    }

    function VotingSessionEnd() external onlyOwner {
        require(workflowState == WorkflowStatus.VotingSessionStarted, "Error with the WorkflowStatus");

        WorkflowStatus oldState = workflowState;
        workflowState = WorkflowStatus.VotingSessionEnded;
 
        emit WorkflowStatusChange(oldState, workflowState);
        emit VotingSessionEnded();
    }

    function countVotes() external onlyOwner{
        require(workflowState == WorkflowStatus.VotingSessionEnded, "Error with the WorkflowStatus");

        uint maxVotesProposal = 0;
        for(uint i = 1; i <= proposalCounts.current(); i++ )
        {
            if(listProposals[i].voteCount > maxVotesProposal)
            {
                maxVotesProposal = listProposals[i].voteCount;
                winningProposalId = i;
            }
        }

        WorkflowStatus oldState = workflowState;
        workflowState = WorkflowStatus.VotesTallied;

        emit WorkflowStatusChange(oldState, workflowState);
        emit VotesTallied();
    }

    function getWinningProposal() external view returns(string memory) {
        require(workflowState == WorkflowStatus.VotingSessionEnded, "Error with the WorkflowStatus");

        return listProposals[winningProposalId].description;
    }
}
