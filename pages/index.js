import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { getTrips } from '../services/TripService'


export async function getStaticProps() {
    const data = await getTrips();
    const tripData = data
    return {
        props: {
            tripData,
        },
    };
}

export default function Home({ tripData }) {
    return (
        <Layout home>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas faucibus tempus mauris at facilisis. Donec tincidunt eget leo a interdum. Vivamus varius neque eget augue porta, ut ullamcorper risus finibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nunc sed feugiat risus, ac feugiat enim. Nunc sed lorem vitae neque aliquet imperdiet. Aenean congue lorem turpis, sit amet finibus libero viverra et. Aliquam sagittis malesuada libero. Praesent quis varius mi, nec congue libero. Ut non ex quis sem vestibulum ultricies ut non felis. Morbi non enim tempor, fermentum ligula egestas, egestas nisi. Mauris efficitur ligula nec orci laoreet, in lacinia felis euismod. Quisque enim turpis, faucibus in libero et, ornare sollicitudin enim.
                </p>
                <p>
                    Aenean in dui blandit, viverra ex sed, elementum purus. Nunc suscipit sapien id ullamcorper laoreet. Sed a sapien malesuada, pharetra libero id, porta purus. Nunc laoreet ac purus ac ultricies. Pellentesque blandit facilisis.
                </p>
            </section>
            <Link href="/bno/calculator">
                calculator
            </Link>
            <section>
                <h2 className={utilStyles.headingLg}>Trips</h2>
                <ul className={utilStyles.list}>
                    {tripData.map(({ id, action, from, to, destination }) => (
                        <li className={utilStyles.listItem} key={id}>
                            {action}
                            <br />
                            {from} - {to}
                            <br />
                            {destination.country}, {destination.city}
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    );
}