import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { BsXCircleFill } from "react-icons/bs";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Filter(prop) {
  const [FilterPet, SetFilterPet] = useState([
    {
      petname: "",
      ownername: "",
      date: "",
    },
  ]);

  const FilterPetChange = (event) => {
    event.preventDefault();
    const FieldName = event.target.getAttribute("name");
    const FieldValue = event.target.value;
    const NewWordArray = { ...FilterPet };
    NewWordArray[FieldName] = FieldValue;
    SetFilterPet(NewWordArray);
  };
  return (
    <div>
      <Card className="text-center">
        <Card.Header style={{ display: "flex" }}></Card.Header>
        <Card.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Hayvan ismi</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="pet isim"
                  name="petname"
                  required="required"
                  onChange={FilterPetChange}
                  value={FilterPet.petname}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Sahip maili</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Sahibinin mailini girin"
                  name="ownermail"
                  required="required"
                  onChange={FilterPetChange}
                  value={FilterPet.ownermail}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Tarih</Form.Label>

                <Form.Control
                  type="date"
                  placeholder="Enter the age"
                  name="date"
                  required="required"
                  onChange={FilterPetChange}
                  value={FilterPet.date}
                />
              </Form.Group>
            </Row>
          </Form>
          <Row xs={1} md={3} className="g-4">
            {prop.AnimalInfo.filter(
              (animalfilter) =>
                animalfilter.petname === FilterPet.petname ||
                animalfilter.ownermail === FilterPet.ownermail ||
                animalfilter.date === FilterPet.date
            ).map((filtered) => (
              <Col>
                <Button
                  variant=""
                  onClick={() => prop.FilteredtoMypets(filtered._id)}
                  style={{ color: "black" ,margin: "auto" }}
                >
                   {filtered.petname}
                  <br/> {filtered.ownermail}
                  <br/> {filtered.date}{" "}
                </Button>
              </Col>
            ))}
          </Row>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </div>
  );
}
