import React from "react";
import Button from "react-bootstrap/Button";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");

export default function LogOut(prop) {
  const logout = () => {
    cookies.remove("TOKEN", { path: "/" });
    setTimeout(() => (window.location.href = "/Homepage"), 500);
  };
  return (
    <Button
      type="submit"
      variant="danger"
      style={{ width: "100%" }}
      onClick={() => logout()}
    >
      Logout
    </Button>
  );
}
