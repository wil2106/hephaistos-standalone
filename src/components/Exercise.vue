<template>
    <v-container class="grey lighten-5" fill-height v-if="ex">
        <v-layout row wrap>
            <v-flex xs6 class="pa-md-4">
                <h1>{{ex.title}}</h1>
                <div v-html="ex.instructions"></div>
                <Br/>
                <h1>Votre solution: </h1>
                <div id="editor" class="exercise-editor-ace-editor"></div>
            </v-flex>
            <v-flex xs6 class="pa-md-4">
                <h1>Tests: </h1>
                <v-card class="ma-2" v-for="test in ex.test_names" :key="test">
                    <v-card-text>
                        {{test}}
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'
export default {
  name: 'Exercise',
  props: ['exId', 'sessId'],
  data () {
    return {
      ex: null,
      editor: null
    }
  },
  watch: {
    async exId (val) {
      if (this.exId !== null && this.sessId !== null) {
        await this.fetchExerciseForSession({ exerciseId: this.exId, sessionId: this.sessId })
        this.ex = this.getExerciseById(this.exId)
      }
    }
  },
  computed: {
    ...mapState('exercises', ['exercises']),
    ...mapGetters('exercises', ['getExerciseById'])
  },
  updated () {
    console.log('ace is updated')
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode('ace/mode/javascript')
  },
  methods: {
    ...mapActions('exercises', ['fetchExerciseForSession'])
  }
}
</script>
