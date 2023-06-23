export function monthDiff(d2, d1) {
    if (typeof d2 === 'string' || d2 instanceof String) {
        d2 = new Date(d2)
    }
    if (typeof d1 === 'string' || d1 instanceof String) {
        d1 = new Date(d1)
    }
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    // console.log(`md : ${months} - ${d2}, ${d1}`)
    // return Math.abs(months);
    return months > 0 ? months : 0
}

/**
 * [calculate the days away under BNO calculation]
 * @param  {[type]} d2  [The later date]
 * @param  {[type]} d1  [The ealier date]
 * @return {[number]}   [number of days counted as away]
 */
export function dateDiff(d2, d1) {
    if (typeof d2 === 'string' || d2 instanceof String) {
        d2 = new Date(d2)
    }
    if (typeof d1 === 'string' || d1 instanceof String) {
        d1 = new Date(d1)
    }
    let diff = Math.floor((d2 - d1 - 1) / (1000 * 60 * 60 * 24))
    // return Math.abs(diff);

    return diff > 0 ? diff : 0
}

export function dateToISO(d) {
    if (typeof d === 'string' || d instanceof String) {
        d = new Date(d)
    }
    if (typeof d === 'undefined'){
        return ''
    }
    var mm = d.getMonth() + 1; // getMonth() is zero-based
    var dd = d.getDate();
    return [d.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('-');
}

export function addMonths({date, m=0, y=0}){
    const total = y*12+m
    if (typeof date === 'string' || date instanceof String) {
        date = new Date(date)
        date.setMonth(date.getMonth() + total);
        return dateToISO(date)
    }
    if (typeof date === 'undefined'){
        return ''
    }
    date.getMonth(date.getMonth() + total);
    return date
}

export function overlapDays(b_start,b_end, t_start,t_end){
    if (t_end < b_start) return 0                   // |test| |base|
    if (t_start > b_end) return 0                   //        |base| |test|
    if (b_start <= t_start && t_end <= b_end){       //    |ba |test| se|
        return dateDiff(t_end, t_start)
    }
    if (t_start < b_start){                         //    |te |base|
        return dateDiff(t_end, b_start)
    }
    if (b_end < t_end){                             //        |base| st|
        return dateDiff(b_end, t_start)
    }
    return 0
}


export function tripsRolling12(trips){
    let tripList = []

    trips.forEach((trip)=>{
        const base1 = trip.from_date;
        const base2 = addMonths({date:trip.from_date, m:12})
        let accum = 0
        let overlap = []
        trips.forEach((test)=>{
            const   b1 = new Date(base1),
                    b2 = new Date(base2),
                    t1 = new Date(test.from_date),
                    t2 = new Date(test.to_date);
            // console.log(`${b1}\n${b2}\n${t1}\n${t2}`)
            const overlaps = overlapDays(b1, b2, t1, t2);
            if (overlaps > 0){
                overlap.push({...test});
            }
            accum += overlaps;
        })

        tripList.push({
            tid:trip.tid,
            from_date:base1,
            to_date:base2,
            accum:accum,
            overlap:overlap
        })
    })


    // const fromD = new Date(addMonths({date:from, y:i}))
    // const toD = new Date(addMonths({date:from, y:i + span}))
    // const total = quota
    // let filled = 0

    // tripDates.forEach(range => {
    //     const b1 = fromD,
    //         b2 = toD,
    //         t1 = new Date(range.from),
    //         t2 = new Date(range.to)
    //     // console.log(`${b1}\n${b2}\n${t1}\n${t2}`)
    //     let overlap = overlapDays(b1, b2, t1, t2)
    //     // console.log(overlap)
    //     filled += overlap

    // });

    return tripList

}