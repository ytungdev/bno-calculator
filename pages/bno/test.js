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



export default function calculatorPage(props) {
    const {user, setUser} = useAuthContext();


    return (
            <Layout>
                <Protected>
                    <h1>Testing</h1>
                    <Gantt />
                    <TripList/>
                </Protected>
            </Layout>
    );
}