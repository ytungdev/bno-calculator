import React from "react";
import { dateDiff, dateToISO, addMonths } from '../ultility'

import ProgressBar from "./progressBar";


import { useAuthContext } from "../hooks/useAuthContext";

export default function ProgressTableRows(props) {
    const { user, setUser } = useAuthContext()
    const visaType =  user.visa.type
    const issueDate = user.visa.issueDate
    const countingDate = user.ilr.countingDate

    const TableRow = ({ rule, from, to }) => {
        const total = dateDiff(to, from)
        const filled = dateDiff(new Date(), from)
        const frac = Math.ceil(filled / total * 100)
        // console.log(rule, from, to, total, filled, frac)
        return (
            <tr>
                <td colSpan={2}>{rule}</td>
                <td>{dateToISO(from)}</td>
                <td>{dateToISO(to)}</td>
                <td><ProgressBar value={frac.toString()} color='green'/></td>
                <td align="center">{filled}/{total}</td>
            </tr>
        )
    }

    
    return (
        <>
            <tbody>
                {
                    parseInt(visaType) == 5 ?
                    <TableRow rule="VISA" from={issueDate} to={addMonths({date:issueDate, y:5})} />
                    :
                    <TableRow rule="VISA" from={issueDate} to={addMonths({date:issueDate, y:2, m:6})} />
                }
                <TableRow rule="ILR - Cond. 1" from={countingDate} to={addMonths({date:countingDate, y:5})} />
                <TableRow rule="CITIZENSHIP" from={addMonths({date:countingDate, y:5})} to={addMonths({date:countingDate, y:6})} />
            </tbody>
        </>
    )
    
}


