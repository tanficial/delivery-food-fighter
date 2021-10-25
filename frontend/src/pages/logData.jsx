import Layout from "../components/layout/Layout"
import LogAnalysisContents from "../components/skeleton/LogAnalysisContents"
import React, { useState } from "react"
import { NotMapBox } from "../styles/container"
import { getCurrentUserInfo } from "../apis/authApi"

const LogData = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUserInfo())

  return (
    <Layout isMap={false} currentUser={currentUser} setCurrentUser={setCurrentUser}>
      <NotMapBox>
        <LogAnalysisContents />
      </NotMapBox>
    </Layout>
  )
}

export default LogData
