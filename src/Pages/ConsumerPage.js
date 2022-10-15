import React from "react";
import Form from "react-bootstrap/Form";
// import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
// import './special-style.css';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import { Card } from "react-bootstrap";
import axios from "axios";
import { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import SideBar from "../Components/SideBar";
export default function ConsumerPage(props) {
  const [modalShow, setModalShow] = React.useState(true);
  const [Code, setCode] = useState("");
  const [DisplayFindedPet, setDisplayFindedPet] = useState(false);
  const [DisplayAppointment, setDisplayAppointment] = useState(false);
  const [MyFindedPet, setMyFindedPet] = useState({});

  const [CloseActions, setCloseActions] = useState([]); //all actions store in there
  const [MyPets, SetMyPets] = useState([]);
  const [FirstSign, setFirstSign] = useState([]);
  const [AnimalInfo, SetAnimalInfo] = useState([]); // all animal info
  const [MyProfile, SetMyProfile] = useState([]); //user info that sign in
  const item = JSON.parse(localStorage.getItem("emails"));

  const [Times, setTimes] = useState([
    "11:30",
    "12:30",
    "11:30",
    "12:30",
    "11:30",
    "12:30",
    "11:30",
    "12:30",
    "11:30",
    "12:30",
  ]);

  console.log(CloseActions);
  useEffect(() => {
    // all animal info store in there

    axios.get("http://localhost:3000/posts").then((response) => {
      SetAnimalInfo(response.data);
    });
  }, []);

  useEffect(() => {
    //get all user and set one user info
    axios.get("http://localhost:3000/users").then((response) => {
      SetMyProfile(
        response.data.filter((myprofile) => myprofile.email === item)
      );
      setFirstSign(
        response.data.filter((myprofile) => myprofile.email === item)[0]
          .firstSign
      );
    });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/notification").then((response) => {
      setCloseActions(
        response.data.filter(
          (filtered) => filtered.OwnerEmailOfNotification === item
        )
      );
    });
  }, []);

  console.log(CloseActions);
  useEffect(() => {
    //get all user and set one user info
    const mypets = AnimalInfo.filter(
      (mypets) => mypets.ownermail == MyProfile[0].email
    );
    SetMyPets(mypets);
  }, [AnimalInfo]);

  const AcsessCodeChange = (event) => {
    setCode(event.target.value);
  };

  const FindMyPet = () => {
    setMyFindedPet(AnimalInfo.filter((mypet) => mypet.accesscode === Code));
    setDisplayFindedPet(true);
    setCode("");
  };
  const ModalClosedFunction = (event) => {
    setFirstSign(false);
  };
  console.log(MyPets);
  const DoAppointment = () => {
    setDisplayAppointment(true);
  };

  const AppointmentApprove = () => {
    setDisplayAppointment(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <SideBar></SideBar>
      <Card style={{  width: "100%" }}>
        <div style={{ display: "flex" }}>
        <Card style={{  width: "100%",padding: "1rem", margin: "1rem" }}>
          <Card.Title style={{ marginTop: "1rem" }}>Hayvanlarim</Card.Title>
          {MyPets.map((mypets) => (
            <Card style={{ marginTop: "1rem" }}>
              <Card.Header as="h5"> {mypets.petname}</Card.Header>
              <Card.Body style={{ display: "flex" }}>
                <Card.Img
                  variant="top"
                  src="https://evrimagaci.org/public/content_media/b65dc8d1c907eb6845c655b391732e89.jpg"
                  style={{ width: "5rem" }}
                />

                <Card.Text style={{ marginLeft: "1rem", marginBlock: "1rem" }}>
                  {mypets.race}
                </Card.Text>

                <Card.Text style={{ marginLeft: "1rem", marginBlock: "1rem" }}>
                  {mypets.model}
                </Card.Text>
                <Card.Text style={{ marginLeft: "1rem", marginBlock: "1rem" }}>
                  {mypets.sex}
                </Card.Text>
                <Card.Text style={{ marginLeft: "auto", marginBlock: "1rem" }}>
                  {mypets.age}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </Card>

        <Card style={{  width: "70%",padding: "1rem", margin: "1rem" }}>
          <Card.Title style={{ marginTop: "1rem" }}>Bilgilendirici</Card.Title>
          <Card style={{ marginTop: "1rem" }}>
            <Card.Header as="h5"> Pet bakimi</Card.Header>
            <Card.Body style={{ display: "flex" }}>
              <Card.Text style={{ marginLeft: "1rem", marginBlock: "1rem" }}>
                <p>
                 Hbaer kaynagindan cekielrek gosterilecek burada...............ibgeiodsfdsfdsafg sdfdsfgdsfds
                  sdgdgs
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
          <Card style={{ marginTop: "1rem" }}>
            <Card.Header as="h5"> Yeni dogan</Card.Header>
            <Card.Body style={{ display: "flex" }}>
              <Card.Text style={{ marginLeft: "1rem", marginBlock: "1rem" }}>
                <p>
                  iosdfbgho;iasefg;uosda sdbljvfibgeiodsfdsfdsafg sdfdsfgdsfds
                  sdgdgs
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </Card>
        </div>
       
      </Card>
      {/* <div>
          <Card
            style={{
              width: "70rem",
              paddingInline: "2rem",
              paddingTop: "1rem",
              margin: "1rem",
            }}
          >
            <Col>
              <Row>
                <Card.Body>
                  <Card.Title>Yakinda Yapilacak Eylemler</Card.Title>
                  {CloseActions.map((actions) => (
                    <Card style={{ marginTop: "1rem" }}>
                      <Card.Header as="h5"> </Card.Header>
                      <Card.Body style={{ display: "flex" }}>
                        <Card.Img
                          variant="top"
                          src="https://evrimagaci.org/public/content_media/b65dc8d1c907eb6845c655b391732e89.jpg"
                          style={{ width: "5rem" }}
                        />

                        <Card.Text>
                          {actions.AppliedOfNotification} ,{" "}
                          {actions.DateOfNotification} ,
                          {actions.NoteOfNotification}
                        </Card.Text>

                        <Button variant="outline-dark" onClick={DoAppointment}>
                          Rezervasyon yap
                        </Button>
                      </Card.Body>
                    </Card>
                  ))}
                </Card.Body>
              </Row>

              {DisplayAppointment ? (
                <Row style={{ display: { DisplayAppointment } }}>
                  <Form.Group
                    controlId="formGridEmail"
                    style={{ marginBottom: "1rem" }}
                  >
                    <Form.Label>Rezervasyon Tarihi</Form.Label>

                    <Form.Control
                      type="date"
                      name="DateOfReservation"
                      required="required"
                    />

                    <Row>
                      {Times.map((time) => (
                        <Col>
                          <Card
                            style={{
                              marginTop: "1rem",
                              width: "5rem",
                              height: "3rem",
                            }}
                          >
                            <Card.Body>
                              <Card.Text>{time}</Card.Text>
                            </Card.Body>
                          </Card>
                        </Col>
                      ))}
                    </Row>

                    <Button variant="outline-dark" onClick={AppointmentApprove}>
                      Rezervasyonu Onayla
                    </Button>
                  </Form.Group>
                </Row>
              ) : (
                <div></div>
              )}
            </Col>
          </Card>
        </div> */}
    </div>
  );
}

{
  /* <Card
            style={{
              width: "18rem",
              paddingInline: "2rem",
              paddingTop: "1rem",
              margin: "1rem",
            }}
          >
            <Card.Body>
              <Card.Title>Veteriner Klinigim</Card.Title>
              <Card.Text>
                2 yildir uye
                <br></br>
                cep telefonu
                <br></br>
              </Card.Text>
              <Button variant="outline-dark">Duzenle</Button>
            </Card.Body>
          </Card> */
}

// function MyVerticallyCenteredModal(props) {
//   const [radioValue, setRadioValue] = useState("");

//   console.log(radioValue);
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <Modal.Header closeButton>
//         <Modal.Title id="contained-modal-title-vcenter">
//           PetFollow'a Hosgeldin .
//         </Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <h4>Hayvanlarinin Asilarini takip etmek </h4>
//         <p>
//           Sistemi kullanabilmek icin Veterinerinden aldigin kodu girebilir ya da
//           veteriner klinginden secebilirsin :
//         </p>

//         <Form.Group controlId="formGridEmail">
//           <Form.Label>Kod</Form.Label>
//           <Form.Control
//             type="name"
//             placeholder="Veterinewriniz verdigi kodu giriniz"
//             name="accsescode"
//             required="required"
//             onChange={props.AcsessCodeChange}
//           />
//         </Form.Group>
//         <Button variant="outline-dark" type="submit" onClick={props.FindMyPet}>
//           Bul
//         </Button>

//         {props.DisplayFindedPet ? (
//           <Card>
//             <Card.Body>
//               {props.MyFindedPet[0].petname} , {props.MyFindedPet[0].ownername}{" "}
//               , {props.MyFindedPet[0].race}
//             </Card.Body>
//           </Card>
//         ) : (
//           <div></div>
//         )}
//       </Modal.Body>

//       <Modal.Footer>
//         <Form>
//           <Form.Check
//             type="checkbox"
//             name="checkbox"
//             onChange={(e) => setRadioValue(e.currentTarget.value)}
//           />
//           bir daha gosterme
//         </Form>
//         <Button onClick={props.ModalClosedFunction}>Devam Et</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
