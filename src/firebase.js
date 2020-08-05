import * as firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA1-nO5wgMmexDlkqEDMJGiTOXuLwTUZp8",
    authDomain: "nba-full-6bba5.firebaseapp.com",
    databaseURL: "https://nba-full-6bba5.firebaseio.com",
    projectId: "nba-full-6bba5",
    storageBucket: "nba-full-6bba5.appspot.com",
    messagingSenderId: "1005510413546",
    appId: "1:1005510413546:web:86c14f408362dfa85d1b93",
    measurementId: "G-JCSKLJZZW4"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];
    snapshot.forEach((childSnapshot)=>{
        data.push({
            ...childSnapshot.val(),
            id: childSnapshot.key,
        })
    });
    return data;
}

export {
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseVideos,
    firebaseTeams,
    firebaseLooper,
}