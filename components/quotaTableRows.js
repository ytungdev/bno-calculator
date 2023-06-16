import React from "react";
import { dateDiff, monthDiff, dateToISO, overlapDays, addMonths } from '../ultility'

import { useAuthContext } from "../hooks/useAuthContext";

import ProgressBar from "./progressBar";

export default function QuotaTableRows(props) {
    const { user, setUser } = useAuthContext()
    const countingDate = user.ilr.countingDate
    const trips = user.trips

    function format(data) {
        let tripDates = []
        tripDates.push({from:user.ilr.countingDate, to:user.ilr.enteringDate})
        data.forEach(trip => {
            tripDates.push({ from: trip.from_date, to: trip.to_date })
        });
        return tripDates
    }
    let tripDates = format(trips)
    // console.log(tripDates)

    const TableRow = ({ rule, iter, quota, from, span=1 }) => {
        let result = []
        for (let i = 0; i < iter; i++) {
            const fromD = new Date(addMonths({date:from, y:i}))
            const toD = new Date(addMonths({date:from, y:i + span}))
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

            let th;
            if (i==0){
                th = <td rowSpan={iter}>{rule}</td>
            } else {
                th = ''
            }

            result.push(
                <tr key={i}>
                    {/* <td>{rule}{iter > 1 ? `: yr${i + 1}` : ''}</td> */}
                    {th}
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
            <tbody>
                <TableRow rule="ILR-ROLLING" iter="5" quota="180" from={countingDate} />
                <TableRow rule="Citizenship-1Y" iter="1" quota="90" from={addMonths({date:countingDate, y:5})} />
                <TableRow rule="Citizenship-5Y" iter="1" quota="450" from={countingDate} span={5}/>
            </tbody>
        </>
    )
}


