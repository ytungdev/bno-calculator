import firebase_app from "../firebase/config";
import { getFirestore, doc, setDoc, updateDoc, arrayUnion, Timestamp } from "firebase/firestore";

import getData from "../firebase/db/getData";
import addData from "../firebase/db/addData";

import { dateDiff } from "../ultility";

const db = getFirestore(firebase_app)

export default class AppUser {
    constructor(user) {
        this.google = user
        this.uid = user.uid
        this.initiated = false,
        this.visa = {
            type: undefined,
            issueDate: undefined
        };
        this.ilr = {
            enteringDate: undefined,
            countingDate: undefined,
            preEnteringDays: undefined
        }
        this.trips = [];
        this.fetch()
    }
    async fetch() {
        let result = null;
        let error = null;
        try {
            const { result } = await getData('users', this.uid)
            if ('initiated' in result) {
                this.initiated = result.initiated
            }
            if ('visa' in result) {
                this.visa.type = result.visa.type
                this.visa.issueDate = result.visa.issue_date
            }
            if ('ilr' in result) {
                this.ilr.enteringDate = result.ilr.entering_date
                this.ilr.countingDate = result.ilr.counting_date
                this.ilr.preEnteringDays = result.ilr.pre_entering_days
            }
            if ('trips' in result) {
                this.trips = result.trips
                this.trips.map((t) => {
                    t.created_at = t.created_at.toDate()
                })
                this.trips.sort((a, b) => {
                    var keyA = new Date(a.from_date),
                        keyB = new Date(b.to_date);
                    // Compare the 2 dates
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                })
            }
            return true
        } catch (e) {
            error = e;
            result = false;
            return { result, error }
        }

    }

    async addMeta(visaType, visaIssueDate, ilrEnteringDate) {
        let diff = dateDiff(ilrEnteringDate, visaIssueDate)
        let ilrCountingDate;
        if (diff >= 180) {
            ilrCountingDate = ilrEnteringDate;
        } else {
            ilrCountingDate = visaIssueDate;
        }
        let ilrPreEnteringDays = diff

        let data = {
            initiated: true,
            visa: {
                type: visaType,
                issue_date: visaIssueDate,
            },
            ilr: {
                entering_date: ilrEnteringDate,
                counting_date: ilrCountingDate,
                pre_entering_days: ilrPreEnteringDays
            }
        }
        const { result, error } = await addData('users', this.uid, data)
        return { result, error }
    }

    async addTrip(destination, from_date, to_date) {
        let result = null;
        let error = null;
        let newTid = await this.getNewTid()
        console.log('test')
        console.log(newTid)
        try {
            result = await updateDoc(doc(db, 'users', this.uid), {
                trips: arrayUnion({
                    destination: destination,
                    from_date: from_date,
                    to_date: to_date,
                    created_at: Timestamp.fromDate(new Date()),
                    tid: newTid
                }),
            });
        } catch (e) {
            error = e;
        }

        return { result, error }
    }

    async getTrips() {
        const { result, error } = getData('user', this.uid)
        const data = result.trips
        data.created_at = data.created_at.toString()
    }

    async getNewTid(){
        await this.fetch()
        const lastId = parseInt(this.trips[this.trips.length-1].tid)
        return (lastId+1).toString()
    }
}