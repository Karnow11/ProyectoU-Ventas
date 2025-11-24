import React, { useEffect, useState, type ChangeEvent } from "react";
import type { sellingPoint } from "../types/sellingPoint.ts";
import type { User } from "../types/user.ts";
import api from "../utils/axiosSecure.ts";
import { Link } from "react-router-dom";
import type { Review } from "../types/review.ts";
import { UserStore } from "../store/user_store.ts";
import {
  Box,
  Heading,
  Input,
  Select,
  VStack,
  Text,
  createListCollection,
  type SelectValueChangeDetails,
} from "@chakra-ui/react";

interface Prop {
    sellingPoint: sellingPoint;
}

const QUALIFICATION_VALUES = ["0", "1", "2", "3", "4", "5"] as const;

const qualificationCollection = createListCollection({
  items: QUALIFICATION_VALUES.map((v) => ({
    label: v === "0" ? "---" : v,
    value: v,
  })),
});

const SellingPointComp = ({ sellingPoint } : Prop) => {
  const {user} = UserStore()
  const [creator, changeUser] = useState<User | null>(null)
  const [qualification, changeQualification] = useState(0)
  const [content, changeContent] = useState("")
  const [reviews, changeReviews] = useState<Review[]>([])

  useEffect(() => {

    api.get(`/api/users/${sellingPoint.user_id}`).then((response) => {
      changeUser(response.data);
    });

    api.get(`/api/reviews/sp/${sellingPoint.id}`).then((response) => {
      changeReviews(response.data.reviews);
    });
  }, [sellingPoint.user_id, sellingPoint.id]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const review = {
      qualification,
      content
    }

    await api.post(`/api/reviews/sp/${sellingPoint.id}`, review)

    const refreshed = await api.get(`/api/reviews/sp/${sellingPoint.id}`);
    changeReviews(refreshed.data.reviews);
    changeQualification(0);
    changeContent("");

  }

  const handleQualificationChange = (
    event: ChangeEvent<HTMLSelectElement>
  ) => {
    changeQualification(parseInt(event.target.value, 10));
  };

  const handleContentChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeContent(event.target.value);
  };

  const handleQualificationValueChange = ({
    value,
  }: SelectValueChangeDetails) => {
    const selected = value[0] ?? "0";

    const fakeEvent = {
      target: { value: selected },
    } as ChangeEvent<HTMLSelectElement>;

    handleQualificationChange(fakeEvent);
  };

  const containerClass = sellingPoint.static_point ? "static-comp" : "nonstatic-comp";

  const avg =
  reviews.length !== 0
    ? reviews.reduce((acum, rev) => rev.qualification + acum, 0) / reviews.length
    : null;
  
  return (
    <Box>
      <Box className={containerClass}>
        <Box className="point-title">
          <VStack align="start" gap={4}>
            <Text>
              - Nombre: {sellingPoint.name || "SellingPoint sin nombre"}
            </Text>
            <Text>
              - Vende:{" "}
              {sellingPoint.product_type}
            </Text>
            <Text>
              - Creador:{" "}
              <Link to={`/profile/${creator?.id}`}>{creator?.username}</Link>
            </Text>
            <Text>
              - 
              Punto:{" "}{sellingPoint.static_point ? "Estático" : "Dinámico"}
            </Text>
            <Text>
              - 
              Zona:{" "}{sellingPoint.zone}
            </Text>
            <Text>
              - 
              Descripción:
            </Text>
          <Text>{sellingPoint.description}</Text>
            <Text>
              Calificación de la comunidad:{" "}
              {avg !== null ? (
                <>
                  {avg}/5
                </>
              ) : (
                <>No hay Reseñas todavía</>
              )}
            </Text>
          </VStack>
        </Box>

       
        
        {(!user || sellingPoint.user_id === user?.id || reviews.reduce((acc, rev) => acc && (rev.user_id === user?.id), false)) ?
        <></> :
        <form onSubmit={onSubmit} className="point-title">
          {/* Falta verificar si el id del estado global esta en la lista
              para mostrar el form y evitar que el mismo usuario reseñe 2 veces */}
          <Heading as="h3" size="sm" mb={2}>
            Escribe una reseña
          </Heading>

          <label>
            Tu calificación:
            <Select.Root
              collection={qualificationCollection}
              value={[String(qualification)]}
              onValueChange={handleQualificationValueChange}
              style={{ marginLeft: "8px" }}
            >
              <Select.Label>Calificación</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText />
                </Select.Trigger>
                <Select.Indicator />
              </Select.Control>
              <Select.Positioner>
                <Select.Content>
                  {qualificationCollection.items.map((item) => (
                    <Select.Item item={item} key={item.value}>
                      {item.label}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select.Root>
          </label>

          <br />

          <Input
            type="text"
            value={content}
            onChange={handleContentChange}
            placeholder="Reseña"
            mt={2}
          />

          <br />

          <button type="submit">Enviar reseña</button>
        </form>}

        <Box className="point-title">
          <Heading as="h3" size="sm" mb={2}>
            Reseñas
          </Heading>
          {reviews.length !== 0 ? (
            <ul>
              {reviews.map((rev, idx) => (
                <li key={idx}>
                  <Text>Qualification: {rev.qualification}</Text>
                  <Text>{rev.content}</Text>
                </li>
              ))}
            </ul>
          ) : (
            <>No hay reseñas, escribe la primera!</>
          )}
        </Box>
      </Box>
    </Box>

  );
}

export default SellingPointComp;