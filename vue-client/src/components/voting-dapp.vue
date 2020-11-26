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
 beforeCreate () {
    console.debug('registerWeb3 Action dispatched from voting-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
}
</script>

<style scoped></style>