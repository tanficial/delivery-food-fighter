import { useState } from "react"
import styled from "styled-components"
import Layout from "../components/layout/Layout"
import { DescBox, MainTitle, MenuName } from "../components/skeleton/AnalysisContents"
import { colors } from "../styles/theme"
import { ContentsBox, NotMapBox } from "../styles/container"

import { getCurrentUserInfo } from "../apis/authApi"

export const Bold = styled.span`
  font-weight: bold;
`
const Comment = styled.span`
  display: block;
  font-size: 1.25rem;
  font-weight: bold;
  padding: 0.5rem 0 0.25rem;
  color: ${colors.black600};
`

const Home = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUserInfo())
  return (
    <Layout isMap={false} currentUser={currentUser} setCurrentUser={setCurrentUser}>
      <NotMapBox>
        <MenuName>배달 정보 타파 서비스!</MenuName>
        <MainTitle>
          <span>딜리버리 푸드 파이터</span>에서
          <br />
          배달의 모든 것을 알아보아요
        </MainTitle>
        <DescBox>
          <p>
            <Comment> &#127828; 허한 마음은 음식으로 달래야지!</Comment>
            코로나 이후 꼼짝없이 집에 갇혀버린 우리들, 집에서 모든 것을 해결하는 것이 일상이
            되었습니다.
            <br />
            집에서 삼시 세끼 챙겨 먹기는 왜 이렇게 어렵고 귀찮을까요? <br />
            어느새 배달 앱을 열고 메뉴를 고르고 있는 나를 발견하고 있진 않나요?
            <br />
            <br />
            <Comment> &#10068; 그래서 요즘 배달은 어떤데?</Comment>
            <Bold>딜리버리 푸드 파이터</Bold>는 코로나 이후 배달이 일상이 되어버린 우리들을 위해
            대한민국의 다양한
            <br />
            배달 데이터를 분석하고 최근 배달 시장이 어떻게 흘러가는지 보여주는 데이터 분석
            서비스입니다.
            <br />
            <br />
            <Comment> &#128566; 별로 재미 없을듯..</Comment>
            <Bold>그렇지 않아요!</Bold> <br />
            나의 궁금증을 콕콕 건드리는 딜푸파의 글을 보고, 돌림판으로 오늘의 메뉴를 골라보세요.
            <br />
            수많은 쩝쩝박사들이 공유하는 다양한 꿀팁도 하나씩 읽다보면 어느새 시간이 훌쩍 지나 있을
            거에요!
          </p>
        </DescBox>
      </NotMapBox>
    </Layout>
  )
}

export default Home
