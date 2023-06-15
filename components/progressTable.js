import React from "react";
import { dateDiff, monthDiff, dateToISO, addYear, addMonths } from '../ultility'
import styles from './progressTAble.module.css'
import utilStyles from '../styles/utils.module.css';
import QuotaTable from "./quotaTableRows";

import { useAuthContext } from "../hooks/useAuthContext";

export default function ProgressTable(props) {
    const { user, setUser } = useAuthContext()
    const issueDate = user.visa.issueDate
    const visaType =  user.visa.type
    const countingDate = user.ilr.countingDate
    const trips = user.trips

    const issueDateD = new Date(issueDate);
    const countingDateD = new Date(countingDate);
    let visaEndD = new Date(issueDateD.getTime());
    visaEndD.setFullYear(issueDateD.getFullYear() + parseInt(visaType));
    let visaEnd = dateToISO(visaEndD)


    const TableRow = ({ rule, from, to }) => {
        const total = dateDiff(to, from)
        const filled = dateDiff(new Date(), from)
        const frac = Math.ceil(filled / total * 100)
        console.log(rule, from, to, total, filled, frac)
        return (
            <tr>
                <td>{rule}</td>
                <td>{dateToISO(from)}</td>
                <td>{dateToISO(to)}</td>
                <td><ProgressBar value={frac.toString()} /></td>
                <td>{filled}/{total}</td>
            </tr>
        )
    }

    const ProgressBar = ({ value }) => {
        return (
            <div className={styles.container}>
                <div className={styles.progressbar}>
                    <div className={styles.progressMax} style={{ width: `${value}%` }}>
                        <span className={styles.progress}></span>
                    </div>
                </div>
                <div className={styles.counter}>{value}%</div>
            </div>
        )
    }

    const ProgressTableRows = () => {
        return (
            <>
                <thead>
                    <tr className={styles.pth}>
                        <th></th>
                        <th>start</th>
                        <th>end</th>
                        <th>progress</th>
                        <th>stat</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        parseInt(visaType) == 5 ?
                        <TableRow rule="VISA" from={issueDate} to={addMonths({date:issueDate, y:5})} />
                        :
                        <TableRow rule="VISA" from={issueDate} to={addMonths({date:issueDate, y:2, m:6})} />
                    }
                    <TableRow rule="ILR" from={countingDate} to={addMonths({date:countingDate, y:5})} />
                    <TableRow rule="CITIZENSHIP" from={addMonths({date:countingDate, y:5})} to={addMonths({date:countingDate, y:6})} />
                </tbody>
            </>
        )
    }

    if(!user.initiated){
        return(<></>)
    }

    return (
        <>
            <div className={utilStyles.card}>
                <table className={styles.table}>
                    <ProgressTableRows />
                    {/* <QuotaTable
                        countingDateState={props.countingDateState}
                        issueDateState={props.issueDateState}
                        visaTypeState={props.visaTypeState}
                        daysAway0={props.daysAway0}
                        data={trips} /> */}
                </table>
            </div>
        </>
    )
}


