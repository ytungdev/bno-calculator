import React from "react";
import { dateDiff, monthDiff, dateToISO, addYear } from '../ultility'
import styles from './progressTAble.module.css'
import utilStyles from '../styles/utils.module.css';
import QuotaTable from "./quotaTable";

export default function ProgressTable(props) {
    const [issueDate, setIssueDate] = props.issueDateState
    const [countingDate, setCountingDate] = props.countingDateState
    const [visaType, setVisaType] = props.visaTypeState
    const tripData = props.data

    const issueDateD = new Date(issueDate);
    const countingDateD = new Date(countingDate);
    let visaEndD = new Date(issueDateD.getTime());
    visaEndD.setFullYear(issueDateD.getFullYear() + parseInt(visaType));
    let visaEnd = dateToISO(visaEndD)


    const TableRow = ({ rule, from, to }) => {
        const total = dateDiff(to, from)
        const filled = dateDiff(new Date(), from)
        const frac = Math.ceil(filled / total * 100)
        // console.log(rule, from, to, total, filled, frac)
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

    const ProgressBar = ({value}) => {
        return (
            <div className={styles.container}>
                <div className={styles.progressbar}>
                    <div className={styles.progressMax} style={{ width : `${value}%` }}>
                        <span className={styles.progress}></span>
                    </div>
                </div>
                <div className={styles.counter}>{value}%</div>
            </div>
        )
    }

    return (
        <>
        <div className={utilStyles.card}>
            <table className={styles.table}>
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
                    <TableRow rule="VISA"
                        from={issueDate}
                        to={addYear(issueDate, parseInt(visaType))} />
                    <TableRow rule="ILR" from={countingDate} to={addYear(countingDate, 5)} />
                    <TableRow rule="CITIZENSHIP" from={addYear(countingDate, 5)} to={addYear(countingDate, 6)} />
                </tbody>
                    <QuotaTable
                    countingDateState={props.countingDateState}
                    issueDateState={props.issueDateState}
                    visaTypeState={props.visaTypeState}
                    daysAway0={props.daysAway0}
                    data={tripData} />
            </table>
            </div>
        </>
    )
}


