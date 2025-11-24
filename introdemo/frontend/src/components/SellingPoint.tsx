import React, { useEffect, useState, type ChangeEvent } from "react";
import type { sellingPoint } from "../types/sellingPoint.ts";
import type { User } from "../types/user.ts";
import api from "../utils/axiosSecure.ts";
import { Link } from "react-router-dom";
import type { Review } from "../types/review.ts";
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
  const [user, changeUser] = useState<User | null>(null)
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

    /*await api.post(`/api/reviews/sp/${sellingPoint.id}`, review).then(() => {
      api.get(`/api/reviews/sp/${sellingPoint.id}`).then((response) => {
        changeReviews(response.data.reviews);
      });
      changeQualification(0)
      changeContent("")
    })*/
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
              <Link to={`/profile/${user?.id}`}>{user?.username}</Link>
            </Text>
            <Text>
              - 
              Punto:{" "}{sellingPoint.static_point ? "Estático" : "Dinámico"}
            </Text>
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

        <Box className="sellingPoint-content">
          <Text>{sellingPoint.description}</Text>
        </Box>

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
        </form>

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

    /*
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
        {/*Falta verificar si el id del estado global esta en la lista para mostrar el form y eveitar que el mismo usuario reseñe 2 veces*//*}
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
    */
  );
}

export default SellingPointComp;