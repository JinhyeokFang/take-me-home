
# Take-Me-Home: 반려동물 입양 서비스 API 서버

## 프로젝트 소개

### TDD로 DDD를 점진적으로 적용한 반려동물 입양 서비스 API 서버

![Typescript](https://img.shields.io/badge/Typescript-3178C6.svg?&style=for-the-badge&logo=Typescript&logoColor=white)
![Nest.js](https://img.shields.io/badge/NestJS-E0234E.svg?&style=for-the-badge&logo=NestJS&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325.svg?&style=for-the-badge&logo=Jest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Supertest](https://img.shields.io/badge/Supertest-000000.svg?&style=for-the-badge&logoColor=white)
![TypeOrm](https://img.shields.io/badge/TypeOrm-000000.svg?&style=for-the-badge&logoColor=white)
 
## 프로젝트 의의
TDD를 처음으로 웹 서버개발에 적용
Jest와 Supertest로 자동화된 테스트를 구현
테스트와 리팩토링을 활용, DDD를 점진적으로 도입
TypeOrm으로 데이터베이스와 연동, 마이그레이션까지 추가
Event로 비즈니스 로직의 결합도를 낮춤

## 유스케이스
- Shelter 모두 불러오기
- Shelter에서 Pet 전체 확인
- Owner가 입양한 모든 Pet을 확인
- Shelter로 들어온 입양 신청 내역을 확인
- Shelter가 PetInformation을 입력해 Pet을 등록
- PetID를 입력받아 Shelter에서 Pet을 삭제
- Owner가 Shelter와 Pet을 입력, 입양을 신청
- 입양 신청 내역 ID를 입력, 승인또는 거절

## 개선이 필요한 부분
- 더 많은 유스케이스
- 더 많은 테스트
- 예외처리 추가
- Transaction 지원
- Continuous Deployment를 적용한 자동 무중단 배포 (using AWS EC2)

## 프로젝트 설치 방법

``` bash
$ npm install
$ npm run prepare
```

설치가 완료되면 .env, .env.development, .env.test 파일을 생성 후 아래의 환경변수를 설정해주세요.

``` bash
PORT=
DATABASE_HOST=
DATABASE_PORT=
DATABASE_PASSWORD=
DATABASE_USERNAME=
DATABASE_NAME=
DATABASE_SYNCHRONIZE=
```

