import React from "react";
import styles from './trackingTable.module.css'
import utilStyles from '../styles/utils.module.css';

import QuotaTableRows from "./quotaTableRows";
import ProgressTableRows from "./progressTableRows";

import { useAuthContext } from "../hooks/useAuthContext";

export default function TrackingTable(props) {
    const { user, setUser } = useAuthContext()

    const Header = ({ th, trClass }) => {
        let ths = []
        for (let n in th){
            ths.push(<th key={n}>{th[n]}</th>)
        }
        return (<thead>
            <tr className={trClass}>
                { ths }
            </tr>
        </thead>)

    }

    if(!user.initiated){
        return(<></>)
    }

    return (
        <>
            <div className={utilStyles.card}>
                <table className={styles.table}>
                    <Header th={['','start','end','progress','stat']} trClass={styles.pth} />
                    <ProgressTableRows />
                    <Header th={['','start','end','quota','stat']} trClass={styles.qth} />
                    <QuotaTableRows />
                </table>
            </div>
        </>
    )
}


