import { Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { useStateIfMounted } from "use-state-if-mounted";
import DateTimeDisplay from "./DateTimeDisplay";

export default function CalculateTimeLeft(props) {
  let [timeLeft, setTimeLeft] = useStateIfMounted({});
  useEffect(() => {

},[ setTimeLeft]);

const timer = setTimeout(() => {
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
   <> {difference >0?<Card sx={{ display: 'inline-block' }}>
        <DateTimeDisplay value={ timeLeft.days} type={'Days'}  />
        <span>:</span>
        <DateTimeDisplay value={ timeLeft.hours} type={'Hours'} />
        <span>:</span>
        <DateTimeDisplay value={timeLeft.minutes} type={'Mins'} />
        <span>:</span>
        <DateTimeDisplay value={timeLeft.seconds} type={'Seconds'} />
       </Card>:
       <Card >
        <CardContent  fontWeight={"Bold"} variant="body3" sx={{ display: 'inline-block' ,justifyContent:'center',alignItems:'center'}} align={'center'}  ><span>TIME EXPIRED</span></CardContent>
        </Card>}</>
  )
  }
