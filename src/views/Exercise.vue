<template>
  <v-row align="center" justify="center">
    <v-col cols="12" md="8">
              <v-card class="elevation-12" v-if="$session.connected">
                <v-toolbar>
                  <v-toolbar-title>Exercise</v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <v-container>
                    <v-row no-gutters>
                      <v-col class="ma-10">
                        <v-text-field label="Title" v-model="title"></v-text-field>
                        <v-textarea label="Instructions" v-model="instructions"></v-textarea>
                        <p class="subtitle-1">Tests</p>
                        <div id="editor1" class="exercise-editor-ace-editor"></div>
                      </v-col>
                      <v-divider inset vertical></v-divider>
                      <v-col class="ma-10">
                        <v-card flat>
                          <v-card-title>
                            Sandbox
                            <v-spacer></v-spacer>
                            <v-btn :loading="loading" :disabled="loading" color="primary" @click="loader = 'loading'">
                              Execute script
                              <v-icon right dark>mdi-play</v-icon>
                            </v-btn>
                          </v-card-title>
                          <v-card-text>
                            <div id="editor2" class="exercise-editor-ace-editor"></div>
                            <v-row no-gutters>
                              <v-col class="ma-5">
                                <p class="subtitle-1">Console</p>
                                <v-textarea filled readonly rows="4" v-model="console"></v-textarea>
                              </v-col>
                              <v-col class="ma-5">
                                <p class="subtitle-1">Tests results : {{testsResultsTitle}}</p>
                                <v-list disabled>
                                  <v-list-item-group v-model="item">
                                    <v-list-item v-for="(item, i) in testsResults" :key="i" color="red">
                                        <v-list-item-content>
                                          <v-list-item-title>{{item.name}} : {{item.status}}</v-list-item-title>
                                        </v-list-item-content>
                                      </v-list-item>
                                  </v-list-item-group>
                              </v-list>
                              </v-col>
                            </v-row>
                          </v-card-text>
                       </v-card>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn v-on:click="Cancel">Cancel</v-btn>
                  <v-btn color="primary" v-on:click="Save">Save</v-btn>
                </v-card-actions>
              </v-card>
              <div v-else>
                <h1>You do not have access to this page</h1>
              </div>
            </v-col>
    </v-row>
</template>
<style>
.exercise-editor-ace-editor {
 position: relative;
 height: 20rem;
}
</style>
<script>
// all the existing imports here
import axios from 'axios'
import router from '../router'
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'

export default {
  name: 'Exercise',
  data: function () {
    return {
      editor1: null,
      editor2: null,
      loader: null,
      loading: false,
      title: this.title,
      instructions: this.instructions,
      console: null,
      testsResults: [],
      item: null,
      testsResultsTitle: ''
    }
  },
  watch: {
    loader () {
      const l = this.loader
      this[l] = !this[l]

      axios
        .post('http://localhost:3000/api/v1/exercise/sandbox',
          {
            lang: 'python',
            tests: this.editor1.getValue(),
            solution: this.editor2.getValue()
          })
        .then(response => {
          this[l] = false
          this.console = response.data.stdout
          var stats = response.data.result.stats
          this.testsResultsTitle = (stats.tests - stats.failures) + '/' + stats.tests
          var tests = response.data.result.tests
          this.testsResults = []
          tests.forEach(element => {
            var status = ''
            if (typeof element.failure !== 'undefined') {
              status = 'failed'
            } else {
              status = 'succeed'
            }
            this.testsResults.push({ status: status, name: element.name })
          })
          console.log(response)
        })
        .catch(error => {
          this[l] = false
          console.log(error.response)
        })

      this.loader = null
    }
  },
  methods: {
    Save: function (event) {
      if (this.$route.query.id === '-1') {
        axios
          .post('http://localhost:3000/api/v1/exercise',
            {
              instructions: this.instructions,
              lang: 'python',
              title: this.title,
              tests: this.editor2.getValue(),
              solution: this.editor1.getValue(),
              template_regions: ['fr'],
              template_regions_rw: [0],
              difficulty: 0,
              score: 0,
              creation_date: new Date()
            })
          .then(response => {
            router.push('Home')
          })
          .catch(error => {
            console.log(error.response)
          })
      } else {
        axios
          .post('http://localhost:3000/api/v1/exercise/' + this.$route.query.id,
            {
              instructions: this.instructions,
              lang: 'python',
              title: this.title,
              tests: this.editor2.getValue(),
              solution: this.editor1.getValue(),
              template_regions: ['fr'],
              template_regions_rw: [0],
              difficulty: 0,
              score: 0,
              creation_date: new Date()
            })
          .then(response => {
            router.push('Home')
          })
          .catch(error => {
            console.log(error.response)
          })
      }
    },
    Cancel: function () {
      router.push({ name: 'Home' })
    }
  },
  mounted () {
    if (this.$session.connected) {
      this.editor1 = ace.edit('editor1')
      this.editor1.setTheme('ace/theme/monokai')
      this.editor1.session.setMode(`ace/mode/${this.lang}`)

      this.editor2 = ace.edit('editor2')
      this.editor2.setTheme('ace/theme/monokai')
      this.editor2.session.setMode(`ace/mode/${this.lang}`)

      if (this.$route.query.id !== '-1') {
        axios.get('http://localhost:3000/api/v1/exercise/' + this.$route.query.id)
          .then((response) => {
            this.title = response.data.title
            this.instructions = response.data.instructions
            this.editor1.setValue(response.data.tests)
            this.editor2.setValue(response.data.solution)
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    }
  }
}
</script>
