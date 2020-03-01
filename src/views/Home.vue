<template>
  <v-container fluid>
          <v-row justify="center">
            <v-col cols="12" md="5">
                <v-card  v-if="$session.connected" class="mx-auto">
                  <v-toolbar>
                    <v-toolbar-title>Your exercises</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon v-on:click="CreateExercise">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-toolbar>
                  <v-divider></v-divider>
                  <div v-if="items.length === 0" class="font-italic ma-5">You have no exercises yet</div>
                  <v-list three-line v-else>
                    <v-list-item-group v-model="item" color="primary">
                      <v-list-item v-for="(item, i) in items" :key="i" v-on:click="OpenExercise(item)">
                          <v-list-item-content>
                            <v-list-item-title>{{item.title}}</v-list-item-title>
                            <v-list-item-subtitle >Creation date: {{item.creation_date}}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              <div v-else>
                <h1>You do not have access to this page</h1>
              </div>
            </v-col>
          </v-row>
  </v-container>
</template>

<script>
// all the existing imports here
import axios from 'axios'
import router from '../router'

export default {
  name: 'Home',
  data: function () {
    return {
      item: null,
      items: []
    }
  },
  methods: {
    CreateExercise: function () {
      router.push({ name: 'Exercise', query: { id: '-1' } })
    },
    OpenExercise: function (obj) {
      router.push({ name: 'Exercise', query: { id: obj.id } })
    }
  },
  mounted () {
    if (this.$session.connected) {
      axios.get('http://localhost:3000/api/v1/exercises')
        .then((response) => {
          this.items = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
