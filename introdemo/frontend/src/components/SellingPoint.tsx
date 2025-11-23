import React, { useEffect, useState } from "react";
import type { SellingPoint } from "../types/sellingPoint.ts";
import type { User } from "../types/user.ts";
import api from "../utils/axiosSecure.ts";
import { Link } from "react-router-dom";
import type { Review } from "../types/review.ts";
import { TextField } from "@mui/material";

interface Prop {
    sellingPoint: SellingPoint;
}

const SellingPointComp = ({ sellingPoint } : Prop) => {
  const [user, changeUser] = useState<User | null>(null)
  const [qualification, changeQualification] = useState(0)
  const [content, changeContent] = useState("")
  const [reviews, changeReviews] = useState<Review[]>([])

  useEffect(() => {
    api.get(`/api/users/${sellingPoint.user_id}`).then((response) => {
      changeUser(response.data);
    });

    api.get(`/api/reviews/sp/${sellingPoint.user_id}`).then((response) => {
      changeReviews(response.data.reviews);
    });
  }, []);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const review = {
      qualification,
      content
    }

    await api.post(`/api/reviews/sp/${sellingPoint.user_id}`, review).then(() => {
      api.get(`/api/reviews/sp/${sellingPoint.user_id}`).then((response) => {
        changeReviews(response.data.reviews);
      });
      changeQualification(0)
      changeContent("")
    })
  }

  const containerClass = sellingPoint.static_point ? "static-comp" : "nonstatic-comp";
  
  return (
    <div>
      <div className={containerClass}>
        <div className='point-title'>
          <p>- Nombre: {sellingPoint.name || "SellingPoint sin nombre"} - Vende: {sellingPoint.product_type}</p>
          <p>- Creador: <Link to = {`/profile/${user?.id}`}>{user?.username}</Link></p>
          <p>{sellingPoint.static_point ? "Estatico" : "Dinamico"} - #{sellingPoint.id}</p>
          <p>Calificación de la comunidad: {reviews.length !== 0 ? <>{reviews.reduce((acum, rev) => rev.qualification + acum, 0) / reviews.length}/5</> : <>No hay Reseñas todavía</>}</p>
        </div>
        <div className='sellingPoint-content'>
          <p>{sellingPoint.description}</p>
        </div>
        <form onSubmit={onSubmit} className='point-title'>
          <h3>Escribe una reseña</h3>
          <label>
            Tu calificación:
            <select value={qualification} onChange={(event: React.ChangeEvent<HTMLSelectElement>) => changeQualification(parseInt(event.target.value))}>
              <option value={0}>---</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>
          <br />
          <TextField type="text" value={content} onChange={(event: React.ChangeEvent<HTMLInputElement>) => changeContent(event.target.value)} placeholder='Reseña' />
          <br />
          <button type="submit">Enviar reseña</button>
        </form>
        <div className='point-title'>
          <h3>Reseñas</h3>
          {reviews.length !== 0 ?
          <ul>
            {reviews.map((rev, id) => (
              <li key={id}>
                <p>Qualification: {rev.qualification}</p>
                <p>{rev.content}</p>
              </li>
            ))}
          </ul> :
          <>No hay reseñas, escribe la primera!</>}
        </div>
      </div>
    </div>
  );
}

export default SellingPointComp;