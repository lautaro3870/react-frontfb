import "./App.css";
import Login from "./components/Login";
import Table from "./components/Table";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<Login />} />
            <Route path="/super" element={<Table />} />
          </Route>
        </Routes>
      </BrowserRouter>

    {/* "homepage": "https://lautaro3870.github.io/react-frontfb", */}
      {/* <Table /> */}
    </div>
  );
}

export default App;
