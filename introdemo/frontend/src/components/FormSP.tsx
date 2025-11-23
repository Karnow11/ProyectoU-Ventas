import { useState } from 'react';
import type { SPZone, ProductType } from "../types/sellingPoint";
import { useNavigate } from "react-router-dom";
import sellingPoints from '../services/sellingPointsApi';
import { SPStore } from '../store/SP_store';

const FormSP = () => {
  const [name, setName] = useState<string>("")
  const [static_dynamic, setStatic_dynamyc] = useState<boolean>(false)
  const [product_type, setProduct_type] = useState<ProductType>("Otro")
  const [description, setDescription] = useState<string>("")
  const [zone, setZone] = useState<SPZone | "">("")
  const navigate = useNavigate();

  const { fetchSP } = SPStore();

  const addNew = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (zone === "") {
      alert("Por favor selecciona una zona");
      return;
    }
    
    await sellingPoints.addSelling({
      name, 
      static_point: static_dynamic, 
      product_type, 
      description, 
      zone: zone as SPZone
    });
    
    await fetchSP();
    navigate("/sellingPointList");
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    } 

  const handleStaticChange = () => {
    setStatic_dynamyc(true);
    }   
  
  const handledynamicChange = () => {
    setStatic_dynamyc(false);
  }
  
  const handleProduct_typeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct_type(event.target.value as ProductType);
    } 

  
  const handledescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    } 
  const handleZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setZone(event.target.value as SPZone);
  }

  return (
    <>
    <div className='formSP-container'>
        <h1>Formulario de ventas</h1>
      <form onSubmit={addNew} className = "formSP">
          <label>
        Nombre de tienda <input type="text" value={name} onChange ={handleNameChange} required/>
          </label>
          <br></br>
          <label>Movilidad de la tienda: </label>
          <label>
        Estático<input name="myRadio" type="radio" onChange ={handleStaticChange}/>
          </label>
          <label>
        Móvil <input type="radio" name="myRadio" onChange ={handledynamicChange}/>
          </label>
          <br></br>
          <label>
            Tipo de producto o servicio 
            <select value={product_type} onChange={handleProduct_typeChange}>
              <option value="Comida">Comida</option>
              <option value="Libros">Libros</option>
              <option value="Manualidades">Manualidades</option>
              <option value="Ropa">Ropa</option>
              <option value="Otro">Otro</option>
              
            </select>
          </label>
        <br></br>
        <label>
        Zona de servicio 
        <select value={zone} onChange={handleZoneChange} required>
          <option value="">Selecciona una zona</option>
          <option value="Araña">Araña</option>
          <option value="Biblioteca">Biblioteca</option>
          <option value="Cafeta">Cafeta</option>
          <option value="Casino">Casino</option>
          <option value="Civil">Civil</option>
          <option value="Ebria">Ebria</option>
          <option value="Electrica">Electrica</option>
          <option value="Espada y Escudo">Espada y Escudo</option>
          <option value="Fisica">Fisica</option>
          <option value="Geologia">Geología</option>
          <option value="Hall Sur">Hall Sur</option>
          <option value="IDIEM">IDIEM</option>
          <option value="Industrias">Industrias</option>
          <option value="Minas">Minas</option>
          <option value="Quimica">Quimica</option>
          <option value="Salita Zone">Salita Zone</option>
          <option value="Socalo">Socalo</option>
          <option value="Tokki Zone">Tokki Zone</option>
        </select>
          </label>
        <br></br>
        <label>
        Descripcion <input type="text" value={description} onChange ={handledescriptionChange}/>
          </label>
        <br></br>
        <button type="submit">Enviar formulario</button>
      </form>
    </div>
    </>
  )
}

export default FormSP;