import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { dateDiff } from "../ultility";
import styles from './tripForm.module.css'
import utilStyles from '../styles/utils.module.css';

export default function TripForm(props) {
    const [issueDate, setIssueDate] = props.issueDateState
    const [enteringDate, setEnteringDate] = props.enteringDateState
    const [countingDate, setCountingDate] = props.countingDateState
    const [visaType, setVisaType] = props.visaTypeState
    const [formStep, setFormStep] = props.formStepState
    const [daysAway, setDaysAway] = props.daysAway0
    const enteringDateRef = React.useRef();
    const issueDateRef = React.useRef();
    const countingDateRef = React.useRef();

    function handleSubmit(e) {
        // Prevent the browser from reloading the page
        const newIssueDate = issueDateRef.current.value
        const newEnteringDate = enteringDateRef.current.value
        // setEnteringDate(newEnteringDate);
        // setIssueDate(newIssueDate);
        setIssueDate(newIssueDate)
        setEnteringDate(newEnteringDate);
        console.log(`submit : ${newIssueDate} | ${newEnteringDate}`)
        let diff = dateDiff(newEnteringDate, newIssueDate)
        if (diff >= 180){
            setCountingDate(newEnteringDate);
        } else {
            setCountingDate(newIssueDate);
            // add trip to tripData
        }
        // setCountingDate(diff >= 180 ? newEnteringDate : newIssueDate);
        setDaysAway(diff)
        setFormStep(1)
        e.preventDefault();
    }

    function clearData() {
        if (confirm("Confirm to delete all data ?")) {
            setDaysAway(0)
            setFormStep(0)
            enteringDateRef.current.value = '';
            issueDateRef.current.value = '';
            countingDateRef.current.value = ''
            localStorage.clear();
        }
    }

    // console.log(issueDate, enteringDate);
    const visaTypes = [
 
    ];

    const Summary = () => {
        return (
            <>
                <label htmlFor="counting">
                    <span className={styles.labelSpan}>Counting date : </span>
                    <input type="date" name="counting"
                        ref={countingDateRef}
                        defaultValue={countingDate}
                        disabled={true}
                    />
                </label>
                <br />
                <span>
                    <span className={styles.labelSpan}>Days away : </span>
                    {daysAway}
                </span>
                <br />
            </>
        )
    }


    const container = {
        padding: '24px 48px'
    }

    return (
        <div className={utilStyles.card}>
            <div style={container}>
                <form method="post" onSubmit={handleSubmit}>
                    <label htmlFor="type">
                        <span className={styles.labelSpan}>Visa type : </span>
                        <select name="type"
                            defaultValue={visaType}
                            onChange={e => setVisaType(e.target.value)}
                        >
                            <option value='5'>5 years</option>
                            <option value='2.5'>2 years and 6 months</option>
                        </select>
                    </label>
                    <br />
                    <label htmlFor="issue">
                        <span className={styles.labelSpan}>Visa issue date : </span>
                        <input type="date" name="issue"
                            defaultValue={issueDate}
                            ref={issueDateRef}
                        />
                    </label>
                    <br />
                    <label htmlFor="entering">
                        <span className={styles.labelSpan}>Date entering UK : </span>
                        <input type="date" name="entering"
                            defaultValue={enteringDate}
                            ref={enteringDateRef}
                        />
                    </label>
                    <hr />
                    {formStep == 1 ? <Summary /> : null}
                    <button type="submit">Save</button>
                    <button type="button" onClick={clearData}>DELETE DATA</button>
                </form>
            </div>
        </div>
    )
};