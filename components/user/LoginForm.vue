<template>
  <v-form
    v-model="form.isValid"
    @submit.prevent="$emit('submit', { email: form.email, password: form.password })"
  >
    <v-text-field
      v-model="form.email"
      :rules="[
        (v) => !!v || 'E-mail is required',
        (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ]"
      :dense="$vuetify.breakpoint.xsOnly"
      type="email"
      label="Email"
      autocomplete="current-email"
      background-color="grey darken-3"
      color="white"
      solo
    />
    <v-text-field
      v-model="form.password"
      :rules="[
        v => !!v || 'Passowrd is required'
      ]"
      :dense="$vuetify.breakpoint.xsOnly"
      type="password"
      label="Password"
      autocomplete="current-password"
      background-color="grey darken-3"
      color="white"
      solo
    />
    <v-btn
      :dense="$vuetify.breakpoint.xsOnly"
      :disabled="!form.isValid"
      v-text="'Send'"
      color="primary"
      type="submit"
      block
    />
  </v-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data () {
    return {
      form: {
        isValid: false,
        email: null,
        password: null
      }
    }
  }
}
</script>
