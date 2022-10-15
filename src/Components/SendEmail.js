import React from "react";
import emailjs from "emailjs-com";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import Header from "../Pages/Header";
import { Alert } from "react-bootstrap";
export default function SendEmail() {

  const [AlertText, SetAlertText] = useState("");
  const [DisplayAlert, SetDisplayAlert] = useState(false);
  const [TypeAlert, SetTypeAlert] = useState("");
  function sendEmail(e) {
    e.preventDefault();
   
    emailjs
      .sendForm(
        "service_y4sjgco",
        "template_7s77igr",
        e.target,
        "uWsnbK0eA_1bky45v"
      )
      .then(
        (result) => {
          SetDisplayAlert(true);
          SetTypeAlert("success");
          SetAlertText("Tesekkur Eederiz !");
          setTimeout(() => SetDisplayAlert(false), 1500);
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <div>
      <Header></Header>
      <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Bize Bildir</h1>

      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          marginInline: "5rem",
        }}
      ></hr>
      <Card
        style={{
          marginTop: "2rem",
          marginInline: "5rem",
        }}
      >
        <Card.Header></Card.Header>
        <Form onSubmit={sendEmail}>
          <Card.Body>
            <Row xs={1} md={2} className="g-4">
              <Col>
                <FloatingLabel
                  controlId="floatingTextarea20"
                  label="Isminizi girin"
                >
                  <Form.Control
                    type="text"
                    name="user_name"
                    aria-label="Default select example"
                  ></Form.Control>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel
                  controlId="floatingTextarea21"
                  label="Mail adresinizi girin"
                >
                  <Form.Control name="user_email" type="email"></Form.Control>
                </FloatingLabel>
              </Col>
            </Row>

            <br></br>
            <FloatingLabel controlId="floatingTextarea2" label="Yorumunuz">
              <Form.Control
                as="textarea"
                name="message"
                style={{ height: "100px" }}
              />
            </FloatingLabel>
          </Card.Body>

          <div style={{ display: "flex" }}>
            {DisplayAlert ? (
              <Alert
                show={DisplayAlert}
                key={TypeAlert}
                variant={TypeAlert}
                style={{ marginTop: "2rem", marginInline: "auto" }}
              >
                {AlertText}
              </Alert>
            ) : (
              <Button
                variant="outline-dark"
                type="submit"
                value="Send"
                style={{
                  // paddingInline: "2rem",
                  // paddingTop: "1rem",
                  marginInline: "auto",
                  marginBlock: "1rem",
                }}
              >
                Gonder
              </Button>
            )}
          </div>
          
        </Form>
      </Card>
    </div>
  );
}
