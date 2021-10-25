import { useState } from "react"
import { Bold } from "./Home"
import Layout from "../components/layout/Layout"
import { Wrapper } from "../data/show_data_nivo/show_intro_data"
import ShowIntroData from "../data/show_data_nivo/show_intro_data"
import { DescBox, MainTitle, MenuName } from "../components/skeleton/AnalysisContents"
import { NotMapBox } from "../styles/container"
import { getCurrentUserInfo } from "../apis/authApi"

const Intro = () => {
  const [currentUser, setCurrentUser] = useState(getCurrentUserInfo())
  return (
    <Layout isMap={false} currentUser={currentUser} setCurrentUser={setCurrentUser}>
      <NotMapBox>
        <MenuName>서비스 소개!</MenuName>
        <MainTitle>딜리버리 푸드 파이터? 왜 필요해?</MainTitle>
        <DescBox>
          <p>
            코로나가 시작되면서 많은 점이 변화했습니다. 특히 우리의 식생활에도 코로나가 많은 영향을
            끼쳤는데요. 코로나 대확산 이후로 사람들의 두려움이 커지면서 대부분의 외식은 줄어들고
            배달을 시키거나 집에서 요리를 해먹는 경우가 많아졌습니다.
            <br />
            저희는 실제로 코로나가 외식과 배달 빈도수에 얼마나 많은 영향을 미치는지 궁금했습니다.
            따라서 2019년과 2020년의 외식, 배달 건수를 비교해보았습니다.
          </p>
        </DescBox>
      </NotMapBox>

      {/* 그래프 추가 위해서 NotMapBox를 2개로 나눔 - 한빈 */}
      <Wrapper>
        <ShowIntroData />
      </Wrapper>

      <NotMapBox>
        <DescBox>
          <p>
            2019년 일평균 음식점 방문 건수는 53.3건이었고, 2020년 일평균 음식점 방문 건수는
            44.6건입니다. 따라서 코로나가 시작된 후로 일평균 음식점 방문 건수는 총{" "}
            {Math.round((53.3 - 44.6) / 0.533)} % 감소했습니다.
            <br />
            반면에 2019년 일평균 배달 주문 건수는 164.8건이었고, 2020년 일평균 배달 주문 건수는
            200.8건이었습니다. 즉 코로나가 시작된 후로 일평균 배달 주문 건수는 총{" "}
            {Math.round((200.8 - 164.8) / 1.648)} % 증가했습니다.
            <br />
            <br />
            따라서 코로나 대확산 이후로 방문건수는 감소하였고, 배달 주문건수는 증가하였기 때문에
            배달 서비스 이용자가 증가했다라고 결론내릴 수 있습니다. 저희는 그만큼 배달 서비스 시장도
            커졌을 거라고 생각했고, 이에 관련한 다양한 분석의 필요성을 느꼈습니다.
            <br />
            <br />
            <h2>딜.푸.파가 지향하는 바는 다음과 같습니다.</h2>
            <br />
            <Bold>사람들에게 배달 서비스 시장에 대해 알기 쉽고 재밌게 설명해주는 것</Bold>
            <br />
            <br />
            딜리버리 푸드 파이터는 코로나 전후 배달 데이터를 기반으로 현재 배달 건수의 증가량과 어떤
            새로운 배달 상점이 생겨나고 있는지를 분석해 관련 정보를 제공하고 있습니다. 이런 정보들을
            통해 우리는 길거리에 배달 오토바이들이 왜이렇게 많아졌는지, 내 음식은 왜이렇게
            안오는지를 어렴풋이 알고 이해할 수 있게 되죠. 이런 것도 배달이 가능해? 라고 할만큼
            다양한 업종, 수많은 가게가 생겨나고 있다는 것도 알 수 있어요.
            <br />
            <br />
            너무나도 바쁜 요즘이지만 배달이 일상이 되어버린 현재, 딜푸파와 함께 대한민국의 배달
            시장이 어떻게 흘러가고 있는지 한 번 알아가보는 건 어떨까요? 어느새 가게 사장님들과
            라이더 분들을 이해하고 한결 초조함을 던져버린 우리의 모습을 발견할 수도 있지 않을까요?
            <br />
            <br />
            딜푸파에서 제공하는 미니 서비스들을 통해 재밌는 시간을 보낼 수도 있어요! 열심히 달려오고
            있을 나의 음식을 기다리는 시간이 즐거운 기다림이 되었으면 좋겠어요!
            <br />
            {/* <br />
            1. 지역-시간별 주문건수 데이터 [출처 : KT 통신 빅데이터 플랫폼]
            <br />
            2. 일 평균 방문 고객 및 배달 테이크아웃 수 [출처 : 국가 통계 포털]             */}
          </p>
        </DescBox>
      </NotMapBox>
    </Layout>
  )
}

export default Intro
