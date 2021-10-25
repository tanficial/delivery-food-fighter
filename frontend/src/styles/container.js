import styled from "styled-components"

export const WholeContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(168px, 1fr) 3fr 2fr;
  column-gap: 32px;
  grid-template-rows: minmax(106px, 15vh) auto;
`

export const LogoBox = styled.div`
  grid-column: ${({ isMap }) => (isMap ? "1/3" : "1/4")};
  grid-row: 1/2;
  background-color: white;
  top: 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`

export const MenuBox = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
  z-index: 2;
  position: fixed;
  top: 106px;
  height: 100%;
`

//layout에서 본문이 들어가는 메인 박스
export const Main = styled.main`
  grid-column: ${({ isMap }) => (isMap ? "2/3" : "2/4")};
  grid-row: 2/3;
`

export const MapBox = styled.div`
  grid-column: 3/4;
  grid-row: 1/3;
  z-index: 5000;
`

export const ContentsBox = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  /* overflow: auto; */
  height: 85vh;
  padding-right: 20px;
`

/*맵을 사용하지 않을 경우 사용하는 본문 박스*/
export const NotMapBox = styled.div`
  width: 80%;
`
