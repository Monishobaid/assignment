import { initializeApp } from "firebase/app";
import {getAuth, onAuthStateChanged,setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import router from "../routes";
// import {useUserStore} from '../store/user.ts';

const firebaseConfig = {
  apiKey: "AIzaSyAClD4kdfE8nw05h-r9vd0CNYE8dQ1EYOg",
  authDomain: "shopping-14801.firebaseapp.com",
  projectId: "shopping-14801",
  storageBucket: "shopping-14801.appspot.com",
  messagingSenderId: "110339324069",
  appId: "1:110339324069:web:877847d3cf0219eb03b54c",
  measurementId: "G-V7ETL6D3C0"
};

const app = initializeApp(firebaseConfig);
// const userStore = useUserStore();
const auth = getAuth(app);

setPersistence(auth,browserLocalPersistence);

onAuthStateChanged(auth, async(user) => {
  const currentUser = user;
  if(user){
    console.log('User is signed in',currentUser);
    // userStore.setUser(currentUser);
  }else{
    console.log('User is signed out');
    router.push('/login');
  }
});
export {app, auth};
