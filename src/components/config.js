import * as app from 'firebase';


const config = {
  apiKey: "AIzaSyBjOLUMeZFMm85dF3XGIgtvnXMIzYv02dg",
  authDomain: "drawmaps-67070.firebaseapp.com",
  databaseURL: "https://drawmaps-67070.firebaseio.com",
  projectId: "drawmaps-67070",
  storageBucket: "drawmaps-67070.appspot.com",
  messagingSenderId: "794338606233"
};

 let firebase;

if (typeof window !== 'undefined') {
   firebase = app.initializeApp(config);
}

export default firebase
