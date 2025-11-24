import { MapContainer, ImageOverlay, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { SPStore } from '../store/SP_store';
import { Link } from "react-router-dom";
import { useEffect } from 'react';

// Configurar iconos de Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import type { SPZone } from '../types/sellingPoint';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapStaticSP = () => {
  const { SP, filterZone, changeFilterZone, fetchSP } = SPStore();

  useEffect(() => {
    fetchSP();
  }, [fetchSP]);

  return (
    <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", width: "2000px"}}>
      <div className="map-view">
        <MapContainer
          crs={L.CRS.Simple}
          center={[512, 292.5]}
          zoom={0}
          style={{ height: "1024px", width: "585px" }}
        >
          <ImageOverlay
            url="/mapafcfm2018.jpg"
            bounds={[[0, 0], [1024, 585]]}
          />
          <Marker position={[340, 60]} eventHandlers={{click: () => changeFilterZone("Casino" as SPZone)}}>
            <Popup offset={[0, -40]}>Casino</Popup>
          </Marker>
          <Marker position={[60, 130]} eventHandlers={{click: () => changeFilterZone("Salita Zone" as SPZone)}}>
            <Popup offset={[0, -40]}>Salita Zone</Popup>
          </Marker>
          <Marker position={[25, 200]} eventHandlers={{click: () => changeFilterZone("Tokki Zone" as SPZone)}}>
            <Popup offset={[0, -40]}>Tokki Zone</Popup>
          </Marker>
          <Marker position={[280, 180]} eventHandlers={{click: () => changeFilterZone("Biblioteca" as SPZone)}}>
            <Popup offset={[0, -40]}>Biblioteca</Popup>
          </Marker>
          <Marker position={[280, 450]} eventHandlers={{click: () => changeFilterZone("Hall Sur" as SPZone)}}>
            <Popup offset={[0, -40]}>Hall Sur</Popup>
          </Marker>
          <Marker position={[280, 400]} eventHandlers={{click: () => changeFilterZone("Socalo" as SPZone)}}>
            <Popup offset={[0, -40]}>Socalo</Popup>
          </Marker>
          <Marker position={[330, 313]} eventHandlers={{click: () => changeFilterZone("Cafeta" as SPZone)}}>
            <Popup offset={[0, -40]}>Cafeta</Popup>
          </Marker>
          <Marker position={[460, 430]} eventHandlers={{click: () => changeFilterZone("Quimica" as SPZone)}}>
            <Popup offset={[0, -40]}>Quimica</Popup>
          </Marker>
          <Marker position={[460, 460]} eventHandlers={{click: () => changeFilterZone("Minas" as SPZone)}}>
            <Popup offset={[0, -40]}>Minas</Popup>
          </Marker>
          <Marker position={[460, 310]} eventHandlers={{click: () => changeFilterZone("Ebria" as SPZone)}}>
            <Popup offset={[0, -40]}>Ebria</Popup>
          </Marker>
          <Marker position={[550, 310]} eventHandlers={{click: () => changeFilterZone("Espada y Escudo" as SPZone)}}>
            <Popup offset={[0, -40]}>Espada y Escudo</Popup>
          </Marker>
          <Marker position={[470, 170]} eventHandlers={{click: () => changeFilterZone("Fisica" as SPZone)}}>
            <Popup offset={[0, -40]}>Fisica</Popup>
          </Marker>
          <Marker position={[70, 480]} eventHandlers={{click: () => changeFilterZone("Araña" as SPZone)}}>
            <Popup offset={[0, -40]}>Araña</Popup>
          </Marker>
          <Marker position={[650, 390]} eventHandlers={{click: () => changeFilterZone("Electrica" as SPZone)}}>
            <Popup offset={[0, -40]}>Electrica</Popup>
          </Marker>
          <Marker position={[690, 220]} eventHandlers={{click: () => changeFilterZone("Civil" as SPZone)}}>
            <Popup offset={[0, -40]}>Civil</Popup>
          </Marker>
          <Marker position={[850, 180]} eventHandlers={{click: () => changeFilterZone("Geologia" as SPZone)}}>
            <Popup offset={[0, -40]}>Geología</Popup>
          </Marker>
          <Marker position={[850, 410]} eventHandlers={{click: () => changeFilterZone("IDIEM" as SPZone)}}>
            <Popup offset={[0, -40]}>IDIEM</Popup>
          </Marker>
          <Marker position={[120, 350]} eventHandlers={{click: () => changeFilterZone("Industrias" as SPZone)}}>
            <Popup offset={[0, -40]}>Industrias</Popup>
          </Marker>
        </MapContainer>

        <div>
          <ul>
            <h3>{filterZone || "Todas las zonas"}</h3>
            {SP?.map((sp) => (
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
        </div>
      </div>
    </div>
  );
};

export default MapStaticSP;