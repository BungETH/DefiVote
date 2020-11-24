<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>

        <div class="p-4" v-show="bcConnected && !bcConnectionError">
            <h2>CONNECTED !!</h2>
        </div>
        <div v-show="bcConnectionError" class="m-4 alert alert-danger">
            <h2 class="pb-4">Error connecting to the blockchain!</h2>

            <p v-if="errorConnectionMessage">
                <b>{{ errorConnectionMessage }}</b>
            </p>

            <p v-show="bcSmartContractAddressError">
                <b>It seems like the address of the smart contract is wrong!</b>
            </p>

            <hr>

            <p>Other common causes of error:</p>
            <ul>
                <li>The blockchain is running.</li>
                <li>The port in your settings (file: <b>libs/mixinViews.js</b>) match with the blockchain configuration.</li>
                <li>The compiled smart contract <b>app-users/src/assets/Voting.json</b> is equal to <b>build/Voting.json</b>.</li>
            </ul>
        </div>


  </div>
</template>

<script>

import mixin from './mixinViews.js';

export default {
  name: 'App',
  mixins: [mixin]
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
