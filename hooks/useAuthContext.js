import React from 'react';
import { onAuthStateChanged,getAuth} from 'firebase/auth';
import firebase_app from '../firebase/config';
import getData from '../firebase/db/getData';

import AppUser from '../model/appUser';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext();

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null);
    const [tripState,  setTripState] = React.useState([])
    const [loading, setLoading] = React.useState(true);
    let appUser;

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (guser) => {
            if (guser) {
                appUser = new AppUser(guser)
                const {result, error} = await appUser.fetch()
                //destructure AppUser class for setState
                setUser({...appUser});
                setTripState([...appUser.trips])
            } else {
                setUser(null);
                setTripState(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    
    return (
        <AuthContext.Provider value={{ user, setUser, tripState, setTripState }}>
            { loading ? <>Loading...</> :children }
        </AuthContext.Provider>
    );
};