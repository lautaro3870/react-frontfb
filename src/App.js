import "./App.css";
import Formulario from "./components/Formulario";
import Login from "./components/Login";
import Table from "./components/Proyectos";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Admin, Resource, ListGuesser } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

function App() {
  const dataProvider = jsonServerProvider(
    "https://jsonplaceholder.typicode.com"
  );

  // "homepage": "https://lautaro3870.github.io/react-frontfb",

  const mensaje = useRef();
  
  // const socket = new Server({
  //   cors: {
  //     origin: "http://localhost:3001"
  //   }
  // });

  // const [mensajes, setMensajes] = useState([]);
  // const enviar = () => {
  //   console.log(mensaje.current.value);
  //   socket.emit("message", { data: mensaje.current.value });
  // };

  // useEffect(() => {
  //   socket.on("message", ({ data }) => {
  //     setMensajes(data);
  //   });
  // }, [mensajes]);

  return (
    <div className="App">
      {/* <ul id="messages">
        {mensajes.map((i) => (
          <li>{i}</li>
        ))}
      </ul>
      <br />
      <br />
      Mensaje: <input ref={mensaje} />
      <br />
      <br />
      <button onClick={enviar}>Enviar</button> */}
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Login />} />
            <Route path="/react-frontfb/proyectos" element={<Table />} />
            <Route path="/react-frontfb/proyectos/:id" element={<Formulario />} />
            <Route path="/react-frontfb/formulario" element={<Formulario />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <Table /> */}
    </div>

    // <Admin dataProvider={dataProvider}>
    //   <Resource name="posts" list={ListGuesser} />
    //   <Resource name="comments" list={ListGuesser} />
    // </Admin>
  );
}

export default App;
