<template>
    <v-layout column justify-center align-center>
      <v-col xs12 sm8 md12 style="max-width: 80rem">
      <h1>{{ module.name }}</h1>
        <v-col v-for='session in sessions' in modules :key='session.id'>
          <h2>
             <router-link :to="`/session/${session.id}`">{{session.name}}</router-link>
          </h2>
          <v-row justify="start">
            <v-card class="ma-2" height="8em" width="16em" v-for="exercise in getExercisesBySessionId(session.id)" :key="exercise.id">
              <v-card-title class="subtitle-1">
                  {{exercise.title}}
              </v-card-title>
              <v-card-text>
                {{exercise.lang}}
              </v-card-text>
            </v-card>
          </v-row>
        </v-col>
      </v-col>
    </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
export default {
  name: 'Module',
  async mounted () {
    await this.fetchModules()
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )
  },
  computed: {
    ...mapState('modules', ['modules']),
    ...mapGetters('modules', ['getModuleById']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    module () {
      return this.getModuleById(this.moduleId) || { name: 'Loading...' }
    },
    moduleId () {
      return parseInt(this.$route.params.id)
    },
    sessions () {
      return this.getSessionsByModuleId(this.moduleId)
    }
  },
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession'])
  }
}
</script>
