import type { sellingPoint } from "../types/sellingPoint.ts";

interface Prop {
    sellingPoint: sellingPoint;
}

const SellingPointComp = ({ sellingPoint } : Prop) => {
  const containerClass = sellingPoint.static_point ? "static-comp" : "nonstatic-comp";
  return (
    <div>
      <div className={containerClass}>
        <div className='point-title'>
        <p>- Nombre: {sellingPoint.name || "SellingPoint sin nombre"} - Vende: {sellingPoint.product_type}</p>
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