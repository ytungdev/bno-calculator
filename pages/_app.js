import '../styles/globals.css'

import { AuthContextProvider } from "../hooks/useAuthContext";


function MyApp({ Component, pageProps }) {
  return (<AuthContextProvider>
    <Component {...pageProps} />
  </AuthContextProvider>)
}

export default MyApp
