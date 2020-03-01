<template>
  <v-app>
    <v-app-bar app color="primary" dark>
       <v-toolbar-title>Hephaistos</v-toolbar-title>
       <v-spacer></v-spacer>
       <v-toolbar-items v-if="$session.connected" class="hidden-sm-and-down">
        <v-btn text>
          {{this.$session.firstname}} {{this.$session.lastname}}
        </v-btn>
        <v-divider
          inset
          vertical
        ></v-divider>
        <v-btn text v-on:click="logout">
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <transition>
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </transition>
    </v-content>
  </v-app>
</template>

<script>
// all the existing imports here
import router from './router'

export default {
  name: 'App',
  data: () => ({}),
  methods: {
    logout: function (event) {
      this.$session.id = null
      this.$session.lastname = null
      this.$session.firstname = null
      this.$session.email = null
      this.$session.connected = false
      router.push({ name: 'Login' })
    }
  }
}
</script>
