import React, { useEffect, useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { AiFillPrinter, AiOutlineEdit } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";

export default function Table() {
  const [proyectos, setProyectos] = useState([]);

  const url = "https://proyecto-fundacion.herokuapp.com/api/Proyecto";
  
  const getProyectos = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setProyectos(data);
  };

  useEffect(() => {
    getProyectos();
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
      name: "Areas",
      selector: (row) => row.listaAreas.map((i) => i.area1 + ", "),
    },
    {
      name: "Actions",
      selector: (row) => (
        <div>
          <button>
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

  return (
    <div>
      <DataTable
        fixedHeader
        fixedHeaderScrollHeight="500px"
        columns={columns}
        theme="dark"
        data={proyectos}
        pagination
        onSort={handleSort}
      />
    </div>
  );
}
