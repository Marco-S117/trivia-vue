<template>
  <v-list>
    <v-list-item>
      <v-list-item-avatar>
        <v-icon :size="38" color="primary" v-text="'mdi-account-circle'" />
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title v-text="`Hi, ${user && (user.displayName || user.email) || 'Guest'} 👋🏻`" class="title" />
        <v-list-item-subtitle>
          <v-fade-transition mode="out-in">
            <vue-countdown
              v-if="!!expireDate"
              v-slot="{ hours, minutes, seconds }"
              :transform="transformSlotProps"
              :time="expireDate"
              @end="deleteSessionToken()"
              tag="div"
              class="text-caption"
            >
              <span>Session expire:</span>
              <span>{{ hours }}:{{ minutes }}:{{ seconds }}</span>
            </vue-countdown>
            <span v-else>No session token</span>
          </v-fade-transition>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn @click="!!user ? userLogout() : openLoginDialog()" icon>
          <v-icon
            :size="22"
            :color="!!user ? 'red' : 'primary'"
            v-text="!!user ? 'mdi-logout' : 'mdi-login'"
          />
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>
import { auth } from '@/plugins/firebase'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { getCookie, deleteCookie } from '@/utils/cookies/ManageCookies'

export default {
  name: 'UserPanel',
  components: { VueCountdown },
  data () {
    return {
      showToken: true,
      expireDate: null,
      user: null
    }
  },
  mounted () {
    auth.onAuthStateChanged(user => { this.user = user })
    this.$nuxt.$on('session-token-setted', () => { this.calcTokenExpires() })
    this.calcTokenExpires()
  },
  methods: {
    getCookie,
    deleteCookie,
    userLogout () {
      auth.signOut().then(() => {
        this.user = null
        this.deleteSessionToken()
      }).catch((error) => { console.log(error) })
    },
    openLoginDialog () {
      this.$nuxt.$emit('close-drawer')
      this.$nuxt.$emit('open-user-dialog')
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
