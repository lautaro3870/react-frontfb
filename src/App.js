import "./App.css";
import EditProyecto from "./components/EditProyecto";
import Formulario from "./components/Formulario";
import Login from "./components/Login";
import Table from "./components/Proyectos";
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/react-frontfb" element={<Login />} />
            <Route path="/react-frontfb/proyectos" element={<Table />} />
            <Route path="/react-frontfb/proyectos/:id" element={<Formulario />} />
            <Route path="/react-frontfb/formulario" element={<Formulario />} />
          </Route>
        </Routes>
      </BrowserRouter>

    
      {/* <Table /> */}
    </div>
  );
}

export default App;
