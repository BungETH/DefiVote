import Web3 from 'web3'
import {address, ABI} from './constants/votingContract'

let getContract = new Promise(function (resolve, reject) {
    let web3 = new Web3(window.web3.currentProvider)
    let votingContract = web3.eth.contract(ABI)
    let votingContractInstance = votingContract.at(address)
    votingContractInstance = () => votingContractInstance
    resolve(votingContractInstance)
})

export default getContract