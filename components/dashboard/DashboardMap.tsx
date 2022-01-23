import { useState } from "react";
import ReactMapGL from "react-map-gl";
const DashboarMap = () => {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    // The latitude and longitude of the center of London
    latitude: 51.5074,
    longitude: -0.1278,
    zoom: 10,
  });

  return (
    <ReactMapGL
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxApiAccessToken={
        "pk.eyJ1IjoidHJhY2tpbmcxMjEyIiwiYSI6ImNreWdyaGJ5aTBnbW8zMnFuejc2YnFxbG8ifQ.DhHZV81yuKczvH29K9qkDw"
      }
      {...viewport}
      onViewportChange={(nextViewport: any) => setViewport(nextViewport)}
    ></ReactMapGL>
  );
};
export default DashboarMap;
