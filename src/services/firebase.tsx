import firebase from 'firebase'
require('firebase/auth')

function Firebase () {
  firebase.initializeApp({
    apiKey: 'AIzaSyD1vUhLwgGAgY-IsqzeEJrYsot0glmWBk4',
    authDomain: 'event-booking.firebaseapp.com',
    databaseURL: 'https://event-booking.firebaseio.com',
    messagingSenderId: '172895911972',
    projectId: 'event-booking',
    storageBucket: 'event-booking.appspot.com'
  })

  const auth = firebase.auth()

  return {
    auth: (): firebase.auth.Auth => auth
  }
}

export default Firebase()
