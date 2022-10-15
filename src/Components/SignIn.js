import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import Cookies from "universal-cookie";
const cookies = new Cookies();

// get token generated on login
const token = cookies.get("TOKEN");

export default function SignIn(prop) {
  const [AlertText, SetAlertText] = useState("");
  const [DisplayAlert, SetDisplayAlert] = useState(false);
  const [TypeAlert, SetTypeAlert] = useState("");

  const [Email, SetJustEmail] = useState([]);
  useEffect(() => {
    // set configurations for the API call here

    const configuration = {
      method: "get",
      url: "http://localhost:3000/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {})
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const [UserLogin, SetUserLogin] = useState([
    {
      email: "",
      password: "",
    },
  ]);

  const UserLoginChange = (event) => {
    event.preventDefault();
    const FieldName = event.target.getAttribute("name");
    const FieldValue = event.target.value;
    const NewWordArray = { ...UserLogin };
    NewWordArray[FieldName] = FieldValue;

    SetUserLogin(NewWordArray);
  };

  const UserLoginHandle = (event) => {
    event.preventDefault();
    const NewUser = {
      email: UserLogin.email,
      password: UserLogin.password,
    };

    SetJustEmail(NewUser.email);
    axios
      .post("http://localhost:3000/login", NewUser)
      .then((response) => {
        // path / makes cookies is available for all page.
        cookies.set("TOKEN", response.data.token, {
          path: "/",
        });
        console.log(response);
        SetDisplayAlert(true);
        SetTypeAlert("success");
        setTimeout(() => prop.func(response.data), 1000);

        SetAlertText("You Sign in Successfully !");
        setTimeout(() => SetDisplayAlert(false), 2000);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "Email not found") {
          SetDisplayAlert(true);
          SetTypeAlert("warning");
          SetAlertText("Email not found. Please register !");
          setTimeout(() => SetDisplayAlert(false), 2000);
        }
        if (err.response.data.message === "Passwords does not match") {
          SetDisplayAlert(true);
          SetTypeAlert("warning");
          SetAlertText(
            "Passwords does not match. Please check your password !"
          );
          setTimeout(() => SetDisplayAlert(false), 2000);
        }
      });

    SetUserLogin({
      email: "",
      password: "",
    });
  };
  localStorage.setItem("emails", JSON.stringify(Email));
  return (
    <div style={{ position: "sticky" }}>
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
          <form className="Auth-form" onSubmit={UserLoginHandle}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Sign In</h3>
              <div className="text-center">
                Not registered yet?{" "}
                <span className="link-primary" onClick={prop.changeAuthMode}>
                  Sign Up
                </span>
              </div>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  name="email"
                  required="required"
                  className="form-control mt-1"
                  placeholder="Email Address"
                  onChange={UserLoginChange}
                  value={UserLogin.email}
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
                  onChange={UserLoginChange}
                  value={UserLogin.password}
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
                  <button
                    variant="secondary"
                    className="btn"
                    show={DisplayAlert}
                  >
                    Sign In
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
