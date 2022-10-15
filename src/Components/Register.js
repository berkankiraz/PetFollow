import axios from "axios";
import React from "react";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Form from "react-bootstrap/Form";

export default function Register(prop) {
 
  const [radioValue, setRadioValue] = useState('');
  const radios = [
    { name: 'I am vet ', value: 'vet' },
    { name: 'I have just a pet', value: 'consumer' },
  
  ];
 

  const [AlertText, SetAlertText] = useState("");
  const [DisplayAlert, SetDisplayAlert] = useState(false);
  const [TypeAlert, SetTypeAlert] = useState("");
  const [NewUserRegister, SetNewUserRegister] = useState([
    {
      email: "",
      password: "",
      vetname:"",
      usertype:""
    },
  ]);

  const RegisterUserChange = (event) => {
    event.preventDefault();
    const FieldName = event.target.getAttribute("name");
    const FieldValue = event.target.value;
    const NewWordArray = { ...NewUserRegister };
    NewWordArray["usertype"] = radioValue;
    NewWordArray[FieldName] = FieldValue;
    SetNewUserRegister(NewWordArray);
  };

  const RegisterUserHandle = (event) => {
    event.preventDefault();
    const NewUser = {
      email: NewUserRegister.email,
      password: NewUserRegister.password,
      vetname: NewUserRegister.vetname,
      usertype: NewUserRegister.usertype,
      

    };

    axios
      .post("http://localhost:3000/register", NewUser)
      .then((res) => {
        SetDisplayAlert(true);
        SetTypeAlert("success");
        SetAlertText("User Created Successfully! You direct to Sign In");
        setTimeout(() => SetDisplayAlert(false), 1000);
        setTimeout(() => prop.changeAuthMode(), 1200);
        prop.func(NewUser.email);
        prop.func2(NewUser.password);
      })
      .catch((err) => {
        if (err.response.data.message === "Error creating user") {
          SetDisplayAlert(true);
          SetTypeAlert("warning");
          SetAlertText("It is already registered!");
          setTimeout(() => SetDisplayAlert(false), 1000);
        }
      });

    SetNewUserRegister({
      email: "",
      password: "",
      vetname: "",
      usertype:""
    });
  };

  return (
    <div>
      <div className="Main" style={{ display: "flex" }}>
        <div>
          <h1
            style={{
              margin: "40px",
              marginTop: "130px",
              paddingLeft: "10rem",
              fontFamily: "bold",
              fontSize: "4rem",
            }}
          >
            Follow
            <br />
            your
            <br />
            pets .
          </h1>
        </div>
        <div
          className="Auth-form-container"
          style={{
            paddingRight: "1rem",
            paddingLeft: "10rem",
            marginTop: "5rem",
            width: "50rem",
          }}
        >
          <form className="Auth-form" onSubmit={RegisterUserHandle}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Register</h3>
              <div className="text-center">
                Already registered?{" "}
                <span className="link-primary" onClick={prop.changeAuthMode}>
                  Sign In
                </span>
              </div>
              <div style={{display:"flex"}}>
              
              <div className="form-group mt-3">
                <label>Name</label>
                <input
                  type="name"
                  name="vetname"
                  required="required"
                  className="form-control mt-1"
                  placeholder="Name "
                  onChange={RegisterUserChange}
                  value={NewUserRegister.vetname}
                />
              </div>
              <Form style={{paddingTop:"55px",paddingLeft:"60px"}}>
                {radios.map((radio,idx) => (
                 <div>
                    <Form.Check
                     key={idx}
                     id={`radio-${idx}`}
                     type="radio"
                     variant={idx % 2 ? 'outline-success' : 'outline-danger'}
                     name="radio"
                     value={radio.value}
                     checked={radioValue === radio.value}
                     onChange={(e) => setRadioValue(e.currentTarget.value)}
                    />
                    {radio.name}
                    
                    </div>
                ))}
              </Form>
              </div>
              

              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  required="required"
                  className="form-control mt-1"
                  placeholder="Email Address"
                  onChange={RegisterUserChange}
                  value={NewUserRegister.email}
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  required="required"
                  className="form-control mt-1"
                  placeholder="Password"
                  onChange={RegisterUserChange}
                  value={NewUserRegister.password}
                />
              </div>
              <div className="d-grid gap-2 mt-3">

              {DisplayAlert ? (
                  <Alert
                    show={DisplayAlert}
                    key={TypeAlert}
                    variant={TypeAlert}
                  >
                    {AlertText}
                  </Alert>
                ) : (
                  <button variant="secondary" className="btn">
                  Register
                </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <img
        alt=""
        src="https://img.freepik.com/free-vector/cute-different-dogs-group_1308-45985.jpg?w=1380&t=st=1664649171~exp=1664649771~hmac=c7d73e9e27fbe9dade815fa4d978cc9f59695f9a3c3cb13d39bc3bd82f7e0155"
        width="100%"
        height="100%"
      />
    </div>
  );
}
