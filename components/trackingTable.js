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

    if(!user.initiated){
        return(<></>)
    }

    const thSpan = [2,1,1,1,1,1]
    const thWidth = ['25%','15%','15%','20%','15%','15%','5%']

    return (
        <>
            <div className={utilStyles.card}>
                <table className={styles.table}>
                    <Header th={['','start','end','quota','stat', 'action']} trClass={styles.qth} />
                    <QuotaTableRows />
                    <Header th={['', 'start','end','progress','stat', 'action']} trClass={styles.pth} />
                    <ProgressTableRows />
                </table>
            </div>
        </>
    )
}


