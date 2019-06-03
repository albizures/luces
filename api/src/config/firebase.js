const admin = require('firebase-admin')

const serviceAccount = require('../../serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://luces-app.firebaseio.com'
})
