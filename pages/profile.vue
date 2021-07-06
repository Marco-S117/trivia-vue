<template>
  <div v-if="!!currentUser">
    <v-img
      :lazy-src="currentUser.photoURL"
      :src="currentUser.photoURL"
      :width="200"
      :height="200"
    />
    <p>{{ currentUser.displayName }}</p>
    <p>{{ currentUser.email }}</p>
    <p>Join: {{ currentUser.metadata.creationTime }}</p>
    <p>Providers</p>
    <ul>
      <li v-for="(provider, i) in currentUser.providerData" :key="i">
        {{ provider.providerId }}
      </li>
    </ul>
  </div>
</template>

<script>
import { auth } from '@/plugins/firebase'

export default {
  name: 'ProfilePage',
  data () {
    return {
      currentUser: auth.currentUser
    }
  },
  mounted () {
    if (!this.currentUser) {
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style>

</style>
