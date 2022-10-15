import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { BsFillBrushFill } from "react-icons/bs";
import { BsXCircleFill } from "react-icons/bs";
import Form from "react-bootstrap/Form";
import { useRef } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";
import Header from "./Header";
import { wrap } from "@syncfusion/ej2/grids";
import { filterEnd } from "@syncfusion/ej2/filemanager";

export default function CloseActions() {
  const current = new Date();
  const dateDay = String(current.getDate()).padStart(2, "0");
  const dateMonth = String(current.getMonth() + 1).padStart(2, "0");
  const dateYear = String(current.getFullYear());
  const today = String(dateYear + "-" + dateMonth + "-" + dateDay);

  const [CloseActions, setCloseActions] = useState([]); //all actions store in there

  const [CalenderDate, setCalenderDate] = useState(""); //this state show on card

  const [NotificationDate, setNotificationDate] = useState([]); //all date from notification
  const [OtherNotificationDate, setOtherNotificationDate] = useState([]); //all date from notification

  const CalenderDateChange = (date) => {
    setCalenderDate(date);
  };

  useEffect(() => {
    axios.get("http://localhost:3000/notification").then((response) => {
      setCloseActions(response.data);
      setCalenderDate(today);
    });
  }, []);

  useEffect(() => {
    setNotificationDate(CloseActions.map((time) => time.DateOfNotification));
  }, [CalenderDate]);

  useEffect(() => {
    setOtherNotificationDate(
      CloseActions.filter(
        (filtered) => filtered.DateOfNotification != CalenderDate
      ).map((filtered2) => filtered2.DateOfNotification)
    );
  }, [NotificationDate]);

  
  // useEffect(() => {
  //   const array1 = [1, 3, 2];

  //   const array2 = [];
  //   isBigger()
  //   function isBigger() {
  //     for (let i = 0; (i = OtherNotificationDate.length); i++) {
  //       const biggest = Math.max(...array1);
  //       array2.push(biggest);
  //       console.log(array2);
       
  //     }
  //   }
 
  // }, []);

  return (
    <div>
      <Header></Header>

      <div>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Bildirimlerim</h1>

        <hr
          style={{
            color: "black",
            backgroundColor: "black",
            marginInline: "5rem",
          }}
        ></hr>
        <Card
          style={{
            paddingInline: "2rem",
            marginTop: "2rem",
            marginInline: "5rem",
          }}
        >
          <Card.Body>
            <Form.Group controlId="formGridEmail">
              <Form.Label>Bildirim tarihi</Form.Label>

              <Form.Control
                type="date"
                placeholder="Enter the age"
                name="DateOfReservation"
                required="required"
                defaultValue={today}
                onChange={(event) => CalenderDateChange(event.target.value)}
                selected={today}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        <Card
          style={{
            paddingInline: "2rem",
            marginTop: "1rem",
            marginInline: "5rem",
          }}
        >
          <Card.Body>
            <Card.Title>{CalenderDate}</Card.Title>
            {CloseActions.filter(
              (filtered) => filtered.DateOfNotification === CalenderDate
            ).map((action) => (
              <Card style={{ marginTop: "1rem" }}>
                <Card.Header as="h5"></Card.Header>
                <Card.Body style={{ display: "flex" }}>
                  <Card.Img
                    variant="top"
                    src="https://evrimagaci.org/public/content_media/b65dc8d1c907eb6845c655b391732e89.jpg"
                    style={{ width: "5rem" }}
                  />

                  <Card.Text>{action.DateOfNotification}</Card.Text>
                  <Card.Text>{action.AppliedOfNotification}</Card.Text>
                  <Card.Text>{action.OwnerEmailOfNotification}</Card.Text>
                  <Button variant="primary ">Bildiirm Gonder</Button>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
        <Card
          style={{
            paddingInline: "2rem",
            marginTop: "1rem",
            marginInline: "5rem",
          }}
        >
          <Card.Body>
            <Card.Title>Diger Bildirimler</Card.Title>

            {CloseActions.filter(
              (filtered) => filtered.DateOfNotification != CalenderDate
            ).map((action) => (
              <Card style={{ marginTop: "1rem" }}>
                <Card.Header as="h5">{action.DateOfNotification}</Card.Header>

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

                  <Button variant="outline-dark" style={{ marginLeft: "auto" }}>
                    Bildiirm Gonder
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}
