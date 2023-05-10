# library_page
DB를 이용한 도서관 홈페이지 만들기

Skill : HTML, CSS, JavaScript, PHP
DB : Oracle

- Oracle DB에 도서관 페이지 관리를 위한 테이블과 그 정보들이 저장되어 있음
- HTML, CSS, JS를 이용한 화면 구성
- PHP를 이용하여 DB 정보 접근
- Apache를 이용해 서버 실행

상세설명 : https://mire-shake-bb9.notion.site/9b1948d3dcc84461b9330f258c0328b3

### 메인페이지
#### 로그인 전
![image](https://github.com/narlo23/library_page/assets/77222481/3740eca1-98d6-41e0-abfa-e1d10090ecac)
#### 로그인 후
![image](https://github.com/narlo23/library_page/assets/77222481/b72a1713-52f0-4f28-8be9-1cda8582c410)
#### 로그인 창
![image](https://github.com/narlo23/library_page/assets/77222481/adef0ae8-3b22-48ee-858f-785898cd575b)


### 회원가입 페이지
![image](https://github.com/narlo23/library_page/assets/77222481/60f5c385-728b-4a5c-be2a-1945ccb59cda)

### 상세 검색 페이지
![image](https://github.com/narlo23/library_page/assets/77222481/e8a2af89-ceb8-482d-b89e-1f12aa864d68)

대출하기 / 예약하기 / 반납하기 / 연장하기 / 예약 취소 기능

테이블 구성
- EBOOK : 책 고유 번호, 책 제목, 출판사, 발행년도, 대출한 사람의 고유 번호, 연장 횟수, 대출일, 반납예정일
- AUTHORS : 책 고유 번호, 저자
- EBOOKCUSTOMER : 사용자 정보 저장 테이블
- PREVIOUSRENTAL : 이전 대출 기록 저장 테이블
- RESERVE : 도서 예약 정보 테이블

