import React from "react";
import styles from './gantt.module.css';
import { monthDiff } from '../ultility'



export default function Gantt(props) {
    const [issueDate, setIssueDate] = props.issueDateState
    const [countingDate, setCountingDate] = props.countingDateState
    const [visaType, setVisaType] = props.visaTypeState
    const tripData = props.data

    const issueDateD = new Date(issueDate);
    const countingDateD = new Date(countingDate);
    let visaEndD = new Date(issueDateD.getTime());
    visaEndD.setFullYear(issueDateD.getFullYear() + parseInt(visaType));


    let calendar = {}

    let awayMonth = {}

    const aparseData = (data) => {
        data.forEach((trip)=>{
            console.log(trip)
            let fromD = new Date(trip.from)
            let toD = new Date(trip.to)
            let fy = fromD.getFullYear()
            let fm = fromD.getMonth() + 1
            let ty = toD.getFullYear()
            let tm = toD.getMonth() + 1
            
            console.log(fy,fm,ty,tm)
            console.log((ty + tm - fy - fm))
            while ((ty + tm - fy - fm) >= 0){
                calendar[fy] = {}
                console.log(`iter : ${fy} - ${fm}`)
                if (fm >= 13){
                    fm = 1
                    fy++
                }
                calendar[fy][fm] = 1
                fm++
            }
        })
    }

    const parseData = (data) => {
        data.forEach((trip)=>{
            let fromD = new Date(trip.from)
            let toD = new Date(trip.to)
            let fy = fromD.getFullYear()
            let fm = fromD.getMonth() + 1
            let ty = toD.getFullYear()
            let tm = toD.getMonth() + 1
            const span = monthDiff(fromD, toD)
            awayMonth.month = span
        })
    }
    parseData(tripData)
    // console.log(calendar)
    // console.log(awayMonth)

    const settings = {
        // user input
        visaStart: {
            year: issueDateD.getFullYear(),
            month: issueDateD.getMonth() + 1,
        },
        visaEnd: {
            year: visaEndD.getFullYear(),
            month: visaEndD.getMonth() + 1,
        },
        // // draw gannt
        // start : {
        //     year : fromDate.getFullYear(),
        //     month : fromDate.getMonth()+1,
        // },
        // end : {
        //     year : endDate.getFullYear(),
        //     month : endDate.getMonth()+1,
        // },
        span: {
            month: monthDiff(issueDateD, visaEndD)
        }
    }

    // console.table(settings);

    const HeaderRow = () => {
        let monNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let headers = []
        let lines = []
        monNames.forEach((mo) => {
            headers.push(<span key={mo}>{mo}</span>)
            lines.push(<span key={mo}></span>)
        })
        return (
            <>
                <div className={`${styles.chartRow} ${styles.headerRow}`} style={gridTemplateColumns}>
                    <div className={`${styles.headerCol}`}>[]</div>
                    {headers}
                </div >
                <div className={`${styles.chartRow} ${styles.chartLines}`} style={gridTemplateColumns}>
                    {lines}
                </div >
            </>
        )
    }

    const YearRow = ({year}) => {
        
        return (
            <>
                <div className={`${styles.chartRow}`} style={gridTemplateColumns}>
                    <div className={`${styles.headerCol}`}>{year}</div>
                    <div className={styles.chartBars}>
                        <div className={styles.chartBar}>Trip 1</div>
                    </div>    
                </div >
            </>
        )

    }

    const GanttBody = () => {
        

    }

    const gridTemplateColumns = {
        // gridTemplateColumns: `50px repeat(${settings.span.month}, 1fr)`
        gridTemplateColumns: `80px repeat(12, 1fr)`
    }


    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.chart}`}>
                    <HeaderRow />
                    <YearRow year={2022}/>
                    <div className={`${styles.chartRow}`}>
                        < div className={`${styles.headerCol}`}>2</div>
                        < ul className={`${styles.chartBars}`} style={gridTemplateColumns}>
                            < li className={`${styles.chartBar}`} style={{ gridColumn: "2 / 4" }}>trip 4</li>
                        </ul >
                    </div >
                    <div className={`${styles.chartRow}`}>
                        < div className={`${styles.headerCol}`}>3</div>
                        < ul className={`${styles.chartBars}`} style={gridTemplateColumns}>
                            < li className={`${styles.chartBar}`} style={{ gridColumn: "2 / 4" }}>trip 4</li>
                        </ul >
                    </div >
                </div >
            </div >
        </>
    )
}


