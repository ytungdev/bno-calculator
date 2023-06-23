import React from "react";
import utilStyles from '../styles/utils.module.css';
import styles from './tripList.module.css'


import { useAuthContext } from "../hooks/useAuthContext";

import { HighLxContext } from './layout'

import { dateDiff } from "../ultility";

export default function TripList(props) {
    const { user, setUser, tripState, setTripState } = useAuthContext();
    const { highLx } = React.useContext(HighLxContext);

    let rows = 0
    if (user.ilr.countingDate != user.ilr.enteringDate) {
        rows += 1;
    }
    rows += user.trips.length

    const Header = ({ th, trClass }) => {
        let ths = []
        for (let n in th){
            let res;
            if (thSpan[n] == 1){
                res = <th key={n} width={thWidth[n]}>{th[n]}</th>
            } else {
                res = <th key={n} width={thWidth[n]} colSpan={thSpan[n]}>{th[n]}</th>
            }
            ths.push(res)
        }
        return (<thead>
            <tr className={trClass}>
                { ths }
            </tr>
        </thead>)

    }

    const thSpan = [1,1,1,1,1,1]
    const thWidth = ['25%','15%','15%','20%','15%','15%','5%']

    const PreEnterRow = () => {
        const counting_date = user.ilr.countingDate
        const entering_date = user.ilr.enteringDate
        if (counting_date == entering_date) {
            return <></>
        } else {
            return (
                <tbody>
                    <tr
                        id={`Trip0`}
                        className={highLx.includes(`Trip0`) ? styles.highLx : ""}
                    >
                        <td>Pre-entering</td>
                        <td>-</td>
                        <td>{counting_date}</td>
                        <td>{entering_date}</td>
                        <td>{dateDiff(entering_date, counting_date)}</td>
                        <td><input type="button" value="delete" disabled="disabled" /></td>
                    </tr>
                </tbody>
            )
        }
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
                        {trips.map((trip, idx) => {
                            return renderItem(trip, idx);
                        })}
                    </tbody>
                </>
            )
        } else {
            return <></>
        }
    }

    const doDelete = (e) => {
        console.log(e.target.dataset.tid)
    }

    if (!user.initiated) {
        return (<></>)
    }

    if (rows == 0) {
        return (<></>)
    }

    return (
        <>
            <div className={utilStyles.card}>
                <table className={styles.table}>
                    <Header th={['', 'destination', 'from', 'to', 'days', 'action']} trClass={styles.tth} />
                    <PreEnterRow
                        renderItem={(user) => {
                            <tr
                                id={`Trip0`}
                                className={highLx.includes(`Trip0`) ? styles.highLx : ""}
                            >
                                <td>Pre-entering</td>
                                <td>-</td>
                                <td>{user.ilr.counting_date}</td>
                                <td>{user.ilr.entering_date}</td>
                                <td>{dateDiff(user.ilr.counting_date, user.ilr.entering_date)}</td>
                                <td><input type="button" value="delete" disabled="" /></td>
                            </tr>
                        }}
                    />
                    <TripRow
                        renderItem={(trip, idx) =>
                            <tr key={trip.created_at.toString()}
                                id={`Trip${trip.tid}`}
                                className={highLx.includes(`Trip${trip.tid}`) ? styles.highLx : ""}
                            >
                                <td>Trip {idx+1}</td>
                                <td>{trip.destination}</td>
                                <td>{trip.from_date}</td>
                                <td>{trip.to_date}</td>
                                <td>{dateDiff(trip.to_date, trip.from_date)}</td>
                                <td><input type="button" onClick={doDelete} value="delete" data-tid={idx} /></td>
                            </tr>
                        }
                    />
                </table>
            </div>
        </>
    )


}


