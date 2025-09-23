import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import type { Selling } from "../src/types/selling";

function App() {
  const [name, setName] = useState<string>("")
  const [static_dynamic, setStatic_dynamyc] = useState<string>("")
  const [product_type, setProduct_type] = useState<string>("")
  const [description, setDescription] = useState<string>("")


  const addSelling = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const sellingObject: Omit <Selling, "id"> = {
      name: name,
      static_dynamic: static_dynamic,
      product_type: product_type,
      description: description
    }

    axios.post("http://localhost:3001/ceilling_points", sellingObject).then((request) => {})
    //console.log("nombre form: " + name)
    
    //console.log("punto del form: " + static_dynamic)
    
    //console.log("tipo producto form: " + product_type)

    //console.log("descripcion form: " + description)
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    } 

  const handleStaticChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatic_dynamyc("estatico");
    }   
  
  const handledynamicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatic_dynamyc("dinamico");
  }
  
  const handleProduct_typeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProduct_type(event.target.value);
    } 

  
  const handledescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    } 

  return (
    <>
    <div>
        <h1>Formulario de ventas de la facultad</h1>
      <form onSubmit={addSelling}>
          <label>
        nombre de tienda <input type="text" value={name} onChange ={handleNameChange}/>
          </label>
          <br></br>
          <label>movilidad de la tienda: </label>
          <label>
        estático<input name="myRadio" type="radio" value={static_dynamic} onChange ={handleStaticChange}/>
          </label>
          <label>
        móvil <input type="radio" name="myRadio" value={static_dynamic} onChange ={handledynamicChange}/>
          </label>
          <br></br>
          <label>
        tipo de producto o servicio <input type="text" value={product_type} onChange ={handleProduct_typeChange}/>
          </label>
        <br></br>
        <label>
        descripcion <input type="text" value={description} onChange ={handledescriptionChange}/>
          </label>
        <br></br>
        <button type="submit">enviar formulario</button>
      </form>
    </div>
    </>
  )
}

export default App
