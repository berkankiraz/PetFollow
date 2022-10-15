import React from "react";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import SignTop from "./SignTop";
import NotHavePet from "../Components/NotHavePet";
import NewPet from "./../Components/NewPet";
import MyPets from "./MyPets";
import Filter from "./../Components/Filter";
import Header from "./Header";
import ConsumerPage from "./ConsumerPage";

import Cookies from "universal-cookie";
import PlaceHolder from "../Components/PlaceHolder";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Card } from "react-bootstrap";
import HeaderConsumer from './HeadarConsumer';
const cookies = new Cookies();

export default function HomePage() {
  const token = cookies.get("TOKEN");
  const [items, setItems] = useState([]); // it store user email. from localstore.
  const [TempId, setTempId] = useState("");
  const [TextShow, SetTextShow] = useState("Hayvanlarim");

  const [DisplayTemp, setDisplayTemp] = useState(false);
  const [DisplayAddNewCard, SetDisplayAddNew] = useState("none");
  const [DisplayMyPetsCard, SetDisplayMyPetsCard] = useState("block");
  const [DisplayFilterCard, SetDisplayFilterCard] = useState("none");
  const [SignTopDisplay, SetSignTopDisplay] = useState(true);
  const [UserType, SetUserType] = useState("");
  const [AnimalInfo, SetAnimalInfo] = useState([]); // Whole pets is in there .
  const [ChangeonAnimalInfo, setChangeonAnimalInfo] = useState("");

  const itememail = JSON.parse(localStorage.getItem("emails"));

  const pullFromSignTop = (responseusertype) => {
    //WHEN A USER LOGIN,IT RUNS.Come from sign in components .
    SetUserType(responseusertype.usertype);
    SetSignTopDisplay(false);
  };
  const pullFromNewPet = () => {
    // if pet is added,So useEffect is run.depends on ChangeonAnimalInfo .
    setChangeonAnimalInfo("Change");
  };
  const pullFromMyPet = () => {
    // if pet is deleted,So useEffect is run.depends on ChangeonAnimalInfo .
    setChangeonAnimalInfo("AGAIN"); // BECASUE OF THE SAME RENDER,IT NEED USEFFECT RUN 2 TIME .
    setChangeonAnimalInfo("CHANGE-AGAIN");
  };

  const displayNewButton = () => {
    // NewPet COMPONENT SHOW .
    SetDisplayFilterCard("none"); // THE OTHER COMPONENT NOT SHOW.
    SetDisplayMyPetsCard("none");
    SetDisplayAddNew("block");
    SetTextShow("Yeni Ekle");
  };

  const displayFilterButton = () => {
    // FILTER COMPONENT SHOW .
    SetDisplayAddNew("none");
    SetDisplayMyPetsCard("none");
    SetDisplayFilterCard("block");
    SetTextShow("Filtrele");
  };

  const displayMyPetsButton = () => {
    // MYPET COMPONENT SHOW .
    SetDisplayAddNew("none");
    SetDisplayFilterCard("none");

    SetDisplayMyPetsCard("block");
    SetTextShow("Hayvanlarim");
  };

  const FilteredtoMypets = (id) => {
    SetDisplayAddNew("none");
    SetDisplayFilterCard("none");
    SetDisplayMyPetsCard("block");
    SetTextShow("Hayvanlarim");
    setTempId(id);
    setDisplayTemp(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((response) => {
        SetAnimalInfo(response.data);
      })
      .catch((err) => console.log(err));
  }, [ChangeonAnimalInfo]);

  useEffect(() => {
    axios.get("http://localhost:3000/users").then((response) => {
      setTimeout(() => {
        SetUserType(
          response.data.filter((myprofile) => myprofile.email === itememail)[0]
            .usertype
        );
      }, "200");
    });
  }, [UserType]);
  
  useEffect(() => {
    // User email is getting here.
    const item = JSON.parse(localStorage.getItem("emails"));
    setItems(item);
  }, []);

  if (SignTopDisplay === true && !token) {
    return <SignTop func={pullFromSignTop}></SignTop>;
  } else {
    if (UserType === "vet") {
      return (
        <div>
          <Header UserType={UserType}></Header>
          <div
            style={{
              display: "flex",
              width: "100%",
              paddingTop: "2rem",
              paddingInline: "5rem",
            }}
          >
            <div className="d-grid gap-2 mt-3" style={{ width: "100%" }}>
              <Button
                type="submit"
                variant="outline"
                onClick={() => displayMyPetsButton()}
              >
                Hayvanlarim
              </Button>
            </div>
            <div className="d-grid gap-2 mt-3" style={{ width: "100%" }}>
              <Button
                type="submit"
                variant="outline"
                onClick={() => displayNewButton()}
              >
                Yeni Ekle
              </Button>
            </div>

            <div className="d-grid gap-2 mt-3" style={{ width: "100%" }}>
              <Button
                type="submit"
                variant="outline"
                onClick={() => displayFilterButton()}
              >
                Filtrele
              </Button>
            </div>
          </div>

          <h1 style={{ textAlign: "center", marginTop: "15px" }}>{TextShow}</h1>

          <hr
            style={{
              color: "black",
              backgroundColor: "black",
              marginInline: "5rem",
            }}
          ></hr>
          <div style={{ display: `${DisplayMyPetsCard}` }}>
            <div style={{ display: "flex" }}>
              <ButtonGroup style={{ marginLeft: "auto", marginRight: "5rem" }}>
                <DropdownButton
                  as={ButtonGroup}
                  title="Goster"
                  id="bg-vertical-dropdown-1"
                  variant="outline-dark"
                  style={{ marginLeft: "auto" }}
                >
                  <Dropdown.Item
                    eventKey="1"
                    variant="outline-dark"
                    style={{ marginLeft: "auto" }}
                  >
                    Tarihe Gore
                  </Dropdown.Item>
                  <Dropdown.Item
                    eventKey="2"
                    variant="outline-dark"
                    style={{ marginLeft: "auto" }}
                  >
                    Yeni eklenenler
                  </Dropdown.Item>
                 
                </DropdownButton>
              </ButtonGroup>
            </div>
          </div>

          <div
            style={{
              display: `${DisplayAddNewCard}`,
              paddingTop: "2rem",
              paddingInline: "5rem",
            }}
          >
            <NewPet
              displayNewButton={displayNewButton}
              func={pullFromNewPet}
            ></NewPet>
          </div>

          <div
            style={{
              display: `${DisplayFilterCard}`,
              paddingTop: "2rem",
              paddingInline: "5rem",
            }}
          >
            <Filter
              displayFilterButton={displayFilterButton}
              AnimalInfo={AnimalInfo}
              FilteredtoMypets={FilteredtoMypets}
            ></Filter>
          </div>
          <div
            style={{
              display: `${DisplayMyPetsCard}`,
              paddingTop: "2rem",
              paddingInline: "2rem",
            }}
          >
            <MyPets
              AnimalInfo={AnimalInfo}
              TempId={TempId}
              DisplayTemp={DisplayTemp}
              func={pullFromMyPet}
            ></MyPets>
          </div>
        </div>
      );
    } else if (UserType === "consumer") {
      return (
        <div>
          <HeaderConsumer UserType={UserType}></HeaderConsumer>
          <ConsumerPage AnimalInfo={AnimalInfo}></ConsumerPage>
        </div>
      );
    } else {
      return (
        <div>
          <Header UserType={UserType}></Header>
          <PlaceHolder></PlaceHolder>
        </div>
      );
    }
  }
}

