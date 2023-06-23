import firebase_app from "../config";
import { getFirestore, doc, getDoc, connectFirestoreEmulator } from "firebase/firestore";

const db = getFirestore(firebase_app)

export default async function getData(collection, id) {
    let docRef = doc(db, collection, id);
    
    let result = null;
    let error = null;
    
    try {
        const res = await getDoc(docRef);
        if (res.exists()) {
            result = res.data()
        } 
    } catch (e) {
        error = e;
    }

    return { result, error };
}

//const {result, error} = await getData('users', 'user-id')