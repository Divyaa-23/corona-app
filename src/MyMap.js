import React from "react";
//import { MyMap as LeafletMap, TileLayer } from "react-leaflet";
import { LeafletMap,MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "./Map.css";
import "leaflet/dist/leaflet.css";

function MyMap({center,zoom}) {
  return (
    <div className="map">
    <MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/*  <Marker position={[	133.9391, 	107.7100]}>
      
       </Marker>  */}
    </MapContainer>
  </div> 
   
  );
}


export default MyMap;
