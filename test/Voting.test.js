const { BN } = require('@openzeppelin/test-helpers');
const { expect } = require('chai');
const Voting = artifacts.require("Voting");

contract('Voting', function (accounts) {
    const admin = accounts[8];
    const voter1 = accounts[1];
    const voter2 = accounts[2];
    const voter3 = accounts[3];
    let VotingInstance;

    const status = {
        0 :'RegisteringVoters',
        1 :'ProposalsRegistrationStarted',
        2 :'ProposalsRegistrationEnded',
        3 :'VotingSessionStarted',
        4 :'VotingSessionEnded',
        5 :'VotesTallied'
    };

    beforeEach(async function () {
        VotingInstance = await Voting.new({from: admin});
    });

    it("Adminstrator should add a Voter to whitelist", async () => {

        let isVoterBefore = await VotingInstance.isVoter(voter1, {from: admin});
        expect(isVoterBefore).to.equal(false);

        await VotingInstance.registerVoter(voter1, {from: admin});

        let isVoterAfter = await VotingInstance.isVoter(voter1, {from: admin});
        expect(isVoterAfter).to.equal(true);
    });

    it("Adminstrator should start proposal registration session", async () => {

        let beforeStatus = await VotingInstance.workflowState();
        expect(status[beforeStatus]).to.equal('RegisteringVoters');

        await VotingInstance.startProposalRegistration({from: admin});

        let afterStatus = await VotingInstance.workflowState();
        expect(status[afterStatus]).to.equal('ProposalsRegistrationStarted');
    });

    it("Voter should register a proposal", async () => {

        nbProposals = await VotingInstance.proposalCounts();

        await VotingInstance.registerProposal('aaa', {from: voter1});
        await VotingInstance.registerProposal('bbb', {from: voter2});
        await VotingInstance.registerProposal('ccc', {from: voter3});

        expect(await VotingInstance.proposalCounts()).to.above(nbProposals);

    });
});

