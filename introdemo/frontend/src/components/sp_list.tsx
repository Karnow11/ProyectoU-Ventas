// src/components/SPList.tsx
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import type { sellingPoint } from "../types/sellingPoint";
import { Link, useSearchParams } from "react-router-dom";

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
    axios
      .get("http://localhost:3001/api/selling_points")
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
    <div>
      {/* Switch de modos */}
      <div style={{ display: "inline-flex", gap: 8, marginBottom: 12 }}>
        {(["all", "static", "dynamic"] as Mode[]).map((m) => {
          const label = m === "all" ? "Todos" : m === "static" ? "Estáticos" : "Dinámicos";
          const active = mode === m;
          return (
            <button
              key={m}
              type="button"
              onClick={() => setModeBoth(m)}
              aria-pressed={active}
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #777777",
                cursor: "pointer",
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Contenido */}
      {loading && <p>Cargando...</p>}
      {err && <p style={{ color: "crimson" }}>{err}</p>}
      {!loading && !err && (
        <>
          {!filtered.length ? (
            <p>No hay puntos para mostrar.</p>
          ) : (
            <ul>
              {filtered.map((sp) => (
                <li className="sellingpoint-li" key={sp.id}>
                  <div className="sp-li-title">
                    <Link to={`/sellingPoint/${sp.id}`}>
                      Nombre: {sp.name} — #{sp.id}
                    </Link>
                  </div>
                  <p>Tipo de puesto: {sp.static_point ? "Estático" : "Dinámico"}</p>
                  <p>Tipo de producto: {sp.product_type}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
}