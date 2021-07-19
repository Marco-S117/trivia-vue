<template>
  <v-dialog v-model="dialog" width="350" :persistent="$nuxt.$loading.isLoading">
    <v-card :loading="$nuxt.$loading.isLoading" :loader-height="4">
      <v-fade-transition mode="out-in">
        <div :key="showLogin">
          <v-card-title
            :key="showLogin"
            v-text="showLogin ? 'Sign In' : 'Sign Up'"
            class="justify-center text-h5"
          />
          <v-card-subtitle class="text-center pt-2">
            <span>{{ showLogin ? 'Do not have an account?' : 'Do you have an account?' }}</span>
            <v-btn
              @click="showLogin = !showLogin"
              v-text="`${ showLogin ? 'Sign Up' : 'Sign In' }`"
              color="secondary"
              text
              x-small
              class="d-inline px-0"
            />
          </v-card-subtitle>
        </div>
      </v-fade-transition>
      <v-card-text class="pa-6">
        <v-fade-transition mode="out-in">
          <login-form v-if="showLogin" @submit="onLogin($event)" />
          <signup-form v-else @submit="onSignup($event)" />
        </v-fade-transition>
      </v-card-text>
      <v-card-actions class="justify-center px-6 pb-4">
        <div class="text-center">
          <h6 class="pb-2">or access with social account</h6>
          <v-btn
            @click="onGoogleLogin()"
            v-text="'Google'"
            color="secondary"
            text
          />
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { auth, GoogleProvider } from '@/plugins/firebase'
import LoginForm from '@/components/user/LoginForm'
import SignupForm from '@/components/user/SignupForm'

export default {
  name: 'UserDialog',
  components: { LoginForm, SignupForm },
  data () {
    return {
      dialog: false,
      showLogin: true
    }
  },
  mounted () {
    this.$nuxt.$on('open-user-dialog', () => { this.dialog = true })
  },
  methods: {
    onGoogleLogin () {
      this.$nuxt.$loading.start()
      auth.signInWithPopup(GoogleProvider)
        .then((newUser) => { this.checkUserExists(newUser.user) })
        .catch((error) => { console.log(error) })
    },
    onLogin (data) {
      this.$nuxt.$loading.start()
      auth.signInWithEmailAndPassword(data.email, data.password)
        .then(() => { this.dialog = false })
        .catch((error) => { console.log(error) })
    },
    onSignup (data) {
      auth.createUserWithEmailAndPassword(data.email, data.password)
        .then((newUser) => { this.checkUserExists(newUser.user) })
        .catch((error) => { console.log(error) })
    },
    checkUserExists (user) {
      this.$axios
        .get(`https://mp-trivia-vue-be.herokuapp.com/api/users/${user.uid}`)
        .then((response) => {
          if (!response.data) {
            this.createNewUserDocument(user)
          } else {
            this.dialog = false
          }
        })
        .catch((error) => {
          console.log('Error:', error)
        })
    },
    createNewUserDocument (data) {
      this.$axios.post('https://mp-trivia-vue-be.herokuapp.com/api/users/create', {
        params: {
          id: data.user.uid,
          email: data.user.email,
          nickname: data.user.displayName
        }
      })
      .then((response) => { this.dialog = false })
      .catch((error) => { console.log('Error:', error) })
    }
  }
}
</script>

<style>

</style>
