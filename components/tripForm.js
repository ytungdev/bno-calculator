import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { dateDiff } from "../ultility";
import styles from './tripForm.module.css'
import utilStyles from '../styles/utils.module.css';
import Trip from "../model/trip";

import AppUser from "../model/appUser";
import { useAuthContext } from "../hooks/useAuthContext";

import addData from "../firebase/db/addData";

export default function TripForm(props) {
    const { user, setUser, tripState, setTripState } = useAuthContext()
    // console.log(user)

    //initForm
    const enteringDateRef = React.useRef();
    const issueDateRef = React.useRef();
    const countingDateRef = React.useRef();
    const visaTypeRef = React.useRef();

    //tripForm
    const tripDestinationRef = React.useRef();
    const tripFromDateRef = React.useRef();
    const tripToDateRef = React.useRef();

    function handleInitSubmit(e) {
        e.preventDefault();
        const newVisaType = visaTypeRef.current.value
        const newIssueDate = issueDateRef.current.value
        const newEnteringDate = enteringDateRef.current.value
        
        const appUser = new AppUser(user)
        appUser.addMeta(newVisaType, newIssueDate, newEnteringDate)
        
        let diff = dateDiff(newEnteringDate, newIssueDate)
        let newCountingDate;
        if (diff >= 180) {
            newCountingDate = newEnteringDate;
        } else {
            newCountingDate = newIssueDate;
        }
        setUser({
            ...user,
            initiated : true,
            visa : {
                type        : newVisaType,
                issueDate   : newIssueDate,
            },
            ilr  :{
                enteringDate    : newEnteringDate,
                countingDate    : newCountingDate,
                preEnteringDays : diff,
            }
        })
    }

    function handleTripSubmit(e) {
        e.preventDefault();
        const newDestination = tripDestinationRef.current.value
        const newFromDate = tripFromDateRef.current.value
        const newToDate = tripToDateRef.current.value
        const appUser = new AppUser(user)
        appUser.addTrip(newDestination,newFromDate,newToDate)
        // window.location.reload();
        setTripState([
            ...tripState,
            {
                destination:newDestination,
                from_date:newFromDate,
                to_date:newToDate,
                created_at:new Date()
            }
        ])
    }

    const Summary = () => {
        return (
            <>
                <label htmlFor="counting">
                    <span className={styles.labelSpan}>Counting date : </span>
                    <input type="date" name="counting"
                        ref={countingDateRef}
                        defaultValue={user.ilr.countingDate}
                        disabled={true}
                    />
                </label>
                <br />
                <span>
                    <span className={styles.labelSpan}>Days away : </span>
                    <input type="number" name="preEnter"
                        defaultValue={user.ilr.preEnteringDays}
                        disabled={true}
                    />
                </span>
                <br />
            </>
        )
    }

    const InitForm = () => {
        return (
            <form method="post" onSubmit={handleInitSubmit}>
                <label htmlFor="type">
                    <span className={styles.labelSpan}>Visa type : </span>
                    <select name="type" defaultValue={user.visa.type} ref={visaTypeRef}>
                        <option>----</option>
                        <option value="5">5 years</option>
                        <option value="2.5">2 years and 6 months</option>
                    </select>
                </label>
                <br />
                <label htmlFor="issue">
                    <span className={styles.labelSpan}>Visa issue date : </span>
                    <input type="date" name="issue" defaultValue={user.visa.issueDate} ref={issueDateRef} />
                </label>
                <br />
                <label htmlFor="entering">
                    <span className={styles.labelSpan}>Date entering UK : </span>
                    <input type="date" name="entering" defaultValue={user.ilr.enteringDate} ref={enteringDateRef} />
                </label>
                <hr />
                {user.initiated ? <Summary /> : null }
                <button type="submit">Save</button>
            </form>
        )
    }

    const TripForm = () => {
        return (
            <form method="post" onSubmit={handleTripSubmit}>
                <label htmlFor="destination">
                    <span className={styles.labelSpan}>Destination : </span>
                    <input type="text" name="destination" ref={tripDestinationRef} />
                </label>
                <br />
                <label htmlFor="from_date">
                    <span className={styles.labelSpan}>From : </span>
                    <input type="date" name="from_date" ref={tripFromDateRef} />
                </label>
                <br />
                <label htmlFor="to_date">
                    <span className={styles.labelSpan}>To : </span>
                    <input type="date" name="to_date" ref={tripToDateRef} />
                </label>
                <hr />
                <button type="submit" style={{float:"right"}}>Add</button>
            </form>
        )
    }

    const container = {
        padding: '24px 48px',
        display: 'grid',
        gridTemplateColumns: user.initiated ? '1fr 20px 1fr' : '1fr'
    }

    return (
        <div className={utilStyles.card}>
            <div style={container}>
                <InitForm />
                <div></div>
                {user.initiated ? <TripForm /> : <></> }
            </div>
        </div>
    )
};