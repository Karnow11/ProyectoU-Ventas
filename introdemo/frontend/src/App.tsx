import { useState, useEffect } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Route,
  BrowserRouter as Router,
  Routes,
  useParams,
} from "react-router-dom";
import type { sellingPoint } from './types/sellingPoint.ts';
import SellingPointComp from './components/SellingPoint.tsx';
import SP_list from "./components/sp_list.tsx";
import FormSP from "./components/FormSP.tsx";
import MapStaticSP from "./components/MapStaticSP.tsx";
import SPSearch from "./components/SPSearch.tsx";
import EditSellingPointComp from "./components/EditSellingPoint.tsx";

import loginService from "./services/login.ts"
import type {User} from './types/user.ts'
import Toggle from "./utils/Toggle.tsx";
import api from "./utils/axiosSecure.ts";
import UserProfile from "./components/UserProfile.tsx";

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Field,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { UserStore } from "./store/user_store.ts";

const InteractiveMap = () =>{
  return (
    <div>
      <MapStaticSP/>
    </div>
  )
}

const SellingPointList = () => {
  return (

    <Box>
      <Box mt={4}>
        <SP_list />
      </Box>
    </Box>
  )
}

const SellingPointSearch = () => {
  return (
    <Box>
      <SPSearch />
    </Box>
  )
}

const FormSellingPoint = () => {
  return (
    <Box>
      <FormSP />
    </Box>
  )
}

const EditSellingPointPage = () => {
  const {id} = useParams();
  const [sellingPointData, setSellingPointBase] = useState<sellingPoint | null> (null);
  useEffect(() => {
    if (!id) return;
    api.get(`/api/selling_points/${id}`).then((response) => {
      setSellingPointBase(response.data.selling_point);
    });
  }, [id]);


  return (
    <Box>
      {sellingPointData && <EditSellingPointComp sellingPoint={sellingPointData} />}
    </Box>
  )




}

const DetalleSellingPoint = () => {
  const {id} = useParams();
  const [sellingPointData, setSellingPointBase] = useState<sellingPoint | null>(null);

  useEffect(() => {
    if (!id) return;
    api.get(`/api/selling_points/${id}`).then((response) => {
      setSellingPointBase(response.data.selling_point);
    });
  }, [id]);

  return (
    <Box>
      {sellingPointData && <SellingPointComp sellingPoint={sellingPointData} />}
    </Box>
  )
}

const App = () => {
  const [username_log, setUsernameLog] = useState("");
  const [password_log, setPasswordLog] = useState("");
  const [username_create, setUsernameCreate] = useState("");
  const [password_create, setPasswordCreate] = useState("");
  const [mail_create, setMailCreate] = useState("")
  //const [user, setUser] = useState<User | null>(null);
  const {user, setUser} = UserStore()
  const [errorMessageLogin, setErrorMessageLogin] = useState<string | null>(null);
  const [errorMessageCreate, setErrorMessageCreate] = useState<string | null>(null);

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
    } catch (exception: any) {
      setErrorMessageCreate(exception.response?.data?.error || "");
      setTimeout(() => {
        setErrorMessageCreate(null);
      }, 5000);
    }
  }

  return (
    <Router >
      <Box minH="100vh">
        <Container maxW="5xl" py={6}>
          {/* Header / Título */}
          <Flex
            as="header"
            className="Titulo"
            justify="space-between"
            align="center"
            mb={8}
          >
            <Heading as="h1" size="lg" color="teal.600">
              U-Ventas
            </Heading>

            {user && (
              <HStack gap={4}>
                <Link to = {`/profile/${user?.id}`} style={{ color: "#285E61", fontWeight: 500 }}>{user.username}</Link>
                <Button
                  size="sm"
                  colorScheme="teal"
                  variant="outline"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </HStack>
            )}
          </Flex>

          {/* Login / Create Account (solo si no hay usuario) */}
          {!user && (
            <Flex gap={6} align="flex-start" mb={8} wrap="wrap">
              <Box flex="1" minW="260px">
                <Toggle text="Login">
                  <Box>
                  <form onSubmit={handleLogin}>
                    <VStack gap={4} align="stretch">
                      <Field.Root>
                        <Field.Label>Username</Field.Label>
                        <Input
                          type="text"
                          value={username_log}
                          name="Username"
                          onChange={({ target }) =>
                            setUsernameLog(target.value)
                          }
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Password</Field.Label>
                        <Input
                          type="password"
                          value={password_log}
                          name="Password"
                          onChange={({ target }) =>
                            setPasswordLog(target.value)
                          }
                        />
                      </Field.Root>
                      {errorMessageLogin && (
                        <Text color="red.500" fontSize="sm">
                          {errorMessageLogin}
                        </Text>
                      )}
                      <Button type="submit" colorScheme="teal" w="full">
                        Login
                      </Button>
                    </VStack>
                    </form>
                  </Box>
                </Toggle>
              </Box>

              <Box flex="1" minW="260px">
                <Toggle text="Create Account">
                  <Box>
                    <form onSubmit={createUser}>
                    <VStack gap={4} align="stretch">
                      <Field.Root>
                        <Field.Label>Username</Field.Label>
                        <Input
                          type="text"
                          value={username_create}
                          name="Username"
                          onChange={({ target }) =>
                            setUsernameCreate(target.value)
                          }
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Mail</Field.Label>
                        <Input
                          type="text"
                          value={mail_create}
                          name="Mail"
                          onChange={({ target }) =>
                            setMailCreate(target.value)
                          }
                        />
                      </Field.Root>
                      <Field.Root>
                        <Field.Label>Password</Field.Label>
                        <Input
                          type="password"
                          value={password_create}
                          name="Password"
                          onChange={({ target }) =>
                            setPasswordCreate(target.value)
                          }
                        />
                      </Field.Root>
                      {errorMessageCreate && (
                        <Text color="red.500" fontSize="sm">
                          {errorMessageCreate}
                        </Text>
                      )}
                      <Button
                        type="submit"
                        colorScheme="teal"
                        variant="outline"
                        w="full"
                      >
                        Create
                      </Button>
                    </VStack>
                    </form>
                  </Box>
                </Toggle>
              </Box>
            </Flex>
          )}
          

          {/* NavBar con Chakra */}
          <Box as="nav" className="NavBar" mb={6}>
            <HStack gap={4} wrap="wrap">
              <Link to = {`/sellingPointSearch`} style={{ color: "#285E61", fontWeight: 500 }}>Búsqueda SellingPoints</Link>
          
              <Link to = {`/sellingPointList`} style={{ color: "#285E61", fontWeight: 500 }}>Listado SellingPoints</Link>

              <Link to = {`/formSellingPoint`} style={{ color: "#285E61", fontWeight: 500 }}>Formulario Nuevo SellingPoint</Link>
              
              <Link to = {`/map`} style={{ color: "#285E61", fontWeight: 500 }}>Mapa Interactivo</Link>

            </HStack>
          </Box>

          {/* Rutas */}
          <Routes>
            <Route path="/sellingPointList" element={<SellingPointList />} />
            <Route
              path="/sellingPointSearch"
              element={<SellingPointSearch />}
            />
            <Route
              path="/sellingPoint/:id"
              element={<DetalleSellingPoint />}
            />
            <Route path="/formSellingPoint" element={<FormSellingPoint />} />
            <Route path="/profile/:id" element={<UserProfile />} />
            <Route path="/map" element={<InteractiveMap />} />
            <Route path="/editsellingPoint/:id" element={<EditSellingPointPage />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  )
}

export default App
