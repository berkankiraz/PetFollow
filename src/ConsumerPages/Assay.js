import { Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Overlay from "react-bootstrap/Overlay";
import Calendar from "react-calendar";
import Popover from "react-bootstrap/Popover";
import "react-calendar/dist/Calendar.css";
import Col from "react-bootstrap/Col";
import axios from "axios";
import { useEffect } from "react";
import Row from "react-bootstrap/Row";
import HeaderConsumer from "./../Pages/HeadarConsumer";
import SideBar from "./../Components/SideBar";

export default function Assay() {
  const current = new Date();
  const dateDay = String(current.getDate()).padStart(2, "0");
  const dateMonth = String(current.getMonth() + 1).padStart(2, "0");
  const dateYear = String(current.getFullYear());
  const today = String(dateYear + "-" + dateMonth + "-" + dateDay);
  const [ReservationDate, setReservationDate] = useState([]);
  const [CloseActions, setCloseActions] = useState([]); //all actions store in there
  const ReservationDateChange = (date) => {
    setReservationDate(date);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/notification").then((response) => {
      setCloseActions(response.data);
      setReservationDate(today);
    });
  }, []);

  console.log(ReservationDate);
  return (
    <div>
      <HeaderConsumer></HeaderConsumer>
      <div style={{ display: "flex" }}>
        <SideBar></SideBar>
        <div style={{ width: "100%",height:"100%" }}>
        
           
              {" "}
              <h1 style={{ textAlign: "center", marginTop: "1rem" }}>
                Tahlillerim
              </h1>
              <hr
                style={{
                  color: "black",
                  backgroundColor: "black",
                  marginInline: "5rem",
                }}
              ></hr>
           
            
              {" "}
              <Card
                style={{
                  paddingInline: "2rem",
                  marginTop: "1rem",
                  marginInline: "5rem",
                }}
              >
                <Card.Body>
                 

                  {CloseActions.filter(
                    (filtered) => filtered.DateOfNotification != ReservationDate
                  ).map((action) => (
                    <Card style={{ marginTop: "1rem" }}>
                      <Card.Header as="h5">
                        {action.DateOfNotification}
                      </Card.Header>

                      <Card.Body
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flexWrap: "wrap",
                        }}
                      >
                        <Card.Img
                          variant="top"
                          src="https://evrimagaci.org/public/content_media/b65dc8d1c907eb6845c655b391732e89.jpg"
                          style={{ width: "5rem" }}
                        />

                        <Card.Text
                          style={{ marginLeft: "1rem", marginBlock: "1rem" }}
                        >
                          {action.OwnerEmailOfNotification}
                        </Card.Text>
                        <Card.Text
                          style={{ marginLeft: "1rem", marginBlock: "1rem" }}
                        >
                          {action.AppliedOfNotification}
                        </Card.Text>
                        <Card.Text
                          style={{ marginLeft: "1rem", marginBlock: "1rem" }}
                        >
                          {action.NoteOfNotification}
                        </Card.Text>

                        
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Card>
           
         
          </div>
      </div>
    </div>
  );
}
