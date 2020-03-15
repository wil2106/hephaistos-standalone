<template>
    <v-layout column justify-center align-center>
      <v-col xs12 sm8 md12 style="max-width: 80rem">
        <v-row v-for='module in modules' :key='module.id'>
          <h2>
             <router-link :to="`/module/${module.id}`">{{module.name}}</router-link>
          </h2>
          <v-row justify="start">
            <v-card v-on:click="openSession" class="ma-2" height="8em" width="16em" v-for="session in getSessionsByModuleId(module.id)" :key="session.id">
              <v-card-title class="subtitle-1">
                  {{session.name}}
              </v-card-title>
              <v-card-text>
              </v-card-text>
            </v-card>
          </v-row>
        </v-row>
      </v-col>
    </v-layout>
</template>

<script>
import { mapGetters, mapActions, mapState } from 'vuex'
export default {
  name: 'Modules',
  async mounted () {
    await this.fetchModules()
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
  },
  computed: {
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapState('modules', ['modules'])
  },
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    openSession () {
      console.log('Test')
    }
  }
}
</script>
