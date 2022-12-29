#### 2022-12-27 
 - sass, react-router-dom, firebase, redux-toolkit, remix-icon, reactstrap 설치
 - 로그인, 회원가입폼 
 - 유효성 검사
 - firebase를 이용한 회원가입 가입 완료후 가입자 정보 데이터베이스에 저장

 #### 2022-12-28
  - redux 설정
  - firebase데이터를 가져오는 과정에서 오류 발생
    * subcollection을 이용하다보니 경로가 길어졌는데 firebase는 경로 지정시 segments의 갯수가 홀수가 되어야 한다는 것을 알아낸 뒤 수정 후 정상 작동확인

#### 2022-12-29
  - todoList crud 기능 완성
    * button 안에 remix icon 을 넣고 클릭시 icon이 클릭되어 button안의 id값이 전송이 안되는 오류 발생하여 icon에도 기능을 넣어서 해결