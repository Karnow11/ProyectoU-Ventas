import { useEffect, useState } from 'react'
import type { sellingPoint } from "../types/sellingPoint.ts";
import axios from "axios"

const SP_list = () => {
    let [selling_points, setSellingPoints] = useState<sellingPoint[]>([])

    const getAllThreads = () => {
        axios.get("http://localhost:3001/api/selling_points").then((response) => {
            setSellingPoints(response.data)
        })
    }

    useEffect(() => {
        getAllThreads()
    }, [])

    return (
        <ul>
            {selling_points.map((sp) => (
                <li className = "sellingpoint-li" key ={sp.id}>
                    <div className = "sp-li-title">Nombre: {sp.name} - #{sp.id}</div>
                    <p>{sp.static_point ? 'Estático' : 'No estático'}</p>
                    <p>Tipo de producto: {sp.product_type}</p>
                </li>
                ))}
        </ul>
    )
}

export default SP_list