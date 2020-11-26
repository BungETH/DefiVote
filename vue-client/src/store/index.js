import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'

Vue.use(Vuex)

export const store = new Vuex.Store({
 strict: true,
 state,
 mutations: {
    registerWeb3Instance (state, payload) {
        console.debug('registerWeb3instance Mutation being executed', payload)
        let result = payload
        let web3Copy = state.web3
        web3Copy.coinbase = result.coinbase
        web3Copy.networkId = result.networkId
        web3Copy.balance = parseInt(result.balance, 10)
        web3Copy.isInjected = result.injectedWeb3
        web3Copy.web3Instance = result.web3
        state.web3 = web3Copy
        }
 },
 actions: {
    registerWeb3 ({commit}) {
        console.debug('registerWeb3 Action being executed')
        getWeb3.then(result => {
          console.debug('committing result to registerWeb3Instance mutation')
          commit('registerWeb3Instance', result)
        }).catch(e => {
          console.debug('error in action registerWeb3', e)
        })
      }
 }
})