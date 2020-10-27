import firebase from "firebase";
import "@firebase/firestore";
const config = {
  apiKey: "AIzaSyD6nd56753WK5hHFO6pV0WYNTcRoGh3hTc",
  authDomain: "shoplist-127cb.firebaseapp.com",
  databaseURL: "https://shoplist-127cb.firebaseio.com",
  projectId: "shoplist-127cb",
  storageBucket: "shoplist-127cb.appspot.com",
  messagingSenderId: "517015541263",
  appId: "1:517015541263:web:d55428c8ff53392d2a757a",
};
class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((err) => {});
      }
    });
  }
  getLists(callback) {
    let ref = this.ref.orderBy("name");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];
      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });
      callback(lists);
    });
  }
  addList = (list) => {
    let ref = this.ref;
    ref.add(list);
  };
  removeList = (list) => {
    let ref = this.ref;
    ref.doc(list.id).delete();
  };
  updateList = (list) => {
    let ref = this.ref;
    ref.doc(list.id).update(list);
  };
  get userId() {
    return firebase.auth().currentUser.uid;
  }
  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
  }
  detatch() {
    this.unsubscribe();
  }
}
export default Fire;
