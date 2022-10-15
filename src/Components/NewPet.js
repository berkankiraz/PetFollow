import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
export default function NewPet(prop) {
  const current = new Date();
  const dateDay = String(current.getDate()).padStart(2, "0");
  const dateMonth = String(current.getMonth() + 1).padStart(2, "0");
  const dateYear = String(current.getFullYear());
  const today = String(dateYear + "-" + dateMonth + "-" + dateDay);

  const [AccessCode, SetAccessCode] = useState("");
  const [DisplayModal, SetDisplayModal] = useState(false);
  const [NewPetRegister, SetNewPetRegister] = useState([
    {
      img: "",
      petname: "",
      age: "",
      race: "",
      model: "",
      sex: "",
      ownermail: "",
      ownernumber: "",
      ownername: "",
      date: "",
      vet: "",
      accesscode: "",
    },
  ]);

  const RegisterPetChange = (event) => {
    event.preventDefault();
    const FieldName = event.target.getAttribute("name");
    const FieldValue = event.target.value;
    const NewWordArray = { ...NewPetRegister };
    NewWordArray[FieldName] = FieldValue;
    NewWordArray["date"] = today;
    SetNewPetRegister(NewWordArray);
    console.log(NewWordArray);
  };

  const NewPetButtonClicked = (NewPetInfo) => {
    const itememail = JSON.parse(localStorage.getItem("emails"));
    const AccessCode = genPassword();
    NewPetInfo["vet"] = itememail;
    NewPetInfo["accesscode"] = AccessCode;
    SetAccessCode(AccessCode);
    console.log(NewPetInfo);
    axios
      .post("http://localhost:3000/posts", NewPetInfo)
      .then((res) => {
        console.log(res);
        prop.func();
      })
      .catch((err) => {
        console.log(err);
      });
    SetDisplayModal(true);

    SetNewPetRegister({
      img: "",
      petname: "",
      age: "",
      race: "",
      model: "",
      sex: "",
      ownermail: "",
      ownernumber: "",
      ownername: "",
      date: "",
      vet: "",
      accesscode: "",
    });
  };

  return (
    <Card className="text-center">
      <Card.Header style={{ display: "flex" }}></Card.Header>
      <Card.Body>
        <Form>
          <Col className="mb-3">
            <Row>
              <Form.Group as={Col} controlId="formGrisdEmail">
                <Form.Label>Pet Isim</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Pet ismi"
                  name="petname"
                  required="required"
                  onChange={RegisterPetChange}
                  value={NewPetRegister.petname}
                />{" "}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridStasddaate">
                <Form.Label>Tur</Form.Label>
                <Form.Select
                  type="name"
                  defaultValue="Seciniz"
                  name="model"
                  required="required"
                  onChange={RegisterPetChange}
                  value={NewPetRegister.model}
                >
                  <option value="Choose" disabled="true">
                    Choose
                  </option>
                  <option value="Kopek">Kopek</option>
                  <option value="Kedi">Kedi</option>
                </Form.Select>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridSddatate">
                <Form.Label>Cinsiyet</Form.Label>
                <Form.Select
                  type="name"
                  defaultValue="Seciniz"
                  name="sex"
                  required="required"
                  onChange={RegisterPetChange}
                  value={NewPetRegister.sex}
                >
                  <option value="Choose" disabled="true">
                    Choose
                  </option>
                  <option value="Erkek">Erkek</option>
                  <option value="Disi">Disi</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formGridEmadsaail">
                <Form.Label>Irk</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter the race"
                  name="race"
                  required="required"
                  onChange={RegisterPetChange}
                  value={NewPetRegister.race}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGrsdfdggidEmail">
                <Form.Label>Pet Dogum Tarihi</Form.Label>

                <Form.Control
                  type="date"
                  placeholder="Enter the age"
                  name="age"
                  required="required"
                  onChange={RegisterPetChange}
                  value={NewPetRegister.age}
                />
              </Form.Group>
            </Row>

            <Row style={{ marginTop: "2rem" }}>
              <Form.Group as={Col} controlId="formGridEhhmail">
                <Form.Label>Sahip Email</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Sahibinin maili"
                  name="ownermail"
                  required="required"
                  onChange={RegisterPetChange}
                  value={NewPetRegister.ownermail}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="kkfdf">
                <Form.Label>Sahip numara</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Sahibinin numarasi"
                  name="ownernumber"
                  required="required"
                  onChange={RegisterPetChange}
                  value={NewPetRegister.ownernumber}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGrijkkdsadEmail">
                <Form.Label>Sahip isim-soyisim</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Sahibinin ismi"
                  name="ownername"
                  required="required"
                  onChange={RegisterPetChange}
                  value={NewPetRegister.ownername}
                />
              </Form.Group>
            </Row>
          </Col>

          <MyVerticallyCenteredModal
            show={DisplayModal}
            AccessCode={AccessCode}
            onHide={() => SetDisplayModal(false)}
          ></MyVerticallyCenteredModal>

          <Button
            variant="outline-dark"
            onClick={() => NewPetButtonClicked(NewPetRegister)}
          >
            Ekle{" "}
          </Button>
        </Form>
      </Card.Body>
      <Card.Footer className="text-muted"></Card.Footer>
    </Card>
  );
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Yeni hayvan eklendi
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Kolay Erisim icin kod : {props.AccessCode} </h4>
        <p>
          Bu kodu hayvan sahibi ile paylasarak hayvanini takip etmesini
          saglayabilirsiniz.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function genPassword() {
  var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var passwordLength = 8;
  var password = "";
  for (var i = 0; i <= passwordLength; i++) {
    var randomNumber = Math.floor(Math.random() * chars.length);
    password += chars.substring(randomNumber, randomNumber + 1);
  }
  return password;
}
