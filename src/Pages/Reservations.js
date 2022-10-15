import Header from "./Header";
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

export default function Reservations() {
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
      <Header></Header>

      <div>
        <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Randevularim</h1>

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
              <Form.Label>Randevu tarihi</Form.Label>

              <Form.Control
                type="date"
                placeholder="Enter the age"
                name="DateOfReservation"
                required="required"
                defaultValue={today}
                onChange={(event) => ReservationDateChange(event.target.value)}
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
            <Card.Title>{ReservationDate}</Card.Title>
            {CloseActions.filter(
              (filtered) => filtered.DateOfNotification === ReservationDate
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
                  <Button variant="primary ">Bildirim Gonder</Button>
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
            <Card.Title>Diger Rnadevular</Card.Title>

            {CloseActions.filter(
              (filtered) => filtered.DateOfNotification != ReservationDate
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
