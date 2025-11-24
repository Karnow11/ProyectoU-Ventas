import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { User } from "../types/user"
import api from "../utils/axiosSecure"
import type { sellingPoint } from "../types/sellingPoint"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { HStack } from "@chakra-ui/react"
import { SPElimModal } from './EliminateModal' 
import { SPStore } from "../store/SP_store"
import { UserStore } from "../store/user_store"
import {
    Box,
    Heading,
    Text,
    VStack,
  } from "@chakra-ui/react";

const UserProfile = () => {
    const {id} = useParams()
    const [userPag, changeUser] = useState<User | null>(null)
    const [selling_points, changeSP] = useState<sellingPoint[]>([])
    const { openedSP, modalOpened, openModal } = SPStore();
    const { user } = UserStore();

    // Función para cargar los selling points del usuario
    const loadUserSellingPoints = () => {
        if (!id) return;
        api.get(`/api/selling_points/user/${id}`).then((response) => {
            changeSP(response.data)
        })
    };

    useEffect( () => {
        if (!id) return;

        api.get(`/api/users/${id}`).then((response) => {
          changeUser(response.data);
        });

        loadUserSellingPoints();
    }, [id]);

    const selectedSP = selling_points.find(sp => sp.id === openedSP?.id);
    
    const isOwner = user?.id === userPag?.id;

    return (
        <Box>
      <Heading as="h1" size="lg" mb={2}>
        {user?.username}
      </Heading>
      <Text mb={4}>e-mail: {user?.email}</Text>

      <VStack as="ul" align="stretch" gap={3}>
        {selling_points.map((sp) => (
          <Box
            as="li"
            className="sellingpoint-li"
            key={sp.id}
            p={3}
            borderWidth="1px"
            borderRadius="md"
          >
            <div className="sp-li-title">
              <Link to={`/sellingPoint/${sp.id}`}>
                Nombre: {sp.name} — #{sp.id}
              </Link>
            </div>
            <Text fontSize="sm">
              Tipo de puesto: {sp.static_point ? "Estático" : "Dinámico"}
            </Text>
            <Text fontSize="sm">
              Tipo de producto: {sp.product_type}
            </Text>
          </Box>
        ))}
      </VStack>
    </Box>

        /*
        <div>
            <h1>{userPag?.username}</h1>
            <p>e-mail: {userPag?.email}</p>
            <ul>
                {selling_points.map(sp => (
                <li className="sellingpoint-li" key={sp.id}>
                    <div className="sp-li-title">
                        <Link to={`/sellingPoint/${sp.id}`}>
                            Nombre: {sp.name} — #{sp.id}
                        </Link>
                    </div>
                    <p>Tipo de puesto: {sp.static_point ? "Estático" : "Dinámico"}</p>
                    <p>Tipo de producto: {sp.product_type}</p>
                    {isOwner && (
                        <HStack gap={2} mt={2} justify="center">
                            <Link to={`/editsellingPoint/${sp.id}`}>
                                <IconButton color="primary" size="small" aria-label="editar">
                                    <EditIcon />
                                </IconButton>
                            </Link>
                            <IconButton
                              color="error"
                              size="small"
                              aria-label="eliminar"
                              onClick={() => openModal(sp.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </HStack>
                    )}
                </li>
                ))}
            </ul>
            {isOwner && (
                <SPElimModal 
                    isOpened={modalOpened} 
                    sellingPoint={selectedSP} 
                    openModal={openModal}
                    onSuccess={loadUserSellingPoints}
                />
            )}
        </div>
        */
    )
}

export default UserProfile