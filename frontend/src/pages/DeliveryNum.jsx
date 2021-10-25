import { useState, useEffect } from "react"
import Layout from "../components/layout/Layout"
import AnalysisContents from "../components/skeleton/AnalysisContents"

import { geodataListRequest, orderGraphByIdRequest } from "../apis/geodataApi"
import { getCurrentUserInfo } from "../apis/authApi"
import mapJSON from "../data/korea_region.json"

const DeliveryNum = () => {
  const [pickedGeoData, setPickedGeoData] = useState()
  const [wideRegionData, setWideRegionData] = useState()
  const [mapFeatures, setMapFeatures] = useState()
  const [currentUser, setCurrentUser] = useState(getCurrentUserInfo())

  useEffect(() => {
    const fetchData = async () => {
      const geodata = await geodataListRequest()
      const wideId = geodata.data.find(d => d.location1 === "전국").id
      const wideData = await orderGraphByIdRequest(wideId)

      const enrichedMapFeatures = mapJSON.features.map(element => {
        const geoID = geodata.data.find(d => d.location1 === element.properties.CTP_KOR_NM).id
        element.properties.ID = geoID
        return element
      })

      setMapFeatures(enrichedMapFeatures)
      setWideRegionData(wideData.data)
    }
    fetchData()
  }, [])

  return (
    <Layout isMap={true} changePickedRegion={setPickedGeoData} mapFeatures={mapFeatures} currentUser={currentUser} setCurrentUser={setCurrentUser}>
      {wideRegionData && <AnalysisContents data={pickedGeoData ? pickedGeoData : wideRegionData} />}
    </Layout>
  )
}

export default DeliveryNum
