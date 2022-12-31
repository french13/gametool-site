#### 2022-12-27 
 - sass, react-router-dom, firebase, redux-toolkit, remix-icon, reactstrap 설치
 - 로그인, 회원가입폼 
 - 유효성 검사
 - firebase를 이용한 회원가입 가입 완료후 가입자 정보 데이터베이스에 저장

#### 2022-12-28
  - redux 설정
  - firebase데이터를 가져오는 과정에서 오류 발생
    * subcollection을 이용하다보니 경로가 길어졌는데 firebase는 경로 지정시 segments의 갯수가 홀수가 되어야 한다는 것을 알아낸 뒤 수정 후 정상 작동확인
    * 필요한것이 collection 이면 홀수, doc면 짝수

#### 2022-12-29
  - todoList crud 기능 완성
    * button 안에 remix icon 을 넣고 클릭시 icon이 클릭되어 button안의 id값이 전송이 안되는 오류 발생하여 icon에도 기능을 넣어서 해결
  
#### 2022-12-30
  - timeitem 기간제 아이템 기능 완성

#### 2022-12-31
  - illust(도감)기능 완성

  - illust 추가 클릭시 느리게 추가된 현상을 발견
    * 느리게 적용되는 function에 console.log을찍어 확인결과 Myillust 컴포넌트에서 useEffect가 무한으로 작동되는 현상 발견 후 수정 -> 정상 작동 확인 완료
  
  - todolist 컴포넌트 작동시 빈 리스트 2개가 켜졌다가 사라지는 현상 발견
    * todolist 컴포넌트의 중복작동되는 useState제거 후 해결 완료
  
  - illust 컴포넌트에서 input으로 데이터를 가져올시 처음에 검색하면 데이터를 가져오지 못하는 현상 발견