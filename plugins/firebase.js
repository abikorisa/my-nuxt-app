import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const config = {
  apiKey: 'AIzaSyC2QVwKpHPRTQy5N83opO6SoQHNg4NmqpQ',
  authDomain: 'my-nuxt-app-1f286.firebaseapp.com',
  projectId: 'my-nuxt-app-1f286',
  storageBucket: 'my-nuxt-app-1f286.appspot.com',
  messagingSenderId: '895144147441',
  appId: '1:895144147441:web:d82c75d2d139b3ac442c50',
}
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
