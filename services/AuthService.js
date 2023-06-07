import React from 'react';
import { onAuthStateChanged,getAuth} from 'firebase/auth';
import firebase_app from '../firebase/config';

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});
// const UserContext = createContext(null);


export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = React.useState(null);

    React.useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};