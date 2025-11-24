import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { User } from "../types/user"
import api from "../utils/axiosSecure"
import type { sellingPoint } from "../types/sellingPoint"
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { IconButton } from '@mui/material'
import { SPElimModal } from './EliminateModal' 
import { SPStore } from "../store/SP_store"
import { UserStore } from "../store/user_store"
import {
    Box,
    Heading,
    Text,
    VStack,
    HStack,
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
        {userPag?.username}
      </Heading>
      <Text mb={4}>e-mail: {userPag?.email}</Text>

      <VStack gap={4} align="stretch">
                {selling_points.map((sp) => (
                    <Box
                        key={sp.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor="gray.600"
                        _hover={{ borderColor: "gray.700", shadow: "sm" }}
                        transition="all 0.2s"
                    >
                        <Link to={`/sellingPoint/${sp.id}`}>
                            <Heading as="h4" size="sm" color="#ffb5df" mb={2}>
                                {sp.name}
                            </Heading>
                        </Link>
                        <Text fontSize="sm" color="gray.400">
                            Tipo de puesto: {sp.static_point ? "Estático" : "Dinámico"}
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                            Tipo de producto: {sp.product_type}
                        </Text>
                        {sp.zone && (
                            <Text fontSize="sm" color="gray.400">
                                Zona: {sp.zone}
                            </Text>
                        )}
            {isOwner && (
              <HStack gap={2} mt={3} justify="center">
                <Link to={`/editsellingPoint/${sp.id}`}>
                  <IconButton color="primary" size="small" aria-label="editar">
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  color="error"
                  size="small"
                  aria-label="eliminar"
                  onClick={() => openModal(sp.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </HStack>
            )}
          </Box>
        ))}
      </VStack>

      {isOwner && (
        <SPElimModal 
          isOpened={modalOpened} 
          sellingPoint={selectedSP} 
          openModal={openModal}
          onSuccess={loadUserSellingPoints}
        />
      )}
    </Box>
    )
}

export default UserProfile