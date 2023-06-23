import React from "react";
import { dateDiff, monthDiff, dateToISO, overlapDays, addMonths } from '../ultility'

import { useAuthContext } from "../hooks/useAuthContext";
import { HighLxContext } from "./layout";

import ProgressBar from "./progressBar";

export default function QuotaTableRows(props) {
    const {highLx, setHighLx} = React.useContext(HighLxContext);

    const { user, setUser } = useAuthContext()
    const countingDate = user.ilr.countingDate

    function parse(data) {
        let testDates = []
        
        const counting_date = user.ilr.countingDate
        const entering_date = user.ilr.enteringDate
        if (counting_date != entering_date) {
            testDates.push({ tid:"0",from_date: counting_date, to_date: entering_date })
        }
        data.forEach(trip => {
            testDates.push({ tid:trip.tid, from_date: trip.from_date, to_date: trip.to_date })
        });
        return testDates
    }
    let testDates = parse(user.trips)
    // console.log(testDates)

    const TableRow = ({ name, sub=null, quota, from, to }) => {
        const fromD = new Date(from)
        const toD = new Date(to)
        let accum = 0
        let overlap = []

        testDates.forEach(trip => {
            const b1 = fromD,
                b2 = toD,
                t1 = new Date(trip.from_date),
                t2 = new Date(trip.to_date)
            // console.log(`${b1}\n${b2}\n${t1}\n${t2}`)
            let overlaps = overlapDays(b1, b2, t1, t2)
            if (overlaps>0){
                overlap.push(`Trip${trip.tid}`)
            }
            accum += overlaps
        });

        const frac = Math.ceil(accum / quota * 100)
        // console.log(total, filled, frac)

        let nameTd;
        if (sub == null){
            nameTd  = (<td colSpan={2}>{name}</td>)
        } else {
            nameTd = (<><td>{name}</td><td>{sub}</td></>)
        }
        
        return (<>
            <tr>
                {nameTd}
                <td>{dateToISO(fromD)}</td>
                <td>{dateToISO(toD)}</td>
                <td><ProgressBar value={frac.toString()} color="red" /></td>
                <td align="center">{accum}/{quota}</td>
                <td align="center">
                    <input type="button" onClick={() => setHighLx(overlap)} value="Show"/>
                </td>
            </tr>
        </>)
    }

    let subRow = [
        {sub:"yr 1", quota:180, from: countingDate, to:addMonths({ date: countingDate, y: 1 })},
    ]

    for (let i=1; i<5;i++){
        const entry = {
            sub:`yr ${i+1}`, 
            quota:180, 
            from: addMonths({ date: countingDate, y: i }), 
            to:addMonths({ date: countingDate, y: i+1 })
        }
        subRow.push(entry)
    }
    console.log(subRow)
    console.log(testDates)

    const TableMultiRow = ({ rule, iter, quota, from, span = 1 }) => {
        let result = []
        for (let i = 0; i < iter; i++) {
            const fromD = new Date(addMonths({ date: from, y: i }))
            const toD = new Date(addMonths({ date: from, y: i + span }))
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
            if (i == 0) {
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
                {/* <TableRow rule="ILR - Cond. 2" iter="5" quota="180" from={countingDate} /> */}
                <TableRow
                    name="BC - Cond.2"
                    quota="450"
                    from={addMonths({ date: countingDate, y: 1 })}
                    to={addMonths({ date: countingDate, y: 6 })}
                />
                <TableRow
                    name="BC - Cond.3"
                    quota="90"
                    from={addMonths({ date: countingDate, y: 5 })}
                    to={addMonths({ date: countingDate, y: 6 })}
                />
            </tbody>
        </>
    )
}


