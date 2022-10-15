import React from 'react'
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
export default function MyClinic(props) {
  return (
    <Card style={{ width: "70rem", padding: "1rem", margin: "1rem" }}>
            <Card.Header as="h5">Klinigim</Card.Header>
            <Card.Body style={{ display: "flex" }}>
              <Card.Img
                variant="top"
                src="https://evrimagaci.org/public/content_media/b65dc8d1c907eb6845c655b391732e89.jpg"
                style={{ width: "5rem" }}
              />

              <Card.Text style={{  marginLeft: "2rem" }}>
                Ceptelefonu:
                <br></br>
                Mail: {props.MyClinic.map((email)=>email===email)}
                <br></br>
                Adres :
               
              </Card.Text>
              <Button variant="primary " style={{  padding: "2rem", marginLeft: "35rem" }}>Duzenle</Button>

            </Card.Body>
          </Card>
  )
}
