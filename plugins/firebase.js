import firebase from 'firebase'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyAZ1ECSZg8greE0yt5Qo-lU1sDsGza2rVQ',
    authDomain: 'trivia-vue-js.firebaseapp.com',
    projectId: 'trivia-vue-js',
    storageBucket: 'trivia-vue-js.appspot.com',
    messagingSenderId: '1015993920944',
    appId: '1:1015993920944:web:c5405fee5e5ca0ac463a75'
  })
}

const auth = firebase.auth()

export { auth }
