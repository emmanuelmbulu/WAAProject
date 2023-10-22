import React from "react";

export default function CountDown(props) {
  // Function to convert milliseconds to "Days Hours:Minutes:Seconds" format
  function millisecondsToDaysMinutes(BidEndDate) {
    const now = new Date();
    const currentDateTime = now.toISOString().slice(0, 19).replace("T", " ");

    const startDate = new Date(currentDateTime).getTime(); // Change this to your start date

    const endDate = new Date(BidEndDate).getTime(); // Change this to your end date

    // Calculate the time difference in milliseconds
    const milliseconds = endDate - startDate;

    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    return `${days} Days ${remainingHours}:${remainingMinutes}:${remainingSeconds} `;
  }

  // Call the function to get the time difference
  const [time, setTime] = React.useState(
    millisecondsToDaysMinutes("2023-10-23 14:30:00")
  );

  React.useEffect(() => {
    const int = setInterval(() => {
      setTime((s) => millisecondsToDaysMinutes("2023-10-23 14:30:00"));
    }, 1000);
    return () => clearInterval(int);
  }, []);

  return <div>{time}</div>;
}
