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

const UserProfile = () => {
    const {id} = useParams()
    const [user, changeUser] = useState<User | null>(null)
    const [selling_points, changeSP] = useState<sellingPoint[]>([])
    const { openedSP, modalOpened, openModal } = SPStore();

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

    return (
        <div>
            <h1>{user?.username}</h1>
            <p>e-mail: {user?.email}</p>
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
                </li>
                ))}
            </ul>
            <SPElimModal 
                isOpened={modalOpened} 
                sellingPoint={selectedSP} 
                openModal={openModal}
                onSuccess={loadUserSellingPoints}
            />
        </div>
    )
}

export default UserProfile