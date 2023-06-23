import firebase_app from "../config";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import addData from "../db/addData";

const auth = getAuth(firebase_app);
const provider = new GoogleAuthProvider();



export default async function login() {
    return signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...

            //register user in DB
            addData('users', user.uid, {
                initiated: false,
                name: user.displayName,
                email:user.email,
                phone:user.phoneNumber,
                photo:user.photoURL
            })

        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });
}




