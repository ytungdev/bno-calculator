import { useAuthContext } from '../hooks/useAuthConext'
import signIn from '../firebase/auth/login';


export default function Protected({children}){
    
    const  {user}  = useAuthContext();

    return (
        <>
            {user ? 
            children : 
            <>
                <h1 align="center">Unauthenticated</h1>
                <section id="signin" align="center">
                    <input type='button' id="signin-btn" value="Sign-in" onClick={signIn}/>
                </section>
            </>
            }
        </>
    )
}