<template>
  <div class="gameover-wrapper text-center">
    <h1 class="mb-6">Game Over</h1>
    <div v-if="!scoreWasSend">
      <div v-if="!!currentUser">
        Alredy logged in as {{ currentUser.displayName }}
      </div>
      <div v-else>
        You must be logged in to send score.
      </div>
    </div>
    <div v-else>
      Score sended: {{ scoreWasSend }}
    </div>
    <div class="d-flex align-center justify-center mt-6">
      <v-btn v-if="!!currentUser && !scoreWasSend" @click="sendScore" small class="mx-2">Send Score</v-btn>
      <v-btn @click="newGame" small class="mx-2">Play Again</v-btn>
    </div>
  </div>
</template>

<script>
import { auth } from '@/plugins/firebase'
import { gsap } from 'gsap'

export default {
  name: 'GameOverScreen',
  props: {
    score: { type : Number },
    difficulty: { type : String },
    category: { type : String },
    type: { type : String },
    lastQuestionIndex: { type : Number },
    totalQuestions: { type : Number },
    startTime: { type: Number },
    endTime: { type: Number }
  },
  data () {
    return {
      currentUser: auth.currentUser,
      scoreWasSend: false
    }
  },
  beforeDestroy () {
    this.tl && this.tl.kill()
  },
  mounted () {
    this.$nuxt.$on('set-current-user', (user) => { this.currentUser = user })
    this.createTimeline()
  },
  methods: {
    createTimeline () {
      this.tl = gsap.timeline({
        onReverseComplete: () => { this.$nuxt.$emit('new-game') }
      })
      this.tl.fromTo(
        '.gameover-wrapper',
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, ease: 'slow.inOut' }
      )
    },
    sendScore () {
      this.$axios.post('http://localhost:3000/api/games/create/', {
        params: {
          score: this.score,
          difficulty: this.difficulty,
          category: this.category,
          type: this.type,
          lastQuestionIndex: this.lastQuestionIndex,
          totalQuestions: this.totalQuestions,
          startTime: this.startTime,
          endTime: this.endTime,
          user: auth.currentUser.uid
        }
      })
        .then((response) => {
          if (response.status === 200) {
            this.scoreWasSend = true
          }
        })
        .catch((error) => {
          console.log('Error:', error)
        })
        .finally(() => {
          this.$nuxt.$emit('finish-loading')
        })
    },
    newGame () {
      this.$nuxt.$emit('play-again-button-clicked')
      this.tl.reverse()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-text-field__slot input {
  text-align: center !important;
}
</style>
