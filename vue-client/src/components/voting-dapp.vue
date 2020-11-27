<template>
 <hello-metamask/>
</template>

<script>

import HelloMetamask from '@/components/hello-metamask'
export default {
  name: 'voting-dapp',
  components: {
  'hello-metamask': HelloMetamask
  },
  data () {
    return {
      amount: null,
      pending: false,
      winEvent: null
    }
  },
  beforeCreate () {
    console.debug('registerWeb3 Action dispatched from voting-dapp.vue')
    this.$store.dispatch('registerWeb3')
    },
  mounted () {
    console.debug('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  },
  methods: {
    clickNumber (event) {
      console.debug(event.target.innerHTML, this.amount)
      this.winEvent = null
      this.pending = true
      this.$store.state.contractInstance().bet(event.target.innerHTML, {
        gas: 300000,
        value: this.$store.state.web3.web3Instance().toWei(this.amount, 'ether'),
        from: this.$store.state.web3.coinbase
      }, (err, result) => {
        if (err) {
          console.log(err)
          this.pending = false
        } else {
          let Won = this.$store.state.contractInstance().Won()
          Won.watch((err, result) => {
            if (err) {
              console.log('could not get event Won()')
            } else {
              this.winEvent = result.args
              this.pending = false
            }
          })
        }
      })
    }
  },
}
</script>

<style scoped></style>