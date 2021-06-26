<template>
  <v-app class="app-container">
    <app-header />
    <app-drawer />
    <v-main>
      <v-container fill-height>
        <v-row justify="center" align="center">
          <v-col :cols="12" :md="10" :lg="8" :xl="6">
            <nuxt v-if="!$nuxt.$loading.isLoading" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <app-footer />
  </v-app>
</template>

<script>
import AppHeader from '@/components/layouts/Header'
import AppDrawer from '@/components/layouts/Drawer'
import AppFooter from '@/components/layouts/Footer'

export default {
  name: 'DefaultTemplate',
  components: { AppHeader, AppDrawer, AppFooter }
}
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}

.app-container {
  background: $bg-radial-s-to-p !important;
}

main {
  background-color: rgba(230, 230, 230, 0.25);
}

.relative {
  position: relative;
}
</style>
