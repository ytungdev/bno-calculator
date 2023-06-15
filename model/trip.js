import addData from "../firebase/db/addData";
import getData from "../firebase/db/getData";

export default class Trip {
    constructor(destination, from_date, to_date, created_at) {
        this.destination = destination;
        this.from_date = from_date;
        this.to_date = to_date;
        this.created_at = created_at;
    }
}