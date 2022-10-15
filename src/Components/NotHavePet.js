import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

export default function NotHavePet(prop) {
  return (
    <div style={{ paddingTop: "7rem", paddingInline: "10rem" }}>
      <Card className="text-center">
        <Card.Header></Card.Header>
        <Card.Body>
          <Card.Title>
            {" "}
            Su anda herhangi bir hayvana sahip degilsiniz.
          </Card.Title>
          <Card.Text>Yeni hayvan ekleyebilirsiniz:</Card.Text>
          <Button variant="outline-dark" onClick={() => prop.addButtonClicked()}>
            EKLE
          </Button>
        </Card.Body>
        <Card.Footer className="text-muted"></Card.Footer>
      </Card>
    </div>
  );
}
