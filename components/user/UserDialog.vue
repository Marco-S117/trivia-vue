<template>
  <v-dialog v-model="dialog" width="350" :persistent="isLoading">
    <v-card :loading="isLoading" :loader-height="4">
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
      isLoading: false,
      showLogin: true
    }
  },
  mounted () {
    this.$nuxt.$on('open-user-dialog', () => { this.dialog = true })
  },
  methods: {
    onGoogleLogin () {
      this.isLoading = true
      auth.signInWithPopup(GoogleProvider)
        .then((newUser) => { this.createNewUserDocument(newUser) })
        .catch((error) => { console.log(error) })
    },
    onLogin (data) {
      this.isLoading = true
      auth.signInWithEmailAndPassword(data.email, data.password)
        .then(() => { this.dialog = false })
        .catch((error) => { console.log(error) })
        .finally(() => { this.isLoading = false })
    },
    onSignup (data) {
      this.isLoading = true
      auth.createUserWithEmailAndPassword(data.email, data.password)
        .then((newUser) => { this.createNewUserDocument(newUser) })
        .catch((error) => { console.log(error) })
    },
    // TO DO: change url after deploy backend ...
    createNewUserDocument (data) {
      this.$axios.post('http://localhost:3000/api/users/create', {
        params: {
          id: data.user.uid,
          email: data.user.email,
          nickname: data.user.displayName
        }
      })
      .then((response) => { this.dialog = false })
      .catch((error) => { console.log('Error:', error) })
      .finally(() => { this.isLoading = false })
    }
  }
}
</script>

<style>

</style>
