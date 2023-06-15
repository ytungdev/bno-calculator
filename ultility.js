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