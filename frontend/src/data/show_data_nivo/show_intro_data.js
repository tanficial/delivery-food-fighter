// 작성자 : 김한빈
// 작성일자 : 21년 10월 7일 16:23  
// 작성내용 : 음식점 고객 방문 수 데이터를 시각화하는 코드 제작

import { fontSize } from '@mui/system';
import { ResponsiveBar } from '@nivo/bar'
import styled from "styled-components"; 


export const Wrapper = styled.div`
  height: 600px;
  width: 800px;
  position: relative;
`

const ShowIntroData = () => {
    const data = [
        {
          day: "2019년-방문건수",
          일평균_방문고객수: 53.3,
        },
        {
          day: "2020년-방문건수",
          일평균_방문고객수: 44.6
        },
        {
          day: "2019년-배달건수",
          일평균_배달건수: 164.8
        },
        {
          day: "2020년-배달건수",
          일평균_배달건수: 200.8
        }
    ]; 

    const theme = {
      axis: {
        textColor: '#eee',
        fontSize: '500px',
        tickColor: '#eee',
      },
      grid: {
        stroke: '#888',
        strokeWidth: 1
      },
    };

    return(
      <ResponsiveBar
      data={data}
      keys={["일평균_방문고객수", "일평균_배달건수"]}  
      indexBy="day"
      margin={{ top: 60, right: 150, bottom: 100, left: 100 }}
      padding={0.6}
      valueScale={{ type: "linear" }}
      colors={["#FFA500", "#c0ed70"]}
      animate={true}
      enableLabel={false}
      axisTop={null}
      axisRight={null}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legendPosition: "middle",
        legendOffset: -40
      }}
      axisBottom={{
        tickRotation: -40
      }}
      legends={[
        {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDireccdstion: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
                {
                    on: 'hover',
                    style: {
                        itemOpacity: 1
                    }
                }
            ]
        }
      ]}
      borderRadius={1}
      borderWidth={2}
      borderColor="#000000"
      theme={{
        axis: {
          ticks: {
            text: {
              fontSize: 16
            }
          }
        }
      }}
      />
    )
}

export default ShowIntroData