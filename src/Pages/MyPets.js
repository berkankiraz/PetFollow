import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Alert from "react-bootstrap/Alert";
import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

export default function MyPets(props) {
  const current = new Date();
  const dateDay = current.getDate();
  const dateMonth = current.getMonth() + 1;
  const dateYear = current.getFullYear();

  const [items, setItems] = useState([]); // it store user email. from localstore.

  const [Selectedid, SetSelectedid] = useState(); // when click any card,it store animal id

  const [AlertText, SetAlertText] = useState("");
  const [DisplayAlert, SetDisplayAlert] = useState(false);
  const [TypeAlert, SetTypeAlert] = useState("");

  const [DisplayEditable, SetDisplayEditable] = useState(true); //
  const [DisplayVaccineInput, setDisplayVaccineInput] = useState("none"); // In new apply section,after choosing applied.new section is opened.about Vaccine
  const [DisplayExaminationInput, setDisplayExaminationInput] =
    useState("none"); //about examination section
  const [AppliedInfo, setAppliedInfo] = useState([]); // All apllied info is in state.

  const [NewApplyRegister, SetNewApplyRegister] = useState([
    //a new apply is applied.
    {
      AnimalId: "",
      WhatApplied: "",
      VaccineOfNewApply: "",
      ExaminationOfNewApply: "",
      NotesOfNewApply: "",
      DateOfNewApply: "",
    },
  ]);

  const [NewNotificationRegister, setNewNotificationRegister] = useState([
    // for new notification state
    {
      DateOfNotification: "",
      AppliedOfNotification: "",
      NoteOfNotification: "",
      OwnerEmailOfNotification: "",
      VetEmailOfNotification: "",
    },
  ]);

  useEffect(() => {
    // User email is getting here.
    const item = JSON.parse(localStorage.getItem("emails"));
    setItems(item);
  }, []);

  useEffect(() => {
    // when new apply or future notification is happened.It runs
    axios.get("http://localhost:3000/postapply").then((response) => {
      setAppliedInfo(response.data);
    });
  }, [AlertText]);

  const PetApplyChange = (event) => {
    //new apply section,any change make run.
    event.preventDefault();
    const FieldName = event.target.getAttribute("name");
    const FieldValue = event.target.value;
    const NewWordArray = { ...NewApplyRegister };
    NewWordArray[FieldName] = FieldValue;
    SetNewApplyRegister(NewWordArray);
    console.log(NewWordArray);

    if (NewWordArray.WhatApplied === "Muayene") {
      setDisplayExaminationInput("block");
      setDisplayVaccineInput("none");
    }
    if (NewWordArray.WhatApplied === "Asi") {
      setDisplayVaccineInput("block");
      setDisplayExaminationInput("none");
    }
  };

  const EditMyPets = (selectedId) => {
    // when you click on an animal card
    SetSelectedid(selectedId);
    if (DisplayEditable === false) {
      SetDisplayEditable(true);
    } else {
      SetDisplayEditable(false);
      setDisplayVaccineInput("none");
      setDisplayExaminationInput("none");
    }
  };

  useEffect(() => {
    //it is about filtering and showing in my pets.It is used because when another pet card is open and want to filter,it don't.
    if (props.DisplayTemp) {
      SetSelectedid(props.TempId);
      SetDisplayEditable(false);
    } else {
      console.log("Some mistake is happened.I do not think so you show it.");
    }
  }, [props.TempId]);

  const DeleteMyPets = (event, selectedId) => {
    event.preventDefault();
    axios
      .delete(`http://localhost:3000/posts/${selectedId}`)
      .then((response) => {
        SetDisplayEditable(true);
        console.log(response);
        props.func();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const AddNewApllied = (event, selectedId) => {
    event.preventDefault();
    NewApplyRegister["AnimalId"] = selectedId;
    axios
      .post("http://localhost:3000/postapply", NewApplyRegister)
      .then((res) => {
        console.log(res);
        SetDisplayAlert(true);
        SetTypeAlert("success");
        SetAlertText("Basarili Bir sekilde Eklendi!");
        setTimeout(() => SetDisplayAlert(false), 1500);
      })
      .catch((err) => {
        console.log(err);
        SetDisplayAlert(true);
        SetTypeAlert("danger");
        SetAlertText("Bir Hata Meydana Geldi");
        setTimeout(() => SetDisplayAlert(false), 1500);
      });
  };

  const NotificationChange = (event) => {
    event.preventDefault();
    const FieldName = event.target.getAttribute("name");
    const FieldValue = event.target.value;
    const NewWordArray = { ...NewNotificationRegister };
    NewWordArray[FieldName] = FieldValue;
    setNewNotificationRegister(NewWordArray);
    console.log(NewWordArray);
  };

  const NotificationSave = (owneremail, vetemail) => {
    NewNotificationRegister["OwnerEmailOfNotification"] = owneremail;
    NewNotificationRegister["VetEmailOfNotification"] = vetemail;

    console.log(owneremail);
    console.log(NewNotificationRegister["OwnerEmailOfNotification"]);

    axios
      .post("http://localhost:3000/notification", NewNotificationRegister)
      .then((res) => {
        console.log(res);
        SetDisplayAlert(true);
        SetTypeAlert("success");
        SetAlertText("Basarili Bir sekilde Olusturuldu!");
        setTimeout(() => SetDisplayAlert(false), 1500);
      })
      .catch((err) => {
        console.log(err);
        SetDisplayAlert(true);
        SetTypeAlert("danger");
        SetAlertText("Bir Hata Meydana Geldi");
        setTimeout(() => SetDisplayAlert(false), 1500);
      });
    setNewNotificationRegister({
      DateOfNotification: "",
      AppliedOfNotification: "",
      NoteOfNotification: "",
      OwnerEmailOfNotification: "",
      VetEmailOfNotification: "",
    });
  };

  if (DisplayEditable === true) {
    if (
      props.AnimalInfo.filter((animals) => animals.vet === items).length === 0
    ) {
      return (
        <div>
          <div style={{ display: "flex" }}>
            <div
              className="d-grid gap-2 mt-3"
              style={{
                width: "100%",
                paddingTop: "2rem",
                paddingInline: "2rem",
              }}
            ></div>
          </div>

          <Card className="text-center">
            <Card.Header style={{ display: "flex" }}>
              {" "}
              Burada kullanim ile alakali bilgiler olacak.
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Su anda hic hayvan eklemediniz. ilk acildiginda hayvan olamdiig
                icin burasi gozukecek
              </Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted"></Card.Footer>
          </Card>
        </div>
      );
    }

    return (
      <div style={{ paddingTop: "2rem", paddingInline: "5rem" }}>
        <Row xs={1} md={3} className="g-4">
          {props.AnimalInfo.filter((animals) => animals.vet === items).map(
            (animals) => (
              <Col>
                <Card onClick={() => EditMyPets(animals._id)}>
                  <Card.Header> {animals.petname}</Card.Header>
                  <Card.Img variant="top" src="" />

                  <Card.Body>
                    <Card.Title style={{ display: "flex" }}>
                      {animals.date}
                    </Card.Title>
                    <Card.Text>{animals.ownername}</Card.Text>
                    <Card.Text>
                      {animals.model} , {animals.sex} , {animals.race}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            )
          )}
        </Row>
      </div>
    );
  } else {
    return (
      <div
        style={{
          paddingTop: "2rem",
          paddingInline: "5rem",
          marginBottom: "2rem",
        }}
      >
        {props.AnimalInfo.filter((animals) => animals._id === Selectedid).map(
          (animals) => (
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body onClick={() => EditMyPets(animals._id)}>
                <Card.Title style={{ display: "flex" }}>
                  {animals.petname}{" "}
                </Card.Title>
                <Card.Text>
                  <h7>Owner :</h7> {animals.ownername}
                </Card.Text>
                <Card.Text>
                  Yas :{dateYear - Number(animals.age.split("-", 1))} yil{" "}
                  {dateMonth - Number(animals.age.split("-", 3)[1])} ay{" "}
                  {dateDay - Number(animals.age.split("-", 3)[2])} gunluk{" "}
                </Card.Text>

                <Card.Text>
                  {animals.model} {animals.race} {animals.sex}
                </Card.Text>
              </Card.Body>
              <Card.Body>
                <Tabs
                  defaultActiveKey="home"
                  id="uncontrolled-tab-example"
                  className="mb-3"
                >
                  <Tab eventKey="home" title="Yeni Uygulama">
                    <Form>
                      <Row>
                        <Form.Group as={Col} controlId="formGridState">
                          <Form.Label>Uygulanan</Form.Label>
                          <Form.Select
                            type="name"
                            defaultValue="Choose"
                            name="WhatApplied"
                            required="required"
                            onChange={PetApplyChange}
                            value={NewApplyRegister.WhatApplied}
                          >
                            <option value="Choose" disabled="true">
                              Choose
                            </option>
                            <option value="Muayene">Muayene</option>
                            <option value="Asi">Asi</option>
                          </Form.Select>
                        </Form.Group>

                        <Form.Group
                          as={Col}
                          controlId="formGridState"
                          style={{ display: `${DisplayVaccineInput}` }}
                        >
                          <Form.Label>Asi</Form.Label>
                          <Form.Select
                            DisplayVaccineInput
                            type="name"
                            defaultValue="Choose"
                            name="VaccineOfNewApply"
                            required="required"
                            onChange={PetApplyChange}
                            value={NewApplyRegister.VaccineOfNewApply}
                          >
                            <option value="Choose" disabled="true">
                              Choose
                            </option>
                            <option value="kuduz">kuduz</option>
                            <option value="karma">karma</option>
                            <option value="bronchin">bronchin</option>
                          </Form.Select>
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          controlId="formGridState"
                          style={{ display: `${DisplayExaminationInput}` }}
                        >
                          <Form.Label>Muayene</Form.Label>
                          <Form.Select
                            type="name"
                            defaultValue="Choose"
                            name="ExaminationOfNewApply"
                            required="required"
                            onChange={PetApplyChange}
                            value={NewApplyRegister.ExaminationOfNewApply}
                          >
                            <option value="Choose" disabled="true">
                              Choose
                            </option>
                            <option value="Erkek">tarti</option>
                            <option value="Kadin">genel</option>
                          </Form.Select>
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>The Notes</Form.Label>
                          <Form.Control
                            type="name"
                            placeholder="Enter the note"
                            name="NotesOfNewApply"
                            required="required"
                            onChange={PetApplyChange}
                            value={NewApplyRegister.NotesOfNewApply}
                          />
                        </Form.Group>
                      </Row>
                      <Row>
                        <Form.Group as={Col} controlId="formGridEmail">
                          <Form.Label>Islem Uygulama Tarihi</Form.Label>

                          <Form.Control
                            type="date"
                            placeholder="Enter the age"
                            name="DateOfNewApply"
                            required="required"
                            onChange={PetApplyChange}
                            value={NewApplyRegister.DateOfNewApply}
                          />

                          <div style={{ display: "flex" }}>
                            {DisplayAlert ? (
                              <Alert
                                show={DisplayAlert}
                                key={TypeAlert}
                                variant={TypeAlert}
                                style={{  marginTop: "2rem", marginInline: "auto" }}
                              >
                                {AlertText}
                              </Alert>
                            ) : (
                              <Button
                                variant="outline-dark"
                                style={{
                                  marginTop: "2rem",
                                  marginInline: "auto",
                                }}
                                onClick={(event) =>
                                  AddNewApllied(event, animals._id)
                                }
                              >
                                Add
                              </Button>
                            )}
                          </div>
                        </Form.Group>
                      </Row>
                    </Form>
                  </Tab>
                  <Tab eventKey="profile" title="Gelecek kayit">
                    <Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Bildirim olusturma Tarihi</Form.Label>

                        <Form.Control
                          type="date"
                          placeholder="Enter the age"
                          name="DateOfNotification"
                          required="required"
                          onChange={NotificationChange}
                          value={NewNotificationRegister.DateOfNotification}
                        />
                      </Form.Group>
                      <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>Uygulanacak</Form.Label>
                        <Form.Select
                          type="name"
                          defaultValue="Choose"
                          name="AppliedOfNotification"
                          required="required"
                          onChange={NotificationChange}
                          value={NewNotificationRegister.AppliedOfNotification}
                        >
                          <option value="Choose">Choose</option>
                          <option value="Asi-karma">Asi -karma</option>
                          <option value="Asi-kuduz">Asi- kuduz</option>
                          <option value="Genel Muayene">Genel Muayene</option>
                        </Form.Select>
                      </Form.Group>
                    </Row>

                    <Form.Group controlId="formGridEmail">
                      <Form.Label>The Notes</Form.Label>
                      <Form.Control
                        type="name"
                        placeholder="Enter the note"
                        name="NoteOfNotification"
                        required="required"
                        onChange={NotificationChange}
                        value={NewNotificationRegister.NoteOfNotification}
                      />
                    </Form.Group>
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
                          style={{ marginTop: "2rem", marginInline: "auto" }}
                          onClick={() =>
                            NotificationSave(animals.ownermail, animals.vet)
                          }
                        >
                          Olustur
                        </Button>
                      )}
                    </div>
                  </Tab>
                  <Tab eventKey="prodsffile" title="Hasta Takip">
                    
                      <ButtonGroup  style={{ display: "flex" }} >
                   
                        
                        <DropdownButton
                          as={ButtonGroup}
                          title="Goster"
                          id="bg-vertical-dropdown-1"
                          variant="outline-dark"
                          style={{marginLeft:"auto"}}
                        >
                          <Dropdown.Item
                            eventKey="1"
                            variant="outline-dark"
                            style={{marginLeft:"auto" }}
                           
                          >
                            Hepsini Goster
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="2"
                            variant="outline-dark"
                            style={{ marginLeft:"auto" }}
                           
                          >
                            Asilar
                          </Dropdown.Item><Dropdown.Item
                            eventKey="3"
                            variant="outline-dark"
                            style={{ marginLeft:"auto" }}
                           
                          >
                            Muayene
                          </Dropdown.Item>
                          <Dropdown.Item
                            eventKey="3"
                            variant="outline-dark"
                            style={{ marginLeft:"auto"}}
                           
                          >
                            Digerleri
                          </Dropdown.Item>

                         
                        </DropdownButton>
                     
                      </ButtonGroup>
                    
                    {AppliedInfo.filter(
                      (applied) => applied.AnimalId === Selectedid
                    ).map((applied) => (
                      <Card style={{marginTop:"1rem"}}>
                        <Card.Body style={{display:"flex"}}>
                          {applied.WhatApplied} {applied.ExaminationOfNewApply}{" "}
                        
                          <Card.Text style={{marginLeft:"auto"}}>   {applied.VaccineOfNewApply} </Card.Text>
                          <Card.Text style={{marginLeft:"auto"}}> {applied.NotesOfNewApply}</Card.Text>
                          <Card.Text style={{marginLeft:"auto"}}> {applied.DateOfNewApply}</Card.Text>
                        </Card.Body>
                      </Card>
                    ))}
                  </Tab>

                  <Tab eventKey="prsadodsfssfile" title="Tahliller">
                    <Col>
                      <Row>
                        <Form.Group
                          controlId="formFileMultiple"
                          className="mb-3"
                        >
                          <Form.Label>
                            Birden Fazla Dosyayi Kaydetebilirsiniz .
                          </Form.Label>
                          <Form.Control type="file" multiple />
                        </Form.Group>
                      </Row>
                      <Row>
                        <div style={{ display: "flex" }}>
                          {DisplayAlert ? (
                            <Alert
                              show={DisplayAlert}
                              key={TypeAlert}
                              variant={TypeAlert}
                              style={{  marginTop: "2rem", marginInline: "auto" }}
                            >
                              {AlertText}
                            </Alert>
                          ) : (
                            <Button
                              variant="outline-dark"
                              style={{
                                marginTop: "2rem",
                                marginInline: "auto",
                              }}
                              // onClick={() =>
                              //   NotificationSave(animals.ownermail, animals.vet)
                              // }
                            >
                              Tahlili Kaydet
                            </Button>
                          )}
                        </div>
                      </Row>
                    </Col>
                  </Tab>
                  <Tab eventKey="prsadodaasfssfile" title="Radyoloji">
                    <div style={{ display: "flex" }}>
                      <Col>
                        <Row>
                          <Form.Group
                            controlId="formFileMultiple"
                            className="mb-3"
                          >
                            <Form.Label>
                              Birden Fazla Dosyayi Kaydetebilirsiniz .
                            </Form.Label>
                            <Form.Control type="file" multiple />
                          </Form.Group>
                        </Row>
                        <Row>
                          <div style={{ display: "flex" }}>
                            {DisplayAlert ? (
                              <Alert
                                show={DisplayAlert}
                                key={TypeAlert}
                                variant={TypeAlert}
                                style={{  marginTop: "2rem", marginInline: "auto" }}
                              >
                                {AlertText}
                              </Alert>
                            ) : (
                              <Button
                                variant="outline-dark"
                                style={{
                                  marginTop: "2rem",
                                  marginInline: "auto",
                                }}
                                // onClick={() =>
                                //   NotificationSave(animals.ownermail, animals.vet)
                                // }
                              >
                                Tahlili Kaydet
                              </Button>
                            )}
                          </div>
                        </Row>
                      </Col>
                    </div>
                  </Tab>
                  <Tab eventKey="prsdasasadodsffile" title="Hasta Bilgileri">
                    <Table striped>
                      <tbody>
                        <tr>
                          <td>
                            <h5>Cinsiyet : </h5>
                          </td>
                          <td>{animals.sex}</td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Irk : </h5>
                          </td>
                          <td>{animals.race}</td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Yas : </h5>
                          </td>
                          <td>
                            {dateYear - Number(animals.age.split("-", 1))} yil{" "}
                            {dateMonth - Number(animals.age.split("-", 3)[1])}{" "}
                            ay {dateDay - Number(animals.age.split("-", 3)[2])}{" "}
                            gunluk{" "}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Sahibin ismi :</h5>
                          </td>
                          <td>{animals.ownername}</td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Sahibin numarasi :</h5>
                          </td>
                          <td>{animals.ownernumber}</td>
                        </tr>
                        <tr>
                          <td>
                            <h5>Sahibin maili :</h5>
                          </td>
                          <td>{animals.ownermail}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Tab>
                  <Tab eventKey="prsadodsffile" title="Hasta Ayarlari">
                    <div style={{ display: "flex" }}>
                      <Button
                        variant="outline-dark"
                        style={{ marginInline: "auto" }}
                        onClick={(event) => DeleteMyPets(event, animals._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Tab>
                </Tabs>
              </Card.Body>
            </Card>
          )
        )}
      </div>
    );
  }
}
