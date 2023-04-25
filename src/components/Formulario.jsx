import { Grid } from "@mui/material";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Container,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import DataTable, { createTheme } from "react-data-table-component";
import Select from "./Select";

export default function Formulario() {
  const url = process.env.REACT_APP_BASE_URL_AREAS;
  const token = localStorage.getItem("token");

  const [areas, setAreas] = useState([]);
  const [nuevasAreas, setNuevasAreas] = useState([]);

  const formulario = useRef();

  const getAreas = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setAreas(data);
  };

  useEffect(() => {
    getAreas();
  }, []);

  const columns = [
    {
      name: "Area",
      selector: (row) => row.area1,
    },
  ];

  const agregarArea = (id, area) => {
    let contador = 0;
    const nuevaArea = {
      id: id,
      area1: area,
    };

    if (nuevasAreas.length === 0) {
      let aa = [...nuevasAreas, nuevaArea];
      console.log(aa);
      setNuevasAreas(aa);
    } else {
      for (let i = 0; i < nuevasAreas.length; i++) {
        const element = nuevasAreas[i];
        if (element.id === id) {
          contador++;
          break;
        }
      }

      if (contador === 0) {
        const a = [...nuevasAreas, nuevaArea];
        console.log(a);
        setNuevasAreas(a);
      }
    }
  };

  const enviar = async () => {
    const { departamento, titulo } = formulario.current;

    const body = {
      titulo: titulo.value,
      departamento: departamento.value,
      areas: nuevasAreas,
    };

    console.log(body);

    const response = await fetch(process.env.REACT_APP_BASE_URL, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data)
  };

  return (
    <Container maxWidth="lg">
      <br />
      <Form ref={formulario}>
        <Grid container spacing={2}>
          <Grid item lg={3} xs={8}>
            <Form.Control type="text" id="titulo" placeholder="Titulo" />
          </Grid>
          <Grid item lg={3} xs={4}>
            <Form.Select id="departamento">
              <option value="ENERGIA">Energia</option>
              <option value="MADE">MADE</option>
              <option value="ASC">ASC</option>
            </Form.Select>
          </Grid>
          <Grid item lg={3} xs={4}>
            <Form.Control type="email" placeholder="name@example.com" />
          </Grid>
          <Grid item lg={3} xs={8}>
            <Form.Control type="email" placeholder="name@example.com" />
          </Grid>
          <Grid item lg={3} xs={8}>
            <Select
              url={process.env.REACT_APP_BASE_URL_AREAS}
              callback={agregarArea}
            />
          </Grid>
          <Grid item lg={3} xs={8}>
            <DataTable columns={columns} data={nuevasAreas} />
          </Grid>
        </Grid>
        <br />
        <Button className="primary" onClick={enviar}>
          Enviar
        </Button>
      </Form>
    </Container>
  );
}
