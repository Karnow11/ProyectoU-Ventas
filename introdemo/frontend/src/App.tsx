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
  const [username_log, setUsernameLog] = useState("");
  const [password_log, setPasswordLog] = useState("");
  const [username_create, setUsernameCreate] = useState("");
  const [password_create, setPasswordCreate] = useState("");
  const [mail_create, setMailCreate] = useState("")
  const [user, setUser] = useState<User | null>(null);
  const [errorMessageLogin, setErrorMessageLogin] = useState<string | null>(null);
  const [errorMessageCreate, setErrorMessageCreate] = useState<string | null>(null);
  const [sucessMessageCreate, setSucessMessageCreate] = useState<string | null>(null);  
  const [hidden_create, setHidden_create] = useState<number>(0);

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
        username: username_log,
        password: password_log,
      });
      setUser(user);
      setUsernameLog("");
      setPasswordLog("");
    } catch (exception: any) {
      setErrorMessageLogin(exception.response?.data?.error || "");
      setTimeout(() => {
        setErrorMessageLogin(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    loginService.logout();
    setUser(null);
  };

  const createUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const user = {
        username: username_create,
        email: mail_create,
        password: password_create
      };
      await loginService.create(user)
      setUsernameCreate("")
      setMailCreate("")
      setPasswordCreate("")
      setHidden_create(state => state + 1)
      setSucessMessageCreate("Usuario creado con exito");
      setTimeout(() => {
        setSucessMessageCreate(null);
      }, 3000);
    } catch (exception: any) {
      setErrorMessageCreate(exception.response?.data?.error || "");
      setTimeout(() => {
        setErrorMessageCreate(null);
      }, 5000);
    }
  }

  return (
    <Router >
      <div className = "Titulo">
        <h1>U-Ventas</h1>
      </div>
        <p style={{ color: "green" }}>{sucessMessageCreate}</p>
      <div>
        {user ? (
          <div>
            {user.name}
            <button onClick={handleLogout}>Logout</button>
          </div>) : (
          <>
            <Toggle text="Login">
              <form onSubmit={handleLogin}>
                <div>
                  username
                  <input type="text" value={username_log} name="Username"
                    onChange={({ target }) => setUsernameLog(target.value)}
                  />
                </div>
                <div>
                  password
                  <input type="password" value={password_log} name="Password"
                    onChange={({ target }) => setPasswordLog(target.value)}
                  />
                </div>
                <p style={{ color: "red" }}>{errorMessageLogin}</p>
                <button type="submit">login</button>
              </form>
            </Toggle>
             <Toggle key={hidden_create} text="Create Account">
              <form onSubmit={createUser}>
                <div>
                  username
                  <input type="text" value={username_create} name="Username"
                    onChange={({ target }) => setUsernameCreate(target.value)}
                  />
                </div>
                <div>
                  mail
                  <input type="text" value={mail_create} name="Mail"
                    onChange={({ target }) => setMailCreate(target.value)}
                  />
                </div>
                <div>
                  password
                  <input type="password" value={password_create} name="Password"
                    onChange={({ target }) => setPasswordCreate(target.value)}
                  />
                </div>
                <p style={{ color: "red" }}>{errorMessageCreate}</p>
                <button type="submit">Create</button>
              </form>
            </Toggle>
          </>)}
      </div>

      <div className = "NavBar">
        <br></br>
        <Link to = "/sellingPointSearch">Busqueda SellingPoints</Link>
        |
        <Link to = "/sellingPointList">Listado SellingPoints</Link>

        {user ? (
      <>
      |
      <Link to = "/formSellingPoint">Formulario Nuevo SellingPoint</Link>
      </>
      ) : null}


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
