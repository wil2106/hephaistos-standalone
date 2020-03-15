<template>
  <v-app>
    <v-app-bar app color="primary" dark>
       <v-toolbar-title>Hephaistos</v-toolbar-title>
       <v-spacer></v-spacer>
       <v-toolbar-items class="hidden-sm-and-down">
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
        <router-view>
        </router-view>
    </v-content>
  </v-app>
</template>

<script>
// all the existing imports here
// import router from './router'

export default {
  name: 'App',
  data: () => ({}),
  methods: {
    logout: function (event) {
      this.$router.push('/login')
    }
  }
}
</script>
