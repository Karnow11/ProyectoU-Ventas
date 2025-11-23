import { useState } from 'react';
import axios from "axios";
import type { sellingPoint } from "../types/sellingPoint.tsx";
import { useNavigate } from "react-router-dom";

const FormSP = () => {
  const [name, setName] = useState<string>("");
  const [static_dynamic, setStatic_dynamyc] = useState<boolean>(true);
  const [product_type, setProduct_type] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [validateFormMessage, setValidateFormMessage] = useState<string | null>(null);  
  const navigate = useNavigate();

  const addSelling = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sellingObject: Omit <sellingPoint, "id"> = {
      name: name,
      static_point: static_dynamic,
      product_type: product_type,
      description: description
    }

    axios.post("http://localhost:3001/api/selling_points", sellingObject).then(() => { 
      navigate("/sellingPointList")}
    ).catch((error) => {
      setValidateFormMessage("Error al mandar formulario" );

      setTimeout(() => {
        setValidateFormMessage(null);
      }, 3000);
    });
  }
/*
  const validateForm = () => {
    if (name.length < 3 || name.length > 30) {
      setValidateFormMessage("nombre");
      console.log("nombre incorrecto"); 
    }
    if (!static_dynamic) {
      setValidateFormMessage( validateFormMessage + " punto del servicio"); 
      console.log("punto de servicio incorrecto");
    }
    if (!product_type) {  
      setValidateFormMessage(validateFormMessage + " tipo de servicio o producto"); 
      console.log("tipo de servicio o producto incorrecto");
    }
    if (description.length < 10 || description.length > 50) {
      setValidateFormMessage(validateFormMessage + " descripcion"); 
      console.log("descripcion incorrecto");
    }
    if (validateFormMessage !== null || validateFormMessage) {
      setValidateFormMessage("Error en los siguientes campos: "+ validateFormMessage); 
      console.log("Error en el formulario");
    }  
  }
*/

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
        <p style={{ color: "red" }}>{validateFormMessage}</p>
      <form onSubmit={addSelling} className = "formSP">
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