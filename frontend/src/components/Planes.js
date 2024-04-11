import React from "react";
import "./Planes.css";
import { UserProvider } from "../App";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Plane(props) {
    console.log(props);
    const { user } = useAuthContext();
    const [redirect, setRedirect] = React.useState(false);
    const [redirect1, setRedirect1] = React.useState(false);
    var year = "2013";
    var month = "04";
    var day = "18";
    const a = props["departure"].split(" ");
    const b = props["arrival"].split(" ");
    var hour1 = parseInt(a[0].split(":")[0]);
    var hour2 = parseInt(b[0].split(":")[0]);
    var min1 = parseInt(a[0].split(":")[1]);
    var min2 = parseInt(b[0].split(":")[1]);
    if (a[1] == "PM" && hour1 != 12) hour1 += 12;
    if (b[1] == "PM" && hour2 != 12) hour2 += 12;
    if (a[1] == "AM" && hour1 == 12) hour1 = 0;
    if (b[1] == "AM" && hour2 == 12) hour2 = 0;
    const time1 = new Date(year, month, day, hour1, min1);
    const time2 = new Date(year, month, day, hour2, min2);
    var z = time2.getTime() - time1.getTime();
    if (z < 0) z += 86400000;
    var hr = Math.floor(z / 3600000);
    var min = Math.floor((z % 3600000) / 60000);
    const HandleBooking = (flightid) => {
      console.log(user);
      if (user) {
        setRedirect1(true);
      } 
      else {
        alert("Please Login to Book a Ticket");
        setRedirect(true);
      }
    };
    if (redirect) {
      const state = {
        details: props.details,
        flightid: props.flightid,
        duration: z / 3600000,
        fare: props.ticketfare,
        arrives: props.arrival,
        departs: props.departure,
        id: props.id,
      };
      return (<Navigate to="/login"  state={state}/>);
    }
    if (redirect1) {
        const state = {
          details: props.details,
          flightid: props.flightid,
          duration: z / 3600000,
          fare: props.ticketfare,
          arrives: props.arrival,
          departs: props.departure,
          objectId: props.id,
        };

        return (<Navigate to="/book"  state={state}/>);
    }
    return (
      <div className="plane">
        <ul className="plane-details">
          <li className="plane-departure">{props.departure} {props.details.depcode} </li>
          <li>
            <i className="gg-airplane"></i>
            <p>
              -----{hr}hr {min}mins------
            </p>
          </li>
          <li className="plane-arrival">{props.arrival} {props.details.arrcode} </li>
          <li className="plane-name">{props.flightid}&emsp;&emsp;&emsp;</li>
          <li className="plane-ticketfare">
            ₹{props.ticketfare.toLocaleString("en-IN")}
          </li>
          <li>
            <button onClick={() => HandleBooking(props.id)}>Book</button>
          </li>
        </ul>
      </div>
    );
}
  