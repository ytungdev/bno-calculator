import React from 'react';
import Layout from '../../components/layout';
import TripList from '../../components/tripList';
import Gantt from '../../components/gantt';
import Protected from '../../components/protected';

import { useLocalStorage } from "../../hooks/useLocalStorage";

import utilStyles from '../../styles/utils.module.css';

import { getTrips } from '../../services/TripService'
import { useAuthContext } from '../../hooks/useAuthContext';

import addData from '../../firebase/db/addData';
import getData from '../../firebase/db/getData';



export async function getStaticProps() {
    const {result, error} = await getData('users', 'user-id')
    const tripData = result.trips

    return {
        props: {
            tripData
        },
    };
}

export default function calculatorPage(props) {
    const issueDateState = useLocalStorage('issueDate', '')
    const enteringDateState = useLocalStorage('enteringDate', '')
    const countingDateState = useLocalStorage('issueDate', '')
    const visaTypeState = useLocalStorage('visaType', '')
    const formStepState = useLocalStorage('formStep', 0)
    const daysAway0 = useLocalStorage('daysAway0', 0)

    const {user, data:udata} = useAuthContext();

    console.log('data:')
    console.log(udata)

    const doAddData = async () => {
        const data = {
            name: 'John snow',
            house: 'Stark'
          }
          const { result, error } = await addData('users', user.uid, data)
          if (error) {
            console.log('error')
            return console.log(error)
          }
          if (result){
            console.log('result:')
            return console.log(result)
          }
    }

    
    return (
            <Layout>
                <Protected>
                    <h1>Testing</h1>
                    <input type="button" onClick={doAddData} />
                    <Gantt
                        from={'2022-01-01'}
                        to={'2028-12-31'}
                        countingDateState={countingDateState}
                        issueDateState={issueDateState}
                        visaTypeState={visaTypeState}
                        data={props.tripData}
                    />
                    <TripList
                        items={props.tripData}
                        renderItem={(trip) =>
                            <li className={utilStyles.listItem} key={trip.id}>
                                {trip.from} - {trip.to}
                                <br />
                                {trip.destination}
                            </li>
                        }
                    />
                </Protected>
            </Layout>
    );
}