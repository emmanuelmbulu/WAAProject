export default function TimerToString(time) {
    function formatTime(t) {
        if (t <= 9) return "0" + t;
        return t;
    }

    const seconds = Math.floor(time / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    return `${formatTime(days)} days : ${formatTime(
        remainingHours
    )} h : ${formatTime(remainingMinutes)} min : ${formatTime(
        remainingSeconds
    )} sec`;
}