import FormatTimeUnit from "./format-time-unit";

export default function JavaDatetimeToString(datetime) {
    let date = `${FormatTimeUnit(datetime[0])}-${FormatTimeUnit(datetime[1])}-${FormatTimeUnit(datetime[2])}`;
    date += `T${FormatTimeUnit(datetime[3])}:${FormatTimeUnit(datetime[4])}:${FormatTimeUnit(datetime[5] ? datetime[5] : 0)}`;
    return date;
}