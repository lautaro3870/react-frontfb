import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const body = {
      email: email.current.value,
      password: password.current.value,
    };

    Swal.fire({
      title: "Espere",
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch(
      "https://proyecto-fundacion.herokuapp.com/api/Usuario/Login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    console.log(data);
    if (data.ok === false) {
      Swal.fire({
        title: "Usuario y/o password incorrectos",
        showConfirmButton: false,
        icon: "error",
        timer: 3000,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Ingreso Exitoso",
        timer: "1000",
        showConfirmButton: false,
      });
      localStorage.setItem("token", data.return.token);
      navigate("/react-frontfb/proyectos");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <br />
      <Form
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" ref={email} placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="password" ref={password} placeholder="Password" />
        </Form.Group>
      </Form>
      <Button variant="primary" onClick={login} type="button">
        Login
      </Button>
    </div>
  );
}
