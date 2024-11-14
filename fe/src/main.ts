import "./style.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  
    <div>
      <h1>Tutaj coś będzie kiedyś</h1>
    </div>
    
    <div id="map"></div>
 
`;

const map = L.map("map").setView([52.259788, 21.040546], 13);

// Load and display tile layer (OpenStreetMap tiles)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

type BusData = {
  lat: number;
  lon: number;
  lines: string;
  vehiclenumber: string;
  time: string;
  brigade: string;
};

const fetchBusData = async () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return (await response.json()) as { result: BusData[] };
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};
const renderBuses = async () => {
  const busData = await fetchBusData();
  busData?.result.forEach((element) => {
    const elementValues = Object.entries(element).map((value) => {
      return `${value[0]}: ${value[1]}`;
    });

    const marker = L.marker([element.lat, element.lon], {
      icon: new Icon({
        iconUrl: markerIconPng,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      }),
    }).addTo(map);
    marker.bindPopup(elementValues.join("<br/>"));
  });
};

renderBuses().then(() => console.log("Buses rendered")); //TODO do implementacji w dalszych taskach
