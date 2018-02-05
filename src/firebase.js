import Firebase from 'firebase'
   
let config = {
    apiKey: "AIzaSyCN_JQcGwvCVh5mUBOno_YCR_BONey08Fs",
    authDomain: "vuejs-http-aa65e",
    databaseURL: "https://vuejs-http-aa65e.firebaseio.com/",
    storageBucket: "vuejs-http-aa65e.appspot.com",
    messagingSenderId: "444555911896"
};
let app = Firebase.initializeApp(config)
let db = app.database()
let booksRef = db.ref('books')
