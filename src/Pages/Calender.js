import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import { useState } from "react";
import DogCalender from "../Components/DogCalender";
import CatCalender from "../Components/CatCalender";
import Header from "./Header";

export default function Calender() {
  const [SelectedAnimal, SetSelectedAnimal] = useState("Kopek");

  if (SelectedAnimal === "Kopek") {
    return (
      <div>
        <Header></Header>
        <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Kopek Asi Takvimi</h1>

      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          marginInline: "5rem",
        }}
      ></hr>
        <DogCalender SetSelectedAnimal={SetSelectedAnimal}></DogCalender>
      </div>
    );
  }

  if (SelectedAnimal === "Kedi") {
    return (
      <div>
        <Header></Header>
        <h1 style={{ textAlign: "center", marginTop: "1rem" }}>Kedi Asi Takvimi</h1>

      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          marginInline: "5rem",
        }}
      ></hr>
        <CatCalender SetSelectedAnimal={SetSelectedAnimal}></CatCalender>
      </div>
    );
  }
}
