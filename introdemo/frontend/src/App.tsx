import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios"
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import type { sellingPoint } from './types/sellingPoint.ts';
import SellingPointComp from './components/SellingPoint.tsx';
import SP_list from "./components/sp_list.tsx";
import FormSP from "./components/FormSP.tsx";

const SellingPointList = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<number>(0);
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="id del selling point"
          onChange={(e) => setId(Number(e.target.value))}
        />
        <button onClick={() => navigate(`/sellingPoint/${id}`)}>Ir al SellingPoint</button>
      </div>
      <div>
        <SP_list/>
      </div>
    </div>
  )
}

const SellingPointSearch = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<number>(0);
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="id del selling point"
          onChange={(e) => setId(Number(e.target.value))}
        />
        <button onClick={() => navigate(`/sellingPoint/${id}`)}>Ir al SellingPoint</button>
      </div>
    </div>
  )
}

const FormSellingPoint = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <FormSP/>
      </div>
    </div>
  )
}

const DetalleSellingPoint = () => {
  const {id} = useParams();
  const [sellingPointData, setSellingPointBase] = useState<sellingPoint>({
    id: 0,
    static_point: false,
    name: "base",
    description: "base",
    product_type: "base",
  });

  useEffect( () => {
    console.log("usamos el useEffect")
    axios.get(`http://localhost:3001/selling_point/${id}`).then((response) => {
      console.log("usamos el axios get threads")
      setSellingPointBase(response.data);
    });
  }, []);
  return (
    <div>
      <SellingPointComp sellingPoint = {sellingPointData}/>
    </div>
  )
}

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <Router >
      <div className = "Titulo">
        <h1>U-Ventas</h1>
      </div>
      <div className = "NavBar">
        <br></br>
        <Link to = "/sellingPointSearch">Busqueda SellingPoints</Link>
        |
        <Link to = "/sellingPointList">Listado SellingPoints</Link>
        |
        <Link to = "/formSellingPoint">Formulario Nuevo SellingPoint</Link>
        |
        <Link to = "/sellingPointList">Notas</Link>
        |
        <Link to = "/sellingPointList">Notas</Link>

      </div>

      <Routes>
        <Route path="/sellingPointList" element={<SellingPointList />} />
        <Route path="/sellingPointSearch" element={<SellingPointSearch />} />
        <Route path="/sellingPoint/:id" element={<DetalleSellingPoint />} />
        <Route path="/formSellingPoint" element={<FormSellingPoint />} />
      </Routes>
    </Router>
  )
}

export default App
