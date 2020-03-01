<template>
  <v-container>
    <div id="app">
      {{ message }}
    </div>
  </v-container>
</template>

<script>
export default {
  name: 'app',

  data: () => ({
    message: 'Hello Vue.js!'
  })
}
</script>
