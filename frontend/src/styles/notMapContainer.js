import styled from "styled-components"

export const WholeContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr 2fr;
  column-gap: 32px;
  grid-template-rows: minmax(106px, 15vh) auto;
`

export const LogoBox = styled.div`
  grid-column: 1/4;
  grid-row: 1/2;
  padding: 32px 24px 24px 32px;
  cursor: pointer;
`

export const ContentsBox = styled.div`
  grid-column: 2/4;
  grid-row: 2/3;
  background-color: gray;
`

export const MenuBox = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
`
