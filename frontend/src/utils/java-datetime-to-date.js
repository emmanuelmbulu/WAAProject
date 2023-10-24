export default function JavaDatetimeToDate(datetime) {
    function format(t) {
        if(t <= 9) return "0"+t;
        return t;
    }

    let date = `${format(datetime[0])}-${format(datetime[1])}-${format(datetime[2])}`;
    date += `T${format(datetime[3])}:${format(datetime[4])}:${format(datetime[5] ? datetime[5] : 0)}`;

    return new Date(date);
}