import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
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
import BarraNavegacion from "./BarraNavegacion";

export default function Formulario() {
  const { id } = useParams();

  const urlAreas = process.env.REACT_APP_BASE_URL_AREAS;
  const url = process.env.REACT_APP_BASE_URL + id;

  const token = localStorage.getItem("token");

  const [areas, setAreas] = useState([]);
  const [areasCombo, setAreasCombo] = useState([]);
  const [proyecto, setProyecto] = useState({});
  const [nuevasAreas, setNuevasAreas] = useState([]);

  const formulario = useRef();

  const getProyecto = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setAreas(data[0].listaAreas);
    setProyecto(data[0]);
  };

  const getAreas = async () => {
    const response = await fetch(urlAreas, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setAreasCombo(data);
  };

  useEffect(() => {
    getProyecto();
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

    for (let i = 0; i < areas.length; i++) {
      const element = areas[i];
      if (element.id === id) {
        contador++;
        break;
      }
    }

    if (contador === 0) {
      const a = [...areas, nuevaArea];
      console.log(a);
      setAreas(a);
    }
  };

  const enviar = async () => {
    const { departamento, titulo } = formulario.current;

    // const body = {
    //   titulo: titulo.value,
    //   departamento: departamento.value,
    //   areas: areas,
    // };

    //setProyecto((p) => [...p, body]);

    if (id === undefined) {
      console.log("Nueva ficha");
      
      const body = {
        titulo: titulo.value,
        paisRegion: "string",
        contratante: "string",
        dirección: "string",
        montoContrato: "string",
        nroContrato: "string",
        mesInicio: 0,
        anioInicio: 0,
        mesFinalizacion: 0,
        anioFinalizacion: 0,
        consultoresAsoc: "string",
        descripcion: "string",
        resultados: "string",
        fichaLista: true,
        enCurso: true,
        departamento: departamento.value,
        moneda: "string",
        certconformidad: true,
        certificadopor: 0,
        convenio: true,
        activo: true,
        link: "string",
        areas: areas,
        personal: [],
        publicaciones: [],
      };

      const response = await fetch(process.env.REACT_APP_BASE_URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    } else {
      console.log("Update ficha");

      const body = {
        id: id,
        titulo: titulo.value,
        paisRegion: "string",
        contratante: "string",
        dirección: "string",
        montoContrato: "string",
        nroContrato: "string",
        mesInicio: 0,
        anioInicio: 0,
        mesFinalizacion: 0,
        anioFinalizacion: 0,
        consultoresAsoc: "string",
        descripcion: "string",
        resultados: "string",
        fichaLista: true,
        enCurso: true,
        departamento: departamento.value,
        moneda: "string",
        certconformidad: true,
        certificadopor: 0,
        convenio: true,
        activo: true,
        link: "string",
        areas: areas,
        personal: [],
        publicaciones: [],
      };

      const response = await fetch(process.env.REACT_APP_BASE_URL, {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <Container maxWidth="lg">
      <BarraNavegacion />
      <br />
      <Form ref={formulario}>
        <Grid container spacing={2}>
          <Grid item lg={3} xs={8}>
            <Form.Control
              type="text"
              id="titulo"
              value={proyecto.titulo}
              placeholder="Titulo"
              onChange={(e) => setProyecto(e.target.value)}
            />
          </Grid>
          <Grid item lg={3} xs={4}>
            <Form.Select value={proyecto.departamento} id="departamento">
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
            <DataTable columns={columns} data={areas} />
          </Grid>
        </Grid>
        <br />
        <Button className="primary" onClick={enviar}>
          {id === undefined ? "Enviar" : "Actualizar"}
        </Button>
      </Form>
    </Container>
  );
}
