import React from 'react';
import Link from 'next/link';

import Layout from '../../components/layout';
import TripForm from '../../components/tripForm';
import TripList from '../../components/tripList';
import Gantt from '../../components/gantt';

import TrackingTable from '../../components/trackingTable';

import utilStyles from '../../styles/utils.module.css';


// auth
import Protected from '../../components/protected';


//db
import addData from '../../firebase/db/addData';
import getData from '../../firebase/db/getData';


import { useAuthContext } from '../../hooks/useAuthContext';


export default function calculatorPage(props) {
    const { user, setUser } = useAuthContext();

    return (
        <Layout>
            <Protected>
                <h1>5 + 1 calculator</h1>
                <TripForm />
                <hr />
                <TripList />
                <hr />
                <TrackingTable />
            </Protected>
        </Layout>
    );
}