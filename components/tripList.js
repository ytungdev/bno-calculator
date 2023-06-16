import React from "react";
import utilStyles from '../styles/utils.module.css';
import styles from './tripList.module.css'


import { useAuthContext } from "../hooks/useAuthContext";

import { dateDiff } from "../ultility";

export default function TripList(props) {
    const { user, setUser, tripState, setTripState } = useAuthContext();

    const Header = ({ th, trClass }) => {
        let ths = []
        for (let n in th) {
            ths.push(<th key={n}>{th[n]}</th>)
        }
        return (<thead>
            <tr className={trClass}>
                {ths}
            </tr>
        </thead>)

    }

    const TripRow = ({ renderItem }) => {
        // get data
        const trips = tripState

        //sort data by from_date
        if (trips) {
            trips.sort(function (a, b) {
                let keyA = new Date(a.from_date),
                    keyB = new Date(b.to_date);
                // Compare the 2 dates
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
            //reder
            return (
                <>
                    <tbody>
                        {trips.map((trip) => {
                            return renderItem(trip);
                        })}
                    </tbody>
                </>
            )
        } else {
            return <></>
        }


    }

    if(!user.initiated){
        return(<></>)
    }
    return (
        <>
            <div className={utilStyles.card}>
                <table className={styles.table}>
                    <Header th={['destination', 'from', 'to', 'days']} trClass={styles.tth} />
                    <TripRow
                        renderItem={(trip) =>
                            <tr key={trip.created_at.toString()}>
                                <td>{trip.destination}</td>
                                <td>{trip.from_date}</td>
                                <td>{trip.to_date}</td>
                                <td>{dateDiff(trip.to_date, trip.from_date)}</td>
                            </tr>
                        }
                    />
                </table>
            </div>
        </>
    )


}


