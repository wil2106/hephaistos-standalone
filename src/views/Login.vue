<template>
  <v-container class="fill-height" fluid>
          <v-row align="center" justify="center">
            <v-col cols="12" sm="8" md="4">
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>Welcome !</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="isValid">
                    <v-text-field label="username" v-model="username" type="text" :rules="usernameRules" required/>
                    <v-text-field label="Password" v-model="password" type="password" :rules="passwordRules" required/>
                  </v-form>
                  <p class="red--text">{{errorMessage}}</p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" :disabled="!isValid" v-on:click="triggerLogin">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    usernameRules: [v => !!v || 'Email is required'],
    passwordRules: [v => !!v || 'Password is required'],
    username: null,
    password: null,
    errorMessage: '',
    isValid: true
  }),
  computed: {
    ...mapState('user', ['status', 'connected'])
  },
  methods: {
    ...mapActions('user', ['login']),
    async triggerLogin () {
      await this.login({
        email: this.username,
        password: this.password
      })
      if (this.connected === true) {
        this.$router.push('/')
      } else {
        this.errorMessage = this.status
      }
    }
  }
}
</script>
