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

import loginService from "./services/login.ts"
import type {User} from './types/user.ts'
import Toggle from "./utils/Toggle.tsx";

const SellingPointList = () => {
  const navigate = useNavigate();
  const [id, setId] = useState<string>("");
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="id del selling point"
          onChange={(e) => setId(String(e.target.value))}
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
  const [id, setId] = useState<string>("");
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="id del selling point"
          onChange={(e) => setId(String(e.target.value))}
        />
        <button onClick={() => navigate(`/sellingPoint/${id}`)}>Ir al SellingPoint</button>
      </div>
    </div>
  )
}

const FormSellingPoint = () => {
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
    id: "",
    static_point: false,
    name: "base",
    description: "base",
    product_type: "base",
  });

  useEffect( () => {
    console.log(`usamos el useEffect con id :${id}`)
    axios.get(`http://localhost:3001/api/selling_points/${id}`).then((response) => {
      console.log("usamos el axios get threads")
      console.log(response.data);
      setSellingPointBase(response.data.selling_point);
    });
  }, []);
  return (
    <div>
      <SellingPointComp sellingPoint = {sellingPointData}/>
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const new_user = await loginService.restoreLogin();
      setUser(new_user);
    };
    init();
  }, []);

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  return (
    <Router >
      <div className = "Titulo">
        <h1>U-Ventas</h1>
      </div>

      <div>
        {user ? (
          <div>
            {user.name}
            <button onClick={handleLogout}>Logout</button>
          </div>) : (
          <Toggle text="Login">
            <form onSubmit={handleLogin}>
              <div>
                username
                <input type="text" value={username} name="Username"
                  onChange={({ target }) => setUsername(target.value)}
                />
              </div>
              <div>
                password
                <input type="password" value={password} name="Password"
                  onChange={({ target }) => setPassword(target.value)}
                />
              </div>
              <p style={{ color: "red" }}>{errorMessage}</p>
              <button type="submit">login</button>
            </form>
          </Toggle>)}
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
