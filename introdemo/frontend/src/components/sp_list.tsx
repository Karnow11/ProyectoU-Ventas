// src/components/SPList.tsx
import { useEffect, useMemo, useState } from "react";
import type { sellingPoint } from "../types/sellingPoint";
import { Link, useSearchParams } from "react-router-dom";
import api from "../utils/axiosSecure";
import {
  Box,
  Button,
  Text,
  VStack,
  Heading
} from "@chakra-ui/react";

type Mode = "all" | "static" | "dynamic";

interface Props {
  initialMode?: Mode;
}

export default function SPList({ initialMode }: Props) {
  const [items, setItems] = useState<sellingPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const urlMode = (searchParams.get("mode") as Mode) || "all";

  const [mode, setMode] = useState<Mode>(initialMode ?? urlMode);

  useEffect(() => {
    if (!initialMode && urlMode !== mode) setMode(urlMode);
  }, [urlMode]);

  useEffect(() => {
    let on = true;
    setLoading(true);
    api
      .get("/api/selling_points")
      .then((r) => on && setItems(r.data))
      .catch((e) => on && setErr(e?.message ?? "Error cargando puntos"))
      .finally(() => on && setLoading(false));
    return () => {
      on = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (mode === "all") return items;
    if (mode === "static") return items.filter((sp) => sp.static_point);
    return items.filter((sp) => !sp.static_point);
  }, [items, mode]);

  const setModeBoth = (m: Mode) => {
    setMode(m);
    if (m === "all") {
      searchParams.delete("mode");
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ mode: m }, { replace: true });
    }
  };

  return (
    <Box>
      {/* Switch de modos */}
      <Box display="inline-flex" gap={2} mb={3}>
        {(["all", "static", "dynamic"] as Mode[]).map((m) => {
          const label =
            m === "all" ? "Todos" : m === "static" ? "Estáticos" : "Dinámicos";
          const active = mode === m;
          return (
            <Button
              key={m}
              type="button"
              onClick={() => setModeBoth(m)}
              aria-pressed={active}
              size="sm"
              variant={active ? "solid" : "outline"}
              colorPalette="teal"
            >
              {label}
            </Button>
          );
        })}
      </Box>

      {/* Contenido */}
      {loading && <Text>Cargando...</Text>}
      {err && <Text color="red.500">{err}</Text>}
      {!loading && !err && (
        <>
          {!filtered.length ? (
            <Text>No hay puntos para mostrar.</Text>
          ) : (
            

            <VStack gap={4} align="stretch">
                {filtered.map((sp) => (
                    <Box
                        key={sp.id}
                        p={4}
                        borderWidth="1px"
                        borderRadius="md"
                        borderColor="gray.600"
                        _hover={{ borderColor: "gray.700", shadow: "sm" }}
                        transition="all 0.2s"
                    >
                        <Link to={`/sellingPoint/${sp.id}`}>
                            <Heading as="h4" size="sm" color="#ffb5df" mb={2}>
                                {sp.name}
                            </Heading>
                        </Link>
                        <Text fontSize="sm" color="gray.400">
                            Tipo de puesto: {sp.static_point ? "Estático" : "Dinámico"}
                        </Text>
                        <Text fontSize="sm" color="gray.400">
                            Tipo de producto: {sp.product_type}
                        </Text>
                        {sp.zone && (
                            <Text fontSize="sm" color="gray.400">
                                Zona: {sp.zone}
                            </Text>
                        )}
                    </Box>
                ))}
            </VStack>
          )}
        </>
      )}
    </Box>
  );
}