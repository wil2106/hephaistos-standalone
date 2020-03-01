<template>
  <v-container
          class="fill-height"
          fluid
        >
          <v-row
            align="center"
            justify="center"
          >
            <v-col
              cols="12"
              sm="8"
              md="4"
            >
              <v-card class="elevation-12">
                <v-toolbar
                  color="primary"
                  dark
                  flat
                >
                  <v-toolbar-title>Welcome !</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-form v-model="isValid">
                    <v-text-field
                      label="username"
                      v-model="username"
                      type="text"
                      :rules="usernameRules"
                      required
                    />

                    <v-text-field
                      label="Password"
                      v-model="password"
                      type="password"
                      :rules="passwordRules"
                      required
                    />
                  </v-form>
                  <p class="red--text">{{errorMessage}}</p>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn color="primary" :disabled="!isValid" v-on:click="login">Login</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
  </v-container>
</template>

<script>
// all the existing imports here
import axios from 'axios'
import router from '../router'

export default {
  name: 'Login',
  data: function () {
    return {
      usernameRules: [v => !!v || 'Email is required'],
      passwordRules: [v => !!v || 'Password is required'],
      username: null,
      password: null,
      errorMessage: '',
      isValid: true
    }
  },
  methods: {
    login: function (event) {
      axios
        .post('http://localhost:3000/api/v1/login',
          {
            username: this.username,
            password: this.password
          })
        .then(response => {
          this.$session.id = response.data.id
          this.$session.lastname = response.data.lastname
          this.$session.firstname = response.data.firstname
          this.$session.email = response.data.email
          this.$session.connected = true
          router.push('Home')
        })
        .catch(error => {
          if (error.response.statusText === 'Unauthorized') {
            this.errorMessage = 'Username or password incorrect'
          } else {
            this.errorMessage = error.message.statusText
          }
        })
    }
  }
}
</script>
