import { useState } from 'react';
import type { SPZone, ProductType } from "../types/sellingPoint";
import { PRODUCT_TYPES, SP_ZONES } from "../types/sellingPoint"
import { useNavigate } from "react-router-dom";
import sellingPoints from '../services/sellingPointsApi';
import { SPStore } from '../store/SP_store';
import {
  Box,
  Button,
  Heading,
  Input,
  Select,
  Text,
  VStack,
  HStack,
  createListCollection,
  type SelectValueChangeDetails
} from "@chakra-ui/react";

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
  

  const handleProductTypeValueChange = ({
    value,
  }: SelectValueChangeDetails) => {
    const selected = (value[0] ?? "Otro") as ProductType;

    const fakeEvent = {
      target: { value: selected },
    } as React.ChangeEvent<HTMLSelectElement>;

    handleProduct_typeChange(fakeEvent);
  };  
  
  const handledescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    } 
    
  const handleZoneChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setZone(event.target.value as SPZone);
  }

  const handleZoneValueChange = ({ value }: SelectValueChangeDetails) => {
    const selected = (value[0] ?? "") as SPZone | "";

    const fakeEvent = {
      target: { value: selected },
    } as React.ChangeEvent<HTMLSelectElement>;

    handleZoneChange(fakeEvent);
  };

  const productTypeCollection = createListCollection({
    items: PRODUCT_TYPES.map((v) => ({ label: v, value: v })),
  });
  
  const zoneCollection = createListCollection({
    items: SP_ZONES.map((v) => ({ label: v, value: v })),
  });

  return (
    <Box backgroundColor="#303030" color="gray.300" className="formSP-container">
      <Heading as="h1" size="md" mb={4}>
        Formulario de ventas
      </Heading>

      <form onSubmit={addNew} className="formSP">
        <VStack align="stretch" gap={4}>
          <Box>
            <Text mb={1}>Nombre de tienda</Text>
            <Input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
            />
          </Box>

          <Box>
            <Text mb={1}>Movilidad de la tienda:</Text>
            <HStack gap={4}>
              <label>
                Estático{" "}
                <input
                  name="myRadio"
                  type="radio"
                  onChange={handleStaticChange}
                />
              </label>
              <label>
                Móvil{" "}
                <input
                  name="myRadio"
                  type="radio"
                  onChange={handledynamicChange}
                />
              </label>
            </HStack>
          </Box>

          <Box>
            <Text mb={1}>Tipo de producto o servicio</Text>
            <Select.Root
            collection={productTypeCollection}
            color={"gray.700"}
            value={product_type ? [product_type] : []}
            onValueChange={handleProductTypeValueChange}
          >
            <Select.Label>Tipo de producto o servicio</Select.Label>
            <Select.Control>
              <Select.Trigger backgroundColor="white">
                <Select.ValueText placeholder="Selecciona una opción" />
              </Select.Trigger>
              <Select.Indicator />
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {productTypeCollection.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
          </Box>

          <Box>
            <Text mb={1}>Zona de servicio</Text>
            <Select.Root
              color={"gray.700"}
              collection={zoneCollection}
              value={zone ? [zone] : []}
              onValueChange={handleZoneValueChange}
            >
            <Select.Label>Zona</Select.Label>
            <Select.Control>
              <Select.Trigger backgroundColor="white">
                <Select.ValueText color="gray.700" placeholder="Selecciona una zona" />
              </Select.Trigger>
              <Select.Indicator />
            </Select.Control>
            <Select.Positioner>
              <Select.Content>
                {zoneCollection.items.map((item) => (
                  <Select.Item item={item} key={item.value}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
          </Box>

          <Box>
            <Text mb={1}>Descripción</Text>
            <Input
              type="text"
              value={description}
              onChange={handledescriptionChange}
            />
          </Box>

          <Button type="submit" alignSelf="flex-start">
            Enviar formulario
          </Button>
        </VStack>
      </form>
    </Box>

    
  )
}

export default FormSP;