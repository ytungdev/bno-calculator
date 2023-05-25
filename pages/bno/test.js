import React from 'react';
import Link from 'next/link';
import Layout from '../../components/layout';
import TripForm from '../../components/tripForm';
import TripList from '../../components/tripList';
import Gantt from '../../components/gantt';
import ProgressTable from '../../components/progressTable';
import QuotaTable from '../../components/quotaTable';

import { useLocalStorage } from "../../hooks/useLocalStorage";


import utilStyles from '../../styles/utils.module.css';

import { getTrips } from '../../services/TripService'

export async function getStaticProps() {
    const data = await getTrips();
    const tripData = data
    return {
        props: {
            tripData,
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


    return (
        <Layout>
            <h1>5 + 1 calculator</h1>
            <TripForm
                issueDateState={issueDateState}
                enteringDateState={enteringDateState}
                countingDateState={countingDateState}
                visaTypeState={visaTypeState}
                formStepState={formStepState}
                daysAway0={daysAway0}
            />
            <hr />
            <ProgressTable
                countingDateState={countingDateState}
                issueDateState={issueDateState}
                visaTypeState={visaTypeState}
                data={props.tripData} />
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
                        {trip.action}
                        <br />
                        {trip.from} - {trip.to}
                        <br />
                        {trip.destination.country}, {trip.destination.city}
                    </li>
                }
            />
        </Layout>
    );
}