//   /* <HomepageShow
// TempId={TempId}
// TextShow={TextShow}
// DisplayTemp={DisplayTemp}
// DisplayMyPetsCard={DisplayMyPetsCard}
// DisplayAddNewCard={DisplayAddNewCard}
// DisplayFilterCard={DisplayFilterCard}
// AddNewDisplay={AddNewDisplay}
// pullFromNewPet={pullFromNewPet}
// pullFromMyPet={pullFromMyPet}
// displayNewButton={displayNewButton}
// addButtonClicked={addButtonClicked}
// displayFilterButton={displayFilterButton}
// displayMyPetsButton={displayMyPetsButton}
// FilteredtoMypets={FilteredtoMypets}

// ></HomepageShow> */

// // function HomepageShow(prop) {

// //   return (
// //     <div>
// //     <Header ></Header>
// //     <div style={{ display: "flex" }}>
// //       <div
// //         className="d-grid gap-2 mt-3"
// //         style={{
// //           width: "100%",
// //           paddingTop: "2rem",
// //           paddingInline: "2rem",
// //         }}
// //       >
// //         <Button
// //           type="submit"
// //           variant="success"
// //           onClick={() => prop.displayMyPetsButton()}
// //           style={{ width: "100%" }}
// //         >
// //           My Pets
// //         </Button>
// //       </div>
// //       <div
// //         className="d-grid gap-2 mt-3"
// //         style={{
// //           width: "100%",
// //           paddingTop: "2rem",
// //           paddingInline: "2rem",
// //         }}
// //       >
// //         <Button
// //           type="submit"
// //           variant="info"
// //           onClick={() => prop.displayNewButton()}
// //           style={{ width: "100%" }}
// //         >
// //           Add new
// //         </Button>
// //       </div>

