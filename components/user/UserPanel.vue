<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar>
        <v-icon :size="38" color="primary" v-text="'mdi-account-circle'" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="`Hi, ${user && user.email || 'Guest'} 👋🏻`" class="title" />
        <v-slide-x-transition mode="out-in">
          <v-list-item-subtitle
            :key="showToken"
            v-text="(getCookie('mp-trivia-nuxt-session-token-cookie') || 'No session token')"
          />
        </v-slide-x-transition>
      </v-list-item-content>
      <v-list-item-action>
          <!-- v-if="!!getCookie('mp-trivia-nuxt-session-token-cookie')" -->
        <v-btn @click="userLoginLogout" icon>
          <v-icon
            :size="22"
            :color="user ? 'red' : 'primary'"
            v-text="user ? 'mdi-logout' : 'mdi-login'"
          />
        </v-btn>
      </v-list-item-action>
    </v-list-item>
    <v-fade-transition mode="out-in">
      <vue-countdown
        v-if="!!expireDate"
        v-slot="{ hours, minutes, seconds }"
        :transform="transformSlotProps"
        :time="expireDate"
        @end="deleteSessionToken()"
        tag="div"
        class="text-caption text-center px-4"
      >
        <span>Session token expire:</span>
        <span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
      </vue-countdown>
    </v-fade-transition>
  </v-list>
</template>

<script>
import firebase from 'firebase'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { getCookie, deleteCookie } from '@/utils/cookies/ManageCookies'

export default {
  name: 'UserPanel',
  components: { VueCountdown },
  data () {
    return {
      drawer: false,
      showToken: true,
      expireDate: null,
      user: null
    }
  },
  mounted () {
    this.$nuxt.$on('session-token-setted', () => { this.calcTokenExpires() })
    this.calcTokenExpires()
    this.checkUser()
  },
  methods: {
    getCookie,
    deleteCookie,
    checkUser () {
      firebase.auth().onAuthStateChanged(user => { this.user = user })
    },
    userLoginLogout () {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
          .then(() => {
            this.user = null
            console.log('Logut success')
          })
          .catch((error) => { console.log(error) })
      } else {
        firebase.auth().signInWithEmailAndPassword('polino47@gmail.com', '123456789')
          .then((userCredential) => {
            this.user = firebase.auth().currentUser
            console.log('User', firebase.auth().currentUser, 'logged in!')
          })
          .catch((error) => { console.log(error) })
      }
    },
    deleteSessionToken () {
      this.deleteCookie('mp-trivia-nuxt-session-token-cookie')
      this.expireDate = null
      this.showToken = false
      this.$nextTick(() => {
        this.showToken = true
      })
    },
    transformSlotProps(props) {
      const formattedProps = {}
      Object.entries(props).forEach(([key, value]) => {
        formattedProps[key] = value < 10 ? `0${value}` : String(value)
      })
      return formattedProps
    },
    calcTokenExpires () {
      if (!localStorage && !localStorage.tokenExpires) return
      const NOW = new Date().getTime()
      const END = Date.parse(localStorage.tokenExpires)
      const DIFF = END - NOW
      this.expireDate = DIFF
    }
  }
}
</script>

<style>

</style>
