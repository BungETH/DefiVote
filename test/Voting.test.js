const Voting = artifacts.require("Voting");
const { expect } = require('chai');

contract("Voting", (accounts) => {
    const admin = accounts[8];
    const voter1 = accounts[1];
    const voter2 = accounts[2];
    const voter3 = accounts[3];

    it("Adminstrator should add a Voter to whitelist", async () => {
        const VotingInstance = await Voting.new({from: admin});

        const isVoterBefore = await VotingInstance.isVoter(voter1, {from: admin});
        expect(isVoterBefore).to.equal(false);

        await VotingInstance.registerVoter(voter1, {from: admin});

        const isVoterAfter = await VotingInstance.isVoter(voter1, {from: admin});
        expect(isVoterAfter).to.equal(true);
    });
});

