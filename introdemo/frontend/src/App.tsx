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

const SellingPointList = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<number>(0);
  return (
    <div>
      <input
        type="text"
        placeholder="id del selling point"
        onChange={(e) => setId(Number(e.target.value))}
      />
      <button onClick={() => navigate(`/sellingPoint/${id}`)}>Ir al SellingPoint</button>
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
        <Link to = "/sellingPointList">Notas</Link>
        |
        <Link to = "/sellingPointList">Notas</Link>
        |
        <Link to = "/sellingPointList">Notas</Link>
        |
        <Link to = "/sellingPointList">Notas</Link>
        |
        <Link to = "/sellingPointList">Notas</Link>

      </div>

      <Routes>
        <Route path="/sellingPointList" element={<SellingPointList />} />
        <Route path="/sellingPoint/:id" element={<DetalleSellingPoint />} />
      </Routes>
    </Router>
  )
}

export default App
