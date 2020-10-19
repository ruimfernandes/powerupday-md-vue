<template>
  <div class="container">
    <h1>Sign in</h1>
    <h3>User email</h3>
    <input v-model="email" @change="inputsHandler"/>
    <h3>Password</h3>
    <input type="password" v-model="password" @change="inputsHandler"/>
    <br />
    <br />
    <button v-on:click="submit">Submit</button>
    <div class="login-error" v-if="errorLogin">There was a problem while trying to login!</div>
  </div>
</template>

<script>
import { authenticate } from '../services/api';

export default {
  name: 'SignIn',
  data() {
    return {
      errorLogin: false
    }
  },
  methods: {
    submit: function () {
      authenticate(this.email, this.password)
        .then(() => this.$router.push('orders'))
        .catch(() => this.errorLogin = true);
    },
    inputsHandler: function () {
      this.errorLogin = false;
    }
  },
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
.login-error {
  color: red;
}
</style>
