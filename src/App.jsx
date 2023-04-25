import { Login } from "./components/Login";
import { Home } from "./components/Home";
import { Solicitudes } from "./components/Solicitudes";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { useState } from 'react'
import { Navigate } from "react-router-dom";

const App = () => {
  const [isAllowed, setIsAllowed] = useState(true)

  const functionToGetchildData = (validateRouteLogin) => {
    if (validateRouteLogin === ''){
      setIsAllowed(true)
    } else {
      setIsAllowed(false)
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
        <Route element={<ProtectedRoute  isAllowed={isAllowed}/>}>
          <Route path="/solicitudes" element={<Solicitudes/>} />
          </Route>
          <Route index element={<Home/>}/>
          <Route path='/inicio-sesion' element={<Login childToParentData={functionToGetchildData}/>}/>
          <Route path="*" element={<Navigate to={'/'}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App