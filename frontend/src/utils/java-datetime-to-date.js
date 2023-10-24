import JavaDatetimeToString from "./java-datetime-to-string";

export default function JavaDatetimeToDate(datetime) {
    return new Date(JavaDatetimeToString(datetime));
}