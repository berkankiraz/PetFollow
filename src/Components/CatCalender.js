import React from "react";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
export default function CatCalender(prop) {
  return (

    <div style={{ paddingTop: "2rem", paddingInline: "5rem" }}>
    <Card > 
      <Card.Header>
        <Nav
          variant="tabs"
          onSelect={(selectedKey) => prop.SetSelectedAnimal(selectedKey)}
        >
          <Nav.Item>
            <Nav.Link eventKey="Kopek">Kopek</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Kedi">Kedi</Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>
      <Card.Body>
        <Card.Title></Card.Title>

       
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Week</th>
              <th>Vaccation</th>
              <th>The Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Mark</td>
              <td>Kedi İç parazit</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Kedi Dış Parazit</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Kedi Karma Aşısı</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>Jacob</td>
              <td>Kedi Kuduz Aşısı</td>
              <td>Otto</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    </div>
  );
}
