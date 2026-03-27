# maptrip-server
[MapTrip Application](https://github.com/B-Grade-Life/MapTrip)을 위한 위치 기반 추천 시스템 REST API 서버입니다.
사용자가 지정한 GPS 좌표를 기준으로 약 3억 건의 위치 데이터를 분석하여 최적의 장소와 경로를 추천합니다.
<img src="https://github.com/user-attachments/assets/8ff07834-e69e-478b-9c2a-2026c17c4c0e">

## Overview
- 사용자 위치 기반 장소 추천 API
- 약 3억 건 GPS 데이터 활용
- GPS of GPS 데이터 밀도를 기반으로 핫플레이스 추천
- 선택한 종소들을 연결한 추천 경로 생성

## 애플리케이션 구조
<img src="https://github.com/user-attachments/assets/41072523-efe0-472a-8906-e2e76df9b63d">

## 데이터 아키텍처
<img src="https://github.com/user-attachments/assets/f90a8735-f08c-4c6e-bf79-30e34932f64d">

## 개발 의의
- 약 3억 건의 GPS 데이터 기반 추천 시스템 설계
- 사용자가 지정한 위치 기준으로 카테고리(식당, 카페 등) 추천 로직 구현
- 데이터 밀도를 분석하여 핫플레이스를 시각적으로 표현(마커의 위치와 투명도)
- 선택된 장소들을 연결하여 추천 경로 생성 및 일정 관리 기능 구현

## 기술 스택
|Category|Stack|
| --- | --- |
|Backend|Node.js, Express, JavaScript|
|Database|MariaDB|
|API|Google Maps API|
|Client|iOS (Swift)|

## 주요 특징
- 위치 기반 장소 추천 API
- 데이터 밀도 기반 핫플레이스 탐색
- 추천 경로 자동 생성
- GPS 데이터 분석 처리
