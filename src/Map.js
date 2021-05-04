
import React from "react";
import { MapContainer as LeafletMap, TileLayer, useMap} from "react-leaflet"
import "./Map.css";
import {useStateValue} from "./StateProvider";
import {showCircle} from "./utils"
 

function Map({countries}) {
  const [{countryData}, dispacher] = useStateValue();

  function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
  }
  return (
    <div className="map">
      
      <LeafletMap minZoom={2} maxBounds = {[[-90,-180],   [90,180]]}>
      <ChangeView center={countryData.hasOwnProperty('countryInfo') ?  [countryData.countryInfo.lat, countryData.countryInfo.long] :
      [0,0]} zoom={countryData.hasOwnProperty('countryInfo') ? 4:2}  />
        <TileLayer
          noWrap={true}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showCircle(countries, 'cases')}
      </LeafletMap>
    </div>
  );
}

export default Map;