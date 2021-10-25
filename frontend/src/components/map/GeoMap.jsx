import { useMap, useMapEvent, GeoJSON, Popup } from "react-leaflet"
import { orderGraphByIdRequest } from "../../apis/geodataApi"
import { useState, useRef } from "react"
import { colors } from "../../styles/theme"
import PopupMark from "./PopupMark"

const setHover = e => {
  e.target.setStyle({
    fillOpacity: e.type === "mouseover" ? 0.5 : 0.2,
  })
}

const GeoMap = ({ changePickedRegion, style, data }) => {
  const mapRef = useRef()
  const map = useMap()
  const [position, setPosition] = useState(null)
  const [regionName, setRegionName] = useState(null)

  const onEachRegion = (feature, layer) => {
    const graphTest = async id => {
      const result = await orderGraphByIdRequest(id)
      return result.data
    }

    const handleRegionClick = e => {
      const _regionName = feature.properties.CTP_KOR_NM
      const regionNum = feature.properties.CTPRVN_CD
      const regionID = feature.properties.ID // undefined라고 뜸
      const regionBounds = layer._bounds
      const regionCenter = regionBounds.getCenter()

      setRegionName(_regionName)

      mapRef.current.setStyle({
        fillColor: colors.yellow200,
      })

      e.target.setStyle({
        fillColor: colors.black900,
        fillOpacity: 0.5,
      })

      if (typeof changePickedRegion === "function") {
        graphTest(regionID).then(data => {
          changePickedRegion(data)
        })
      }

      setPosition(e.latlng)

      // 클릭 시 해당 지역으로 줌 인
      // map.fitBounds(regionBounds)
    }

    layer.on({
      click: handleRegionClick,
      mouseover: setHover,
      mouseout: setHover,
    })
  }

  return (
    <>
      <GeoJSON ref={mapRef} style={style} data={data} onEachFeature={onEachRegion}></GeoJSON>
      {position && <PopupMark name={regionName} position={position} />}
    </>
  )
}

export default GeoMap
