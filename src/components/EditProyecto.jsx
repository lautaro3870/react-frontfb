import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataTable, { createTheme } from "react-data-table-component";
import { AiFillPrinter, AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import Select from "./Select";
import { Button } from "react-bootstrap";

export default function EditProyecto() {
  const { id } = useParams();
  const [proyecto, setProyecto] = useState([]);
  const [areas, setAreas] = useState([]);

  const url = process.env.REACT_APP_BASE_URL + id;
  const token = localStorage.getItem("token");

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
    setProyecto(data);
  };

  useEffect(() => {
    getProyecto();
  }, []);

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
    },
    {
      name: "Area",
      selector: (row) => row.area1,
    },
    {
      name: "Actions",
      selector: (row) => (
        <div>
          <button
            onClick={() => {
              const nuevasAreas = areas.filter((area) => area.id !== row.id);
              console.log(nuevasAreas);
              setAreas(nuevasAreas);
            }}
          >
            <BiTrash />
          </button>
          <br />
          <button>
            <AiOutlineEdit />
          </button>
          <br />
          <button
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
      const a = [...areas, nuevaArea]
      console.log(a)
      setAreas(a);
    }
    //console.log(areas);
  };

  return (
    <div>
      <div style={{ width: "50%", display: "flex", justifyContent: "center" }}>
        <Select
          url={process.env.REACT_APP_BASE_URL_AREAS}
          callback={agregarArea}
        />
        <button onClick={() => {console.log(areas)}}>Enviar</button>
      </div>
      <DataTable columns={columns} data={areas} />
    </div>
  );
}
