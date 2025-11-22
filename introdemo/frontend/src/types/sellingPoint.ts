export type SPZone = "Otro"|"Casino"|"Salita Zone"|"Tokki Zone"|"Biblioteca"|"Hall Sur"|"Socalo"|"Cafeta"|"Quimica"|"Minas"|"Ebria"|"Espada y Escudo"|"Fisica"|"Araña"|"Electrica"|"Civil"|"Geología"|"IDIEM"|"Industrias";
export type ProductType = "Otro"|"Comida"|"Ropa"|"Manualidades"|"Libros"
export type sellingPoint = {
    id: string;
    static_point: boolean;
    name: string;
    description: string;
    product_type: ProductType;
    zone?: SPZone;
};