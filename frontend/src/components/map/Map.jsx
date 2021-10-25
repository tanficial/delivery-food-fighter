import { MapContainer, LayersControl, TileLayer } from "react-leaflet"
import mapData from "../../data/korea_region.json"
import { colors } from "../../styles/theme"
import { styleId, userId, token } from "../../data/map_key"
import GeoMap from "./GeoMap"

const mapStyle = {
  height: "100%",
}

const regionStyle = {
  fillColor: colors.yellow200,
  color: colors.yellow200,
}

const Map = ({ changePickedRegion, mapFeatures }) => {
  return (
    <>
      <MapContainer
        style={mapStyle}
        center={[36.0, 127.51]}
        zoom={7}
        scrollWheelZoom={true}
        zoomSnap={0.1}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
            <TileLayer
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
              url={`https://api.mapbox.com/styles/v1/${userId}/${styleId}/tiles/256/{z}/{x}/{y}@2x?access_token=${token}`}
            />
          </LayersControl.BaseLayer>
          <LayersControl.Overlay checked name="geoJSON">
            <GeoMap
              style={regionStyle}
              data={mapFeatures ? mapFeatures : mapData.features}
              changePickedRegion={changePickedRegion}
            />
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>
    </>
  )
}

export default Map
