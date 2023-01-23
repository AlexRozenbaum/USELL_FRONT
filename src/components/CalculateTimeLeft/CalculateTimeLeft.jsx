import { Card, CardContent, Typography } from "@mui/material";
import { useEffect} from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import DateTimeDisplay from "./DateTimeDisplay";
import React from "react";
export default function CalculateTimeLeft(props) {
  let [timeLeft, setTimeLeft] = useStateIfMounted({});
  useEffect(() => {

},[ setTimeLeft]);

 setTimeout(() => {
  setTimeLeft(timeLeft);
}, 1000)

const date_expired=props.date_expired
const  difference = date_expired-+Date.now();
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } 
   
  
  
  return (
   <> {difference >0?<Card sx={{ display: 'inline-block',bgcolor: 'rgba(0, 0, 0, 0.00)',color:'white'}}>
        <DateTimeDisplay value={ timeLeft.days} type={'Days'}  />

        <span>:</span>
        <DateTimeDisplay value={ timeLeft.hours} type={'Hours'} />
        <span>:</span>
        <DateTimeDisplay value={timeLeft.minutes} type={'Mins'} />
        <span>:</span>
        <DateTimeDisplay value={timeLeft.seconds} type={'Seconds'} />
       </Card>:
       <Card sx={{ display: 'inline-block' ,bgcolor: 'rgba(0, 0, 0, 0.00)'}}>
        <CardContent  > <Typography fontWeight={"Bold"} variant='h3' color={"red"} style={{display: 'inline-block',bgcolor: 'rgba(0, 0, 0, 0.00)'}} >TIME EXPIRED</Typography></CardContent>
        </Card>}</>
  )
  }
