## 프론트엔드 실행하기
1. yarn install / npm install로 라이브러리 설치
2. yarn start / npm run start

## 프론트엔드 파일 구성
- src
    - Compoments
        - CustomMap.js : leaflet라이브러리를 이용한 기본 지도
        - NavBar.js : 상단 메뉴 컴포넌트
        - Greet.js : 테스트용 컴포넌트(삭제 예정)
    - Pages : 페이지를 모아놓은 폴더입니다.
        - SetPages.js : 각 페이지 컴포넌트를 모아놓은 파일
        - Home.js : 서비스 소개가 들어가는 첫 페이지
        - DeliveryNum.js : 코로나확진자수/배달건수 비교 페이지
    - styles : 컴포넌트 스타일을 모아놓은 폴더입니다.

## 백엔드 실행하기
1. backend 폴더안에있는 requirements.txt로 파이썬 패키지 설치
2. backend/delivery_app 폴더로 이동
3. flask db init
4. flask db migrate
5. flask db upgrade
    - geodata요청에 쓰이는 address테이블 초기화 하는 방법이 바뀌었습니다.
    - 첫 마이그레이션 이후 가장 상위의 data폴더에 있는 `region_data.sql`파일을 이용해 데이터를 넣어주세요
6. flask run : 개발환경 실행
7. `배포환경 실행` : 환경변수 설정 후 docker-compose 실행
8. `pre-commit 으로 백엔드 코드 포맷팅하기`
    - requirements.txt 설치 -> pre-commit 패키지가 설치됩니다.
    - .pre-commit-config.yaml파일이 있는 backend 폴더에서 `pre-commit install`명령을 실행합니다.
    - 잘 실행이 됬다면 .git/hooks 폴더에 pre-commit이라는 파일이 생깁니다.
    - 이제 commit을 하면 python파일을 검사해 코드를 포맷팅해줍니다.
    - 포맷팅된 파일을 다시 add하고 commit을 하면 됩니다.

### 요청 url
- `GET localhost:5000/api/geodata/list`
    - 모든 지역에 관한 기본 데이터 반환(id, 이름, 좌표)
- `GET localhost:5000/api/geodata/graph/order-per-time/<id>`
    - id에 해당하는 지역의 데이터, 시간-지역별 주문량 그래프와 설명을 반환
- `GET localhost:5000/api/geodata/graph/stores/<id>`
    - id에 해당하는 지역의 데이터, 배달상점분포 그래프와 설명을 반환
- `<id>는 /api/geodata/list 요청을 통해 얻은 지역들의 id`

### api 문서
- [api문서](https://lumbar-sloth-e92.notion.site/api-c6f79e4c2e4d41b888ebccd34a9450e2)

# (서비스 명)
- 최종 서비스 명을 위 괄호 부분에 작성하세요.
- 최종 서비스의 한 줄 소개를 작성하세요.


## 프로젝트 구성 안내

* `bullet point 에 적힌 내용을 수정해 주시면 됩니다.`

* `초기 기획은 언제든 수정될 수 있으니 웹서비스 결과를 내는데 초점을 두시기 바랍니다.`

## 1. 프로젝트 소개

**어떠한 데이터셋와 도구 및 기술을 사용했는지에 대한 설명과 엔드유저에게 보이는 웹서비스에 대한 소개**

  - 사용하려는 데이터(제안된 데이터 중 하나 또는 선택한 다른 데이터 세트)를 명시, 이에 대한 설명
  - 기술 스택 (python, d3, pandas, jupyter, javascript, MySQL 등)
  - 사용된 라이브러리 (numpy, matplotlib, wordcloud 등)
  - 웹서비스에 대한 자세한 개요

## 2. 프로젝트 목표

**데이터 분석 결과로 도출되는 인사이트와 웹서비스의 해결과제에 대한 논의 (50자 이상)**
  - 프로젝트 아이디어 동기
  - 문제를 해결하기 위한 특정 질문 명시
  - 데이터를 통해 탐색하려는 문제를 구체적으로 작성


## 3. 프로젝트 기능 설명

**웹서비스의 유용성, 편의성 및 시각화의 실용성에 대한 설명**
  - 주요 기능 (주된 활용성) 및 서브 기능
  - 프로젝트만의 차별점, 기대 효과

## 4. 프로젝트 구성도
  - 와이어프레임/스토리보드 추가

## 5. 프로젝트 팀원 역할 분담
| 이름 | 담당 업무 |
| ------ | ------ |
| 멤버1 | 팀장/프론트엔드 개발 |
| 멤버2 | 백엔드 개발/데이터 분석 |

**멤버별 responsibility**

1. 팀장 

- 기획 단계: 구체적인 설계와 지표에 따른 프로젝트 제안서 작성
- 개발 단계: 팀원간의 일정 등 조율 + 프론트 or 백엔드 개발
- 수정 단계: 기획, 스크럼 진행, 코치님 피드백 반영해서 수정, 발표 준비

2. 프론트엔드 

- 기획 단계: 큰 주제에서 문제 해결 아이디어 도출, 데이터 수집, 와이어프레임 작성
- 개발 단계: 와이어프레임을 기반으로 구현, 데이터 처리 및 시각화 담당, UI 디자인 완성
- 수정 단계: 피드백 반영해서 프론트 디자인 수정

 3. 백엔드 & 데이터 담당  

- 기획 단계: 기획 데이터 분석을 통해 해결하고자 하는 문제를 정의
- 개발 단계: 웹 서버 사용자가 직접 백엔드에 저장할수 있는 기능 구현, 데이터 베이스 구축 및 API 활용, 데이터 분석 개념 총동원하기
- 수정 단계: 코치님 피드백 반영해서 분석/ 시각화 방식 수정

## 6. 버전
  - 프로젝트의 버전 기입

## 7. FAQ
  - 자주받는 질문 정리