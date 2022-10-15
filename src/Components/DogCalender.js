import React from 'react'
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';

export default function DogCalender(prop) {
  return (
    <div style={{ paddingTop: "2rem", paddingInline: "5rem" }}>
    <Card >
      <Card.Header>
      <Nav variant="tabs" onSelect={(selectedKey) => prop.SetSelectedAnimal(selectedKey)}>
          <Nav.Item>
            <Nav.Link eventKey="Kopek">Kopek</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="Kedi">Kedi</Nav.Link>
          </Nav.Item>
        </Nav>
    
      </Card.Header>
      <Card.Body>
        <Card.Title> </Card.Title>
        
        
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Hafta</th>
              <th>Asi</th>
              <th>Not</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>6. hafta</td>
              <td>Köpek İç parazit</td>
              <td>Cok onemli bir asidir.</td>
            </tr>
            <tr>
              <td>8. week</td>
              <td>Köpek Dış Parazit</td>
              <td>Otto</td>
            </tr>
            
            <tr>
              <td>10. week</td>
              <td>Bronchine Aşı</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>10. week</td>
              <td>Puppy DP Aşısı</td>
              <td>Otto</td>
            </tr>
      
            <tr>
              <td>10. week</td>
              <td>Köpek Kuduz Aşısı</td>
              <td>Otto</td>
            </tr>
            <tr>
              <td>10. week</td>
              <td>Lyme Aşısı</td>
              <td>Otto</td>
            </tr>
          </tbody>
        </Table>
      
      </Card.Body>
    </Card>
    </div>
  )
}
