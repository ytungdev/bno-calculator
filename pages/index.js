import Head from 'next/head';
import Link from 'next/link';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useAuthContext } from '../hooks/useAuthContext';
import signIn from '../firebase/auth/login';


export default function Home({ tripData }) {
    const { user } = useAuthContext()
    return (
        <>
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
                <hr />
                <section className={utilStyles.headingMd}>
                    <h3>Nomenclature</h3>
                    <p>
                        This web application only focus on some of the conditions for ILR/Citizenship, and for simplicity, we will use the following <i><u>codes</u></i> to reference certain conditions:
                    </p>
                    <ul>
                        <li><b><i>ILR - Cond. 1</i></b> : You can apply for ILR if you’ve spent 5 continuous years in the UK<sup><a href="#ILR-1">[Ref]</a></sup></li>
                        <li><b><i>ILR - Cond. 2</i></b> : You must have spent no more than 180 days outside the UK in any 12 month period.<sup><a href="#ILR-2">[Ref]</a></sup></li>
                        <li><b><i>BC - Cond. 1</i></b> : You can apply for citizenship if you’ve lived in the UK for 5 years and have had ILR for 12 months<sup><a href="#CITI-1">[Ref]</a></sup></li>
                        <li><b><i>BC - Cond. 2</i></b> : You should not have spent more than 450 days outside the UK during the 5 years before your application.<sup><a href="#CITI-2">[Ref]</a></sup></li>
                        <li><b><i>BC - Cond. 3</i></b> : You should not have spent more than 90 days outside the UK in the last 12 months.<sup><a href="#CITI-3">[Ref]</a></sup></li>
                    </ul>
                    <hr />
                    <h3>Special Calculations</h3>
                    <ul>
                        <li>Only whole day absence is counted. <a target="_blank" href="https://www.gov.uk/government/publications/continuous-residence/continuous-residence-guidance-accessible-version#count-whole-days-1200-am-to-1200-pm"><sup>[Source]</sup></a></li>
                        <ul>
                            <li><i><u>Case 1</u></i> : Peter left the UK at 08:00 on 1<sup>st</sup> January 2023 and returned at 21:00 on 2<sup>nd</sup> January 2023.
                                <br />
                                As he is not absent for a full day (i.e. 24 hours) on both days, 0 day is counted as absence.
                            </li>
                            <li><i><u>Case 2</u></i> : Peter left the UK at 08:00 on 1<sup>st</sup> January 2023 and returned at 21:00 on 3<sup>rd</sup> January 2023.
                                <br />
                                He is not absent for a full day (i.e. 24 hours) in day 1 and day 3, but he is absented from the UK for a full day (i.e. 24 hours) on day 2, therefore 1 day is counted as absence.
                            </li>
                        </ul>
                        <li>The starting day of continuous residence is counted from one of the followings:
                            <ul>
                                <li><i><u>If entered the UK <b>within</b> 180 days after issuing of visa</u></i> :  the date of issue of the BN(O) visa.
                                    <sup>
                                        <a target="_blank" href="https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-continuous-residence#calculating-the-continuous-residence-period">
                                            [Source]
                                        </a>
                                    </sup>
                                </li>
                                <li><i><u>If entered the UK 180 days <b>after</b> issuing of visa</u></i> :
                                    the date of entering UK.
                                    <ul>
                                        <li>When absent from the UK for more than 180 days, the counting of '5 continuous years' resets.</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </section >
                <hr />
                <section>
                    <h2>Reference</h2>
                    <div style={{ marginLeft: "20px" }}>
                        <details open>
                            <summary style={{ margin: "1rem auto" }}>
                                <b><u>Indefinite Leave to Remain (ILR)</u></b>
                                <sup>
                                    <a target="_blank" href="https://www.gov.uk/ancestry-visa/indefinite-leave-to-remain#eligibility">
                                        [Source]
                                    </a>
                                </sup>
                            </summary>
                            <ul>
                                <li><b><i>Eligibility</i></b>
                                    <ul>
                                        <li id="ILR-1">You can apply for indefinite leave to remain if you’ve spent 5 continuous years in the UK on an Ancestry visa.</li>
                                        <li id="ILR-2">
                                            In most cases you must have spent no more than 180 days outside the UK in any 12 month period.
                                            <a target="_blank" href="https://www.gov.uk/guidance/immigration-rules/immigration-rules-appendix-continuous-residence#default-id-05326df9-heading-2">
                                                <sup>[note]</sup>
                                            </a>
                                        </li>
                                        <li>You must also prove you:
                                            <ul>
                                                <li>have enough money to support yourself and your dependants</li>
                                                <li>can, and plan to, work in the UK</li>
                                                <li>are still a Commonwealth citizen</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                                <li><b><i>Knowledge of language and life in the UK</i></b>
                                    <ul>
                                        <li>If you’re 18 to 64 you must also book and pass the <a target='_blank' href="https://www.gov.uk/life-in-the-uk-test">life in the UK test</a>.</li>
                                    </ul>
                                </li>
                            </ul>
                        </details>
                        <details open>
                            <summary style={{ margin: "0.5rem auto" }}>
                                <b><u>Citizenship</u></b>
                                <sup>
                                    <a target="_blank" href="https://www.gov.uk/apply-citizenship-indefinite-leave-to-remain">
                                        [Source]
                                    </a>
                                </sup>
                            </summary>
                            <ul>
                                <li><b><i>Eligibility</i></b>
                                    <ul>
                                        <li id="CITI-1">You can apply for citizenship if you’ve lived in the UK for 5 years and have had one of the following for 12 months:
                                            <ul>
                                                <li>indefinite leave to remain in the UK</li>
                                                <li>‘settled status’ (also known as ‘indefinite leave to remain under the EU Settlement Scheme’)</li>
                                                <li>indefinite leave to enter the UK (permission to move to the UK permanently from abroad)</li>
                                            </ul>
                                        </li>
                                        <li>You must also:
                                            <ul>
                                                <li>be over 18</li>
                                                <li>prove you were in the UK exactly 5 years before the day the Home Office receives your application</li>
                                                <li>prove your <a target="_blank" href="https://www.gov.uk/english-language">knowledge of English</a>, Welsh or Scottish Gaelic</li>
                                                <li>have passed the <a target='_blank' href="https://www.gov.uk/life-in-the-uk-test">life in the UK test</a></li>
                                                <li>intend to continue living in the UK</li>
                                                <li>be of good character - read the <a target='_blank' href="https://www.gov.uk/government/publications/form-an-guidance">naturalisation guidance</a></li>
                                            </ul>
                                        </li>
                                    </ul>

                                </li>
                                <li><b><i>Residency requirements</i></b>
                                    <ul>
                                        <li>You must have lived in the UK for at least 5 years before the date of your application. You also should not have broken any UK immigration laws.</li>
                                    </ul>
                                </li>
                                <li><b><i>Time you’ve spent outside the UK</i></b>
                                    <ul>
                                        <li>You should not have:
                                            <ul>
                                                <li id="CITI-2">spent more than 450 days outside the UK during the 5 years before your application</li>
                                                <li id="CITI-3">spent more than 90 days outside the UK in the last 12 months</li>
                                                <li>broken any UK immigration laws (for example living illegally in the UK)</li>
                                            </ul>
                                        </li>
                                        <li>You may have lost your indefinite leave to remain or enter if you’ve been away from the UK for:
                                            <ul>
                                                <li>more than 2 years at any time since you got it (you’ll need to apply for a Returning Resident visa)</li>
                                                <li>more than 5 years if you have settled status</li>
                                                <li>more than 4 years if you are a Swiss citizen, or the family member of a Swiss citizen, and you have settled status</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </details>
                    </div>


                </section>
                <br />
                <br />


                {
                    (
                        user ?
                            <Link href="/bno/calculator">calculator</Link>
                            :
                            <input type='button' id="signin-btn" value="Sign-in" onClick={signIn} />
                    )
                }
            </Layout >
        </>
    );
}