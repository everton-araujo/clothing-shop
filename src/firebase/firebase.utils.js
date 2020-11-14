import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBOrkyil3zsyTOdtEKa88XVP_z-waJ2CHY",
    authDomain: "clothing-shop-75440.firebaseapp.com",
    databaseURL: "https://clothing-shop-75440.firebaseio.com",
    projectId: "clothing-shop-75440",
    storageBucket: "clothing-shop-75440.appspot.com",
    messagingSenderId: "926607816740",
    appId: "1:926607816740:web:f3e4678091c9b8fdb3c0b1",
    measurementId: "G-BNVH69ZKLK"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snpaShot = await userRef.get();

    if (!snpaShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('Error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().useDeviceLanguage();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