// //       <div
// //         className="d-grid gap-2 mt-3"
// //         style={{
// //           width: "100%",
// //           paddingTop: "2rem",
// //           paddingInline: "2rem",
// //         }}
// //       >
// //         <Button
// //           type="submit"
// //           variant="warning"
// //           onClick={() => prop.displayFilterButton()}
// //           style={{ width: "100%" }}
// //         >
// //           Filter
// //         </Button>
// //       </div>
// //     </div>
// //     <h1 style={{ textAlign: "center", marginTop: "15px" }}>
// //       {prop.TextShow}
// //     </h1>
// //     <div
// //       style={{
// //         display: `${prop.DisplayAddNewCard}`,
// //         paddingTop: "2rem",
// //         paddingInline: "5rem",
// //       }}
// //     >
// //       <NewPet displayNewButton={prop.displayNewButton} func={prop.pullFromNewPet}></NewPet>
// //     </div>

// //     <div
// //       style={{
// //         display: `${prop.DisplayFilterCard}`,
// //         paddingTop: "2rem",
// //         paddingInline: "5rem",
// //       }}
// //     >
// //       <Filter
// //         displayFilterButton={prop.displayFilterButton}
// //         AnimalInfo={prop.AnimalInfo}
// //         FilteredtoMypets={prop.FilteredtoMypets}
// //       ></Filter>
// //     </div>
// //     <div
// //       style={{
// //         display: `${prop.DisplayMyPetsCard}`,
// //         paddingTop: "2rem",
// //         paddingInline: "2rem",
// //       }}
// //     >
// //       <MyPets
// //         AnimalInfo={prop.AnimalInfo}
// //         TempId={prop.TempId}
// //         DisplayTemp={prop.DisplayTemp}
// //         func={prop.pullFromMyPet}
// //       ></MyPets>
// //     </div>
// //   </div>
// //   );

// if (AnimalInfo.filter((animals) => animals.vet === items).length === 0) {
//   return (
//     <div>
//       <Header></Header>
//       <div style={{ display: "flex" }}>
//         <div
//           className="d-grid gap-2 mt-3"
//           style={{
//             width: "100%",
//             paddingTop: "2rem",
//             paddingInline: "2rem",
//           }}
//         >
//           <Button
//             type="submit"
//             variant="success"
//             onClick={() => displayMyPetsButton()}
//             style={{ width: "100%" }}
//           >
//             My Pets
//           </Button>
//         </div>
//         <div
//           className="d-grid gap-2 mt-3"
//           style={{
//             width: "100%",
//             paddingTop: "2rem",
//             paddingInline: "2rem",
//           }}
//         >
//           <Button
//             type="submit"
//             variant="info"
//             onClick={() => displayNewButton()}
//             style={{ width: "100%" }}
//           >
//             Add new
//           </Button>
//         </div>

//         <div
//           className="d-grid gap-2 mt-3"
//           style={{
//             width: "100%",
//             paddingTop: "2rem",
//             paddingInline: "2rem",
//           }}
//         >
//           <Button
//             type="submit"
//             variant="warning"
//             onClick={() => displayFilterButton()}
//             style={{ width: "100%" }}
//           >
//             Filter
//           </Button>
//         </div>
//       </div>
//       <h1 style={{ textAlign: "center", marginTop: "15px" }}>{TextShow}</h1>
//       <Card className="text-center">
//         <Card.Header style={{ display: "flex" }}>FILTER</Card.Header>
//         <Card.Body></Card.Body>
//         <Card.Footer className="text-muted"></Card.Footer>
//       </Card>
//     </div>
//   );
// }
