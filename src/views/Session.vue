<template>
   <v-layout row wrap>
      <v-flex xs2 class="pa-md-4">
        <v-card v-on:click="openExercise(exercise.id)" class="ma-2" v-for="exercise in getExercisesBySessionId(sessionId)" :key="exercise.id">
              <v-card-title class="subtitle-1">
                  {{exercise.title}}
              </v-card-title>
              <v-card-text>
                {{exercise.lang}}
              </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs10 class="pa-md-4">
        <Exercise :exId="exerciseId" :sessId="sessionId"/>
      </v-flex>
   </v-layout>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Exercise from '../components/Exercise.vue'
export default {
  name: 'Session',
  data () {
    return {
      exerciseId: null
    }
  },
  components: { Exercise },
  async mounted () {
    await this.fetchExercisesForSession({ sessionId: this.sessionId })
  },
  computed: {
    ...mapState('exercises', ['exercises']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    sessionId () {
      return parseInt(this.$route.params.id)
    }
  },
  methods: {
    ...mapActions('exercises', ['fetchExercisesForSession']),
    openExercise (id) {
      this.exerciseId = id
    }
  }
}
</script>
