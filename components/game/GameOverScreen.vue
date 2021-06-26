<template>
  <div class="gameover-wrapper text-center">
    <h1 class="mb-6">Game Over</h1>
    <v-btn @click="newGame" small class="mx-2">Play Again</v-btn>
  </div>
</template>

<script>
import { gsap } from 'gsap'

export default {
  name: 'GameOverScreen',
  props: {
    score: { type : Number },
    difficulty: { type : String },
    category: { type : String },
    type: { type : String },
    lastQuestionIndex: { type : Number },
    totalQuestions: { type : Number }
  },
  data () {
    return {
      showScoreModal: false
    }
  },
  beforeDestroy () {
    this.tl && this.tl.kill()
  },
  mounted () {
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
    newGame () {
      this.$nuxt.$emit('play-again-button-clicked')
      this.tl.reverse()
    },
    onFormSubmit (variables) {
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .v-text-field__slot input {
  text-align: center !important;
}
</style>
