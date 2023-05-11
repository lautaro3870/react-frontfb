import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

export default function Select(props) {
  const [datos, setDatos] = useState([]);
  const token = localStorage.getItem("token");
  const getDatos = async () => {
    const response = await fetch(props.url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    setDatos(data);
    
  };

  useEffect(() => {
    getDatos();
  }, []);

  const createSelectItems = () => {
    let items = [];
    for (let i = 0; i <= datos; i++) {
      items.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
      //here I will be creating my options dynamically based on
      //what props are currently passed to the parent component
    }
    return items;
  };

  const onDropdownSelected = (e) => {
    console.log("THE VAL", e.target.value);
    //here you will see the current selected value of the select input
  };

  return (
    <Form.Select>
      {datos.map((i) => (
        <option onClick={() => props.callback(i.id, i.area1)} value={i.id}>{i.area1}</option>
      ))}
    </Form.Select>
  );
}
