import firebase from 'firebase/app'
import 'firebase/firestore'

if (!firebase.apps.length) {
    const config = {
        apiKey: 'AIzaSyD2BaQvmv1ynauXPeys-6vTJzWijtb5TRU',
        authDomain: 'magnifico-ca7b1.firebaseapp.com',
        databaseURL: 'https://magnifico-ca7b1.firebaseio.com',
        projectId: 'magnifico-ca7b1',
        storageBucket: 'magnifico-ca7b1.appspot.com',
        // messagingSenderId: '<replace this>'
    }
    firebase.initializeApp(config)
    firebase.firestore().settings({})
}
const fireDb = firebase.firestore()

export {fireDb}
