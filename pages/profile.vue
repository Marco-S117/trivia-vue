<template>
  <v-row v-if="!!currentUser && currentUser.games">
    <v-col :cols="12">
      <h1>Profile</h1>
      <p>Here you can change your nickname and find out your statistics.</p>
    </v-col>
    <v-col :cols="12" :sm="4">
      <v-responsive :aspect-ratio="1">
        <v-avatar size="100%" rounded class="d-block mx-auto">
          <v-img
            v-if="currentUser.photoURL"
            :lazy-src="currentUser.photoURL"
            :src="currentUser.photoURL"
            width="100%"
            height="100%"
          />
          <v-icon v-else size="100%" color="grey darken-4" class="grey lighten-2" v-text="'mdi-account-circle'" />
        </v-avatar>
      </v-responsive>
      <div class="d-flex align-center justify-space-between pt-4">
        <v-btn
          @click="toggleEdit()"
          :disabled="$nuxt.$loading.isLoading"
          :loading="$nuxt.$loading.isLoading"
        >
          <v-icon>{{ !isEditing ? 'mdi-account-edit' : 'mdi-content-save' }}</v-icon>
        </v-btn>
        <v-btn @click="userLogout()" color="red">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-col>
    <v-col v-if="currentUser.data" :cols="12" :sm="8">
      <v-text-field
        v-model="inputModel"
        :rules="[v => !!v]"
        :dense="$vuetify.breakpoint.xsOnly"
        :disabled="!isEditing"
        :loading="$nuxt.$loading.isLoading"
        label="Nickname"
        background-color="grey darken-4"
        color="white"
        hide-details
        solo
      />
      <p class="mt-4">Registration date: {{ new Date(currentUser.metadata.creationTime).toLocaleString() }}</p>
      <!-- <p>Favorite category: {{ currentUser.data.favoriteCategory || 'Play to set' }}</p> -->
      <!-- <p>Favorite mode: {{ currentUser.data.favoriteDifficulty || 'Play to set' }}</p> -->
      <p>Total games: {{ currentUser.data.totalGames }}</p>
      <p>Total corrects {{ currentUser.data.totalCorrects }}</p>
      <p class="mb-0">Total incorrects {{ currentUser.data.totalWrong }}</p>
    </v-col>
    <v-col :cols="12">
      <div v-if="currentUser.games.length">
        <v-simple-table :dense="$vuetify.breakpoint.xsOnly" :fixed-header="true">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Score</th>
                <th class="text-left">Category</th>
                <th class="text-left">Difficulty</th>
                <th class="text-left">Type</th>
                <th class="text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in currentUser.games" :key="i">
                <td>{{ item.score }}/{{ item.totalQuestions }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.difficulty }}</td>
                <td>{{ item.type }}</td>
                <td>{{ gameTimeInMinutes(item.startTime, item.endTime) }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <div v-else>No games played before.</div>
    </v-col>
  </v-row>
</template>

<script>
import { auth } from '@/plugins/firebase'

export default {
  name: 'ProfilePage',
  middleware({ store, redirect }) {
    if (!auth.currentUser) return redirect('/')
  },
  data () {
    return {
      currentUser: auth.currentUser,
      inputModel: null,
      isEditing: false
    }
  },
  mounted () {
    this.loadUserData()
    this.loadUserGamesStatics()
  },
  methods: {
    loadUserData () {
      this.$axios
        .get(`https://mp-trivia-vue-be.herokuapp.com/api/users/${this.currentUser.uid}`)
        .then((response) => {
          this.currentUser = { ...this.currentUser, data: response.data }
          this.inputModel = response.data.nickname
        })
        .catch((error) => { console.log('Error:', error) })
    },
    loadUserGamesStatics () {
      this.$axios
        .get(`https://mp-trivia-vue-be.herokuapp.com/api/users/${this.currentUser.uid}/games`)
        .then((response) => {
          this.currentUser = { ...this.currentUser, games: response.data }
        })
        .catch((error) => { console.log('Error:', error) })
    },
    gameTimeInMinutes (start, end) {
      let seconds = Math.floor((end - start) / 1000)
      let minutes = Math.floor(seconds / 60)
      let hours = Math.floor(minutes / 60)
      let days = Math.floor(hours / 24)

      hours = hours - (days * 24)
      minutes = minutes - (days * 24 *60) - (hours * 60)
      seconds = seconds - (days * 24 *60 * 60) - (hours * 60 * 60) - (minutes * 60)

      return `${(minutes > 0 && minutes < 10) ? 0 : ''}${minutes}:${seconds}`
    },
    toggleEdit () {
      this.isEditing = !this.isEditing
      console.log(this.isEditing);
      if (!this.isEditing && this.inputModel !== this.currentUser.data.nickname) this.updateUserNickname()
    },
    updateUserNickname () {
      this.$axios.post(`https://mp-trivia-vue-be.herokuapp.com/api/users/${this.currentUser.uid}/update`, {
        params: {
          id: auth.currentUser.uid,
          nickname: this.inputModel
        }
      })
        .then((response) => { console.log(response.data) })
        .catch((error) => { console.log('Error:', error) })
    },
    userLogout () {
      this.$router.push({ name: 'index' })
      auth.signOut()
    }
  }
}
</script>

<style>

</style>
