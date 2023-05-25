import React from "react";
import { dateDiff, monthDiff, dateToISO, addYear, overlapDays } from '../ultility'
import styles from './quotaTable.module.css'
import utilStyles from '../styles/utils.module.css';

import ProgressBar from "./progressBar";

export default function QuotaTable(props) {
    const [issueDate, setIssueDate] = props.issueDateState
    const [countingDate, setCountingDate] = props.countingDateState
    const [visaType, setVisaType] = props.visaTypeState
    const tripData = props.data

    const issueDateD = new Date(issueDate);
    const countingDateD = new Date(countingDate);
    let visaEndD = new Date(issueDateD.getTime());
    visaEndD.setFullYear(issueDateD.getFullYear() + parseInt(visaType));
    let visaEnd = dateToISO(visaEndD)

    function format(data) {
        let tripDates = []
        data.forEach(trip => {
            tripDates.push({ from: trip.from, to: trip.to })
        });
        return tripDates
    }
    let tripDates = format(tripData)
    // console.log(tripDates)

    const TableRow = ({ rule, iter, quota, from }) => {
        let result = []
        for (let i = 0; i < iter; i++) {
            const fromD = new Date(addYear(from, i))
            const toD = new Date(addYear(from, i + 1))
            const total = quota
            let filled = 0

            tripDates.forEach(range => {
                const b1 = fromD,
                    b2 = toD,
                    t1 = new Date(range.from),
                    t2 = new Date(range.to)
                // console.log(`${b1}\n${b2}\n${t1}\n${t2}`)
                let overlap = overlapDays(b1, b2, t1, t2)
                // console.log(overlap)
                filled += overlap

            });

            const frac = Math.ceil(filled / total * 100)
            // console.log(total, filled, frac)


            result.push(
                <tr key={i}>
                    <td>{rule}{iter > 1 ? `: yr${i + 1}` : ''}</td>
                    <td>{dateToISO(fromD)}</td>
                    <td>{dateToISO(toD)}</td>
                    <td><ProgressBar value={frac.toString()} color="red" /></td>
                    <td>{filled}/{total}</td>
                </tr>
            )
        }
        return result
    }

    return (
        <>
            <thead>
                <tr className={styles.qth}>
                    <th></th>
                    <th>start</th>
                    <th>end</th>
                    <th>quota</th>
                    <th>stat</th>
                </tr>
            </thead>
            <tbody>
                <TableRow rule="ILR-ROLLING" iter="5" quota="180" from={countingDate} />
                {/* <TableRow rule="Citizenship-1Y" iter="1" quota="90" from={addYear(countingDate, 5)} />
                        <TableRow rule="Citizenship-5Y" iter="1" quota="450" from={countingDate} /> */}
            </tbody>
        </>
    )
}


