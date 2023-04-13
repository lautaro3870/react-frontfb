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
            <Route path="/react-frontfb/" element={<Login />} />
            <Route path="/react-frontfb/super" element={<Table />} />
          </Route>
        </Routes>
      </BrowserRouter>

    
      {/* <Table /> */}
    </div>
  );
}

export default App;
