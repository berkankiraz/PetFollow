import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import DogCalender from "../Components/DogCalender";
import CatCalender from "../Components/CatCalender";

import HeaderConsumer from "../Pages/HeadarConsumer";
import SideBar from "./../Components/SideBar";

export default function CalenderConsumer() {
  const [SelectedAnimal, SetSelectedAnimal] = useState("Kopek");

  if (SelectedAnimal === "Kopek") {
    return (
      <div>
        <HeaderConsumer></HeaderConsumer>

        <div style={{ display: "flex" }}>
          <SideBar></SideBar>

          <div style={{ width: "100%",height:"100%" }}>
            <DogCalender SetSelectedAnimal={SetSelectedAnimal}></DogCalender>
          </div>
        </div>
      </div>
    );
  }

  if (SelectedAnimal === "Kedi") {
    return (
      <div>
        <HeaderConsumer></HeaderConsumer>
        <div style={{ display: "flex" }}>
          <SideBar></SideBar>
          {/* <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Kedi Asi Takvimi</h1> */}
          <div style={{ width: "100%" ,height:"100%" }}>
            <CatCalender SetSelectedAnimal={SetSelectedAnimal}></CatCalender>
          </div>
        </div>
      </div>
    );
  }
}
