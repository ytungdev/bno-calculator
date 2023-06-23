
import getData from '../../firebase/db/getData';

import { tripsRolling12 } from '../../ultility';

export default async (req, res) => {

    try {
        const query = req.query;
        const { uid } = query;
        const {result} = await getData('users', uid)
        result.trips.sort((a,b)=>{
            let keyA = new Date(a.from_date),
                keyB = new Date(b.from_date)
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        })

        const final = tripsRolling12(result.trips)

        res.status(200).json({
            result:final
        });
    } catch (e) {
        console.log(e)
        res.status(400).end();
    }
}