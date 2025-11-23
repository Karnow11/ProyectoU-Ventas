import { useEffect, useState } from "react";
import type { SellingPoint } from "../types/sellingPoint.ts";
import type { User } from "../types/user.ts";
import api from "../utils/axiosSecure.ts";
import { Link } from "react-router-dom";

interface Prop {
    sellingPoint: SellingPoint;
}

const SellingPointComp = ({ sellingPoint } : Prop) => {
  const [user, changeUser] = useState<User | null>(null)

  useEffect(() => {
    api.get(`/api/users/${sellingPoint.user_id}`).then((response) => {
      changeUser(response.data);
    });
  }, []);

  const containerClass = sellingPoint.static_point ? "static-comp" : "nonstatic-comp";

  return (
    <div>
      <div className={containerClass}>
        <div className='point-title'>
        <p>- Nombre: {sellingPoint.name || "SellingPoint sin nombre"} - Vende: {sellingPoint.product_type}</p>
        <p>- Creador: <Link to = {`/profile/${user?.id}`}>{user?.username}</Link></p>
        <p>{sellingPoint.static_point ? "Estatico" : "Dinamico"} - #{sellingPoint.id}</p>
        </div>
        <div className='sellingPoint-content'>
          <p>{sellingPoint.description}</p>
        </div>
      </div>
    </div>
  );
}

export default SellingPointComp;