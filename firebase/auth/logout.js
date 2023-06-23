import firebase_app from "../config";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function logout(){
    return signOut(auth).then(() => {
        // Sign-out successful.
        setUser(null);
        console.log('logout')
      }).catch((error) => {
        // An error happened.
      });
}
