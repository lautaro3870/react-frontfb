import React, { useEffect, useRef, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { AiFillPrinter, AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BarraNavegacion from "./BarraNavegacion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "./Select";

export default function Table() {
  const [proyectos, setProyectos] = useState([]);
  const [areas, setAreas] = useState([]);
  const navigate = useNavigate();

  //const url = "https://proyecto-fundacion.herokuapp.com/api/Proyecto";

  const formularioBusqueda = useRef();
  const selectAreas = useRef();

  const url = process.env.REACT_APP_BASE_URL;

  const token = localStorage.getItem("token");
  const getProyectos = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    if (response.ok === false) {
      Swal.fire({
        title: "Sesión Expirada",
        showConfirmButton: false,
        timer: 2000,
        icon: "error",
      });
      setTimeout(() => {
        navigate("/react-frontfb");
      }, 2000);
    } else {
      const data = await response.json();
      setProyectos(data);
    }
  };

  const getAreas = async () => {
    const response = await fetch(process.env.REACT_APP_BASE_URL_AREAS, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setAreas(data);
  };

  useEffect(() => {
    getAreas();
    if (token === null) {
      Swal.fire({
        title: "Sesión Expirada",
        showConfirmButton: false,
        timer: 2000,
        icon: "error",
      });
      setTimeout(() => {
        navigate("/react-frontfb");
      }, 2000);
    } else {
      getProyectos();
    }
  }, []);

  const columns = [
    {
      name: "Title",
      selector: (row) => row.titulo,
    },
    {
      name: "Year",
      selector: (row) => row.anioInicio,
    },
    {
      name: "Departamento",
      selector: (row) => row.departamentos,
    },
    {
      name: "Areas",
      selector: (row) => row.listaAreas.map((i) => i.area1 + ", "),
    },
    {
      name: "Actions",
      selector: (row) => (
        <div>
          <button className="btn btn-danger">
            <BiTrash />
          </button>
          <br />
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/react-frontfb/proyectos/" + row.id);
            }}
          >
            <AiOutlineEdit />
          </button>
          <br />
          <button
            className="btn btn-secondary"
            onClick={() => {
              alert(row.id);
            }}
          >
            <AiFillPrinter />
          </button>
        </div>
      ),
    },
  ];

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection);

  createTheme(
    "custom",
    {
      text: {
        primary: "#268bd2",
        secondary: "#2aa198",
      },
      background: {
        default: "#002b36",
      },
      context: {
        background: "#cb4b16",
        text: "#FFFFFF",
      },
      divider: {
        default: "#073642",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(0,0,0,.08)",
        disabled: "rgba(0,0,0,.12)",
      },
    },
    "dark"
  );

  const obtenerIdArea = (id) => {
    return id;
  };

  const buscar = async (e) => {
    e.preventDefault();
    const { depto, area } = formularioBusqueda.current;

    const response = await fetch(
      `https://proyecto-fundacion.herokuapp.com/api/proyecto?Area=${area.value}&Departamento=${depto.value}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setProyectos(data);
  };

  const handleClick = async () => {
    const { depto } = formularioBusqueda.current;

    const response = await fetch(
      process.env.REACT_APP_BASE_URL_AREAS +
        "/AreasxDepto?depto=" +
        depto.value,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setAreas(data);
  };

  return (
    <div>
      <BarraNavegacion />
      <br />
      <Form
        ref={formularioBusqueda}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Form.Group className="mb-3">
          <Form.Select id="depto">
            <option value="" selected>
              Departamento
            </option>
            <option value="ENERGIA">ENERGÍA</option>
            <option value="MADE">MADE</option>
            <option value="ASC">ASC</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          {/* <Select url={process.env.REACT_APP_BASE_URL_AREAS} callback={obtenerIdArea}/> */}
          <Form.Select id="area">
            <option value="" selected>Areas</option>
            {areas.map((i) => (
              <option value={i.id}>{i.area1}</option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group>
          <Button onClick={buscar}>Buscar</Button>
        </Form.Group>
      </Form>
      <DataTable
        fixedHeader
        fixedHeaderScrollHeight="100%"
        columns={columns}
        theme="dark"
        data={proyectos}
        pagination
        onSort={handleSort}
      />
    </div>
  );
}
