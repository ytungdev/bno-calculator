import Head from 'next/head';
import Image from 'next/image';
import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';


import { useAuthContext } from '../hooks/useAuthContext'
import logout from '../firebase/auth/logout';


export const siteTitle = 'Next.js Sample Website';


export default function Layout({ children, home }) {
  const { user, setUser } = useAuthContext();
  // console.log(`layout :`)
  // console.log(user)

  let profile = {
    icon: "/images/profile.jpg",
    username: ' '
  }

  if (user) {
    profile.icon = user.google.photoURL
    profile.username = user.google.displayName
  }

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle,
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image priority
              src={profile.icon}
              className={utilStyles.borderCircle}
              height={96} width={96} alt=""
            />
            <h1 className={utilStyles.heading2Xl}>
              {profile.username}
            </h1>
          </>
        ) : (
          <>
            <Image priority
              src={profile.icon}
              className={utilStyles.borderCircle}
              height={64} width={64} alt=""
            />
            <h2 className={utilStyles.headingLg}>
              {profile.username}
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>

      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
      <section id="signin">
        {(
          user ?
            <input type='button' id="signin-btn" value="Sign-out" onClick={logout} />
            :
            <></>
        )}
      </section>
    </div>

  );
}