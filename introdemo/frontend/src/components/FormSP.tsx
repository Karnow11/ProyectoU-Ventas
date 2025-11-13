import { useState } from 'react';
import axios from "axios";
import type { sellingPoint } from "../types/sellingPoint.tsx";
import { useNavigate } from "react-router-dom";
import sellingPoints from '../services/sellingPoints.ts';

const FormSP = () => {
  const [name, setName] = useState<string>("")
  const [static_dynamic, setStatic_dynamyc] = useState<boolean>(false)
  const [product_type, setProduct_type] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const navigate = useNavigate();


  const addNew = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sellingPoints.addSelling({name, static_point: static_dynamic, product_type, description}).then(() => { navigate("/sellingPointList")})
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
  
  const handleProduct_typeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct_type(event.target.value);
    } 

  
  const handledescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    } 

  return (
    <>
    <div className='formSP-container'>
        <h1>Formulario de ventas</h1>
      <form onSubmit={addNew} className = "formSP">
          <label>
        Nombre de tienda <input type="text" value={name} onChange ={handleNameChange}/>
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
        Tipo de producto o servicio <input type="text" value={product_type} onChange ={handleProduct_typeChange}/>
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