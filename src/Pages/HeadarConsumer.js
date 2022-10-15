import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import LogOut from "../Components/LogOut";
import NavDropdown from "react-bootstrap/NavDropdown";
import { HiUserCircle } from "react-icons/hi";
// import { AiOutlineNotification } from "react-icons/ci";
import { HiOutlineBell } from "react-icons/hi";
import { HiOutlineCalendar } from "react-icons/hi";

import { HiOutlineClipboardList } from "react-icons/hi";
export default function HeaderConsumer(prop) {
  const HiUserCircles = (
    <HiUserCircle glyph="star" style={{ width: "2rem", height: "2rem" }}>
      {" "}
    </HiUserCircle>
  );

  return (
    <Navbar
      collapseOnSelect
      expand="sm"
      bg="dark"
      variant="dark"
      style={{ height: "5rem" }}
    >
      <Container>
        <Navbar.Brand href="/Homepage">Pet Follow</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Nav className="me-auto"></Nav>

        <Nav>
          <NavDropdown title={HiUserCircles} id="collasible-nav-dropdown">
            <img
              src="https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png"
              width="150"
              height="150"
              className="d-inline-block align-top"
              alt=""
            />

            <h5 style={{ marginInline: "1rem" }}>Berkan kiraz</h5>
            <NavDropdown.Item href="/MyAcountConsumer">
              Hesabim
            </NavDropdown.Item>
            <NavDropdown.Item href="/SendEmail">Geri Bildirim</NavDropdown.Item>
            <NavDropdown.Item>
              {" "}
              <LogOut></LogOut>
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Container>
    </Navbar>
    // <div>
    //   <Navbar key={false} bg="light" expand={false} className="mb-3">
    //     <Container fluid>
    //       <Navbar.Brand href="/Homepage">PetFollow</Navbar.Brand>
    //       <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
    //       <Navbar.Offcanvas
    //         id={`offcanvasNavbar-expand-false`}
    //         aria-labelledby={`offcanvasNavbarLabel-expand-false`}
    //         placement="end"
    //       >
    //         <Offcanvas.Header closeButton>
    //           <Offcanvas.Title id={`offcanvasNavbar-expand-false`}>
    //             Others
    //           </Offcanvas.Title>
    //         </Offcanvas.Header>
    //         <Offcanvas.Body>
    //           <Nav className="justify-content-end flex-grow-1 pe-3">
    //             <Nav.Link href="/Homepage">Home page</Nav.Link>{" "}
    //             <Nav.Link href="/MyAcount">My Account</Nav.Link>
    //             <Nav.Link href="/CloseAction">Close Action</Nav.Link>
    //             <Nav.Link href="/Reservations">Rezervasyonlarim</Nav.Link>
    //             <Nav.Link href="/Calender">Asi takvimi</Nav.Link>
    //             <LogOut></LogOut>
    //           </Nav>
    //         </Offcanvas.Body>
    //       </Navbar.Offcanvas>
    //     </Container>
    //   </Navbar>
    // </div>
  );
}
