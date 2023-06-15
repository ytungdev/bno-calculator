import React from 'react';
import Link from 'next/link';

import Layout from '../../components/layout';
import TripForm from '../../components/tripForm';
import TripList from '../../components/tripList';
import Gantt from '../../components/gantt';
import ProgressTable from '../../components/progressTable';
import QuotaTable from '../../components/quotaTableRows';

import utilStyles from '../../styles/utils.module.css';

import { useLocalStorage } from "../../hooks/useLocalStorage";

// auth
import Protected from '../../components/protected';


//db
import addData from '../../firebase/db/addData';
import getData from '../../firebase/db/getData';


import { useAuthContext } from '../../hooks/useAuthContext';

import AppUser from '../../model/appUser';

import { getTrips } from '../../services/TripService'


export default function calculatorPage(props) {
    const { user, setUser } = useAuthContext();

    return (
        <Layout>
            <Protected>
                <h1>5 + 1 calculator</h1>
                <TripForm />
                <hr />
                <ProgressTable />

                {/* <TripList
                    items={props.tripData}
                    renderItem={(trip) =>
                        <div key={trip.id}>
                            <p className={utilStyles.listItem}>
                                {trip.from_date} - {trip.to_date}
                                <br />
                                {trip.destination}
                            </p>
                        </div>

                    }
                /> */}
            </Protected>
        </Layout>
    );
}