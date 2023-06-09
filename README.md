# [Wanderlustify-FE]

Wanderlustify-FE는 Wanderlustify 애플리케이션의 프론트엔드 구성 요소입니다. Wanderlustify는 여행 추천 플랫폼으로, 사용자가 여행 목적지를 탐색하고 선호도에 맞는 추천을 받을 수 있습니다.

## 목차

- [소개](#소개)
- [주요 기능](#주요-기능)
- [시작하기](#시작하기)
- [사용법](#사용법)

## 소개

Wanderlustify-FE는 Wanderlustify 애플리케이션의 프론트엔드입니다. 이 저장소는 SSAFY 9th 팀이 개발한 Wanderlustify 프로젝트의 일부입니다.

## 주요 기능

- 사용자 인증 및 등록: 사용자는 계정을 생성하고 로그인하여 애플리케이션에 접근할 수 있습니다.
- 여행 목적지 검색 및 탐색: 사용자는 여행 목적지를 검색하고 상세 정보를 탐색할 수 있습니다.
- 여행 일정 생성 및 관리: 사용자는 여행 일정을 생성하고 관리할 수 있습니다.
- 여행 정보 공유 : 사용자는 게시판에서 여행 정보를 공유할 수 있습니다.
- 핫플레이스 저장 : 사용자는 자신의 핫플레이스를 저장하고 관리할 수 있습니다.

## 시작하기

1. 이 저장소를 클론합니다.
2. 웹 서버를 구동합니다. 
3. Wanderlustify-FE 애플리케이션을 사용할 수 있습니다.
```
npm i - 기본 설정
npm run dev - 실행
```

## 사용법

1. 애플리케이션을 실행하면 로그인 또는 계정 생성을 할 수 있는 페이지가 표시됩니다.
2. 로그인 또는 계정 생성 후, 여행 목적지를 검색하고 상세 정보를 확인할 수 있습니다.
3. 선호하는 여행 목적지를 핫플레이스에 추가하고 관리할 수 있습니다.
4. 여행 일정을 생성하고 관리할 수 있습니다.
5. 여행 정보를 다른 사용자에게 공유할 수 있습니다.

## 라이브러리
1. vuex - 상태 관리
2. axios - api 통신
3. tanstack/vue-query - 서버 데이터 관리
4. vuetify, bootstrap - ui 디자인
5. vue3-toastify - 알림 기능