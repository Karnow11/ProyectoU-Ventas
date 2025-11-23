import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import type { User } from "../types/user"
import api from "../utils/axiosSecure"
import type { sellingPoint } from "../types/sellingPoint"

const UserProfile = () => {
    const {id} = useParams()
    const [user, changeUser] = useState<User | null>(null)
    const [selling_points, changeSP] = useState<sellingPoint[]>([])

    useEffect( () => {

        api.get(`/api/users/${id}`).then((response) => {
          changeUser(response.data);
        });

        api.get(`/api/selling_points/user/${id}`).then((response) => {
            changeSP(response.data)
        })
    }, [id]);

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
                </li>
                ))}
            </ul>
        </div>
    )
}

export default UserProfile