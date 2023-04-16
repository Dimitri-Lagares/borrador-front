import React from "react";
import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Solicitudes } from "./components/Solicitudes";
import { BrowserRouter, Routes, Route} from "react-router-dom";


function App() {


  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path="/inicio-sesion" element={<Login/>} />
          <Route path="/solicitudes" element={<Solicitudes/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App