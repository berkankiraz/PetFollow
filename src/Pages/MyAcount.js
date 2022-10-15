import React from "react";
import Header from "./Header";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import SendEmail from "../Components/SendEmail";

export default function MyAcount() {
  const [MyProfile, SetMyProfile] = useState([]);
  const [MyAnimal, SetMyAnimal] = useState([]);
  const [MyOwnerNumber, SetMyOwner] = useState();

  const [DisplayEditModal, setDisplayEditModal] = useState(false);

  const item = JSON.parse(localStorage.getItem("emails"));
  useEffect(() => {
    axios.get("http://localhost:3000/users").then((response) => {
      SetMyProfile(
        response.data.filter((myprofile) => myprofile.email === item)
      );
    });
  }, [MyProfile]);
  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((response) => {
      SetMyAnimal(response.data.filter((myprofile) => myprofile.vet === item));

      const ownernumber = new Set(response.data.map((myowner) => myowner.owner))
        .size;
      SetMyOwner(ownernumber);
    });
  }, []);

  const EditModal = () => {
    setDisplayEditModal(true);
  };

  const handleClose = () => setDisplayEditModal(false);

  const [UserInfo, setUserInfo] = useState({
    number: "",
    city: "",
    adress: "",
  });
  const EditInfoModalChange = (event) => {
    event.preventDefault();
    const FieldName = event.target.getAttribute("name");
    const FieldValue = event.target.value;
    const NewWordArray = { ...UserInfo };
    NewWordArray[FieldName] = FieldValue;
    setUserInfo(NewWordArray);
  };

  console.log(UserInfo);

  const EditInfoModalSave = (event, id) => {
    event.preventDefault();

    const NewSavedInfo = {
      number: UserInfo.number,
      city: UserInfo.city,
      adress: UserInfo.adress,
    };

    const url = `http://localhost:3000/users/${id}`;
    axios
      .patch(
        url,
        {
          number: NewSavedInfo.number,
          city: NewSavedInfo.city,
          adress: NewSavedInfo.adress,
        },
        {
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
      .then((data) => console.log(data))
      .catch((err) => console.log(err));

    setDisplayEditModal(false);
  };

  return (
    <div>
      <div>
        
        {MyProfile.map((myprofile) => (
          <Modal show={DisplayEditModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Duzenle</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={myprofile.email}
                    disabled
                  />
                  {}
                </Form.Group>

                <Form.Group controlId="formGridCity">
                  <Form.Label>Telefon Numarasi</Form.Label>
                  <Form.Control
                    type="string"
                    name="number"
                    className="form-control mt-1"
                    placeholder={myprofile.number}
                    onChange={EditInfoModalChange}
                    value={UserInfo.number}
                  />
                </Form.Group>

                <Form.Group controlId="formGridState">
                  <Form.Label>Sehir</Form.Label>
                  <Form.Select
                    defaultValue={myprofile.city}
                    type="string"
                    name="city"
                    className="form-control mt-1"
                    onChange={EditInfoModalChange}
                    value={UserInfo.city}
                  >
                    <option>Choose...</option>
                    <option>Istanbul</option>
                    <option>Ankara</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGridAddress2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="string"
                    name="adress"
                    className="form-control mt-1"
                    placeholder={myprofile.adress}
                    onChange={EditInfoModalChange}
                    value={UserInfo.adress}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="outline-dark"
                type="submit"
                onClick={(event) => EditInfoModalSave(event, myprofile._id)}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        ))}
      </div>

      <div>
        <Header></Header>
        <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Hesabim</h1>

        <hr
          style={{
            color: "black",
            backgroundColor: "black",
            marginInline: "5rem",
          }}
        ></hr>
        <div>
          <div style={{ display: "flex" ,marginInline:"5rem"}}>
            {MyProfile.map((myprofile) => (
              <Card
                style={{
                  width: "100%",
                  padding: "1rem",
                  display: "flex",
                  marginTop:"1rem"
                }}
              >
                <Card.Header as="h5" style={{ display: "flex" }}>
                  <h3 style={{ marginBlock: "auto" }}>{myprofile.vetname}</h3>
                  <Button
                    variant="outline-dark"
                    onClick={EditModal}
                    style={{ marginLeft: "auto" }}
                  >
                    Duzenle
                  </Button>
                </Card.Header>
                <Card.Body style={{ display: "flex" }}>
                  <Card.Img
                    variant="top"
                    src="data:image/jpeg;base64,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"
                    style={{ width: "10rem", height: "10rem" }}
                  />

                  <Card.Text>
                    <h6 style={{ marginLeft: "2rem" }}>
                      Cep telefonu: {"  "} {myprofile.number}
                    </h6>

                    <br></br>
                    <h6 style={{ marginLeft: "2rem" }}>
                      {" "}
                      Mail: {"  "}
                      {myprofile.email}
                    </h6>

                    <br></br>
                    <h6 style={{ marginLeft: "2rem" }}>
                      {" "}
                      Sehir : {"  "}
                      {myprofile.city}
                    </h6>

                    <br></br>
                    <h6 style={{ marginLeft: "2rem" }}>
                      {" "}
                      Adres : {"  "}
                      {myprofile.adress}
                    </h6>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}

            <Card
              style={{
                width: "100%",
                height:"100%",
                paddingInline: "2rem",
                paddingTop: "1rem",
                marginTop:"1rem",
                marginLeft:"1rem"                
              }}
            >
              <Card.Body>
                <Card.Title>Verilerim</Card.Title>
                <Card.Text>
                  Toplam uye sayisi :{MyOwnerNumber}
                  <br></br>
                  Toplam hayvan sayisi :{MyAnimal.length}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
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
          PetFollow'a Hosgeldin .
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Hayvanlarinin Asilarini takip etmek </h4>
        <p>
          Sistemi kullanabilmek icin Veterinerinden aldigin kodu girebilir ya da
          veteriner klinginden secebilirsin :
        </p>

        <Form.Group controlId="formGridEmail">
          <Form.Label>Kod</Form.Label>
          <Form.Control
            type="name"
            placeholder="Veterinewriniz verdigi kodu giriniz"
            name="accsescode"
            required="required"
            onChange={props.AcsessCodeChange}
          />
        </Form.Group>
        <Button variant="outline-dark" type="submit" onClick={props.FindMyPet}>
          Bul
        </Button>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.ShowCard}>Devam Et</Button>
      </Modal.Footer>
    </Modal>
  );
}
