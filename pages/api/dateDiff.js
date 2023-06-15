
import getData from '../../firebase/db/getData';
import addData from '../../firebase/db/addData';


import { dateDiff } from '../../ultility';

export default async (req, res) => {
    try {
        const query = req.query;
        const { d1, d2 } = query;
        let result = dateDiff(d2, d1)
        res.status(200).json({
            d1: d1,
            d2: d2,
            result:result
        });
    } catch (e) {
        console.log(e)
        res.status(400).end();
    }
}