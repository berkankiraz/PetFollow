import React from "react";
import { useState } from "react";
import Register from "../Components/Register";
import SignIn from "../Components/SignIn";
import { useEffect } from "react";
import Footer from "./Footer";
export default function SignTop(prop) {
  let [authMode, setAuthMode] = useState("signin");

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  // }, []);

  //register yapilinca emailved pawsor geldiyor
  const [info, setinfo] = useState("");
  const [info2, setinfo2] = useState("");

  const pulluserinfo = (userdata) => {
    setinfo(userdata);
  };
  const pulluserinfo2 = (userdata) => {
    setinfo2(userdata);
  };
  const pullFromSignIn = (responseusertype) => {
    prop.func(responseusertype);
  };
  

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    return (
      <div>
        <SignIn changeAuthMode={changeAuthMode} func={pullFromSignIn}></SignIn>
      </div>
    );
  }

  return (
    <Register
      changeAuthMode={changeAuthMode}
      func={pulluserinfo}
      func2={pulluserinfo2}
    ></Register>
  );
}
