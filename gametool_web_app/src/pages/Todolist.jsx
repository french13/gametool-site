import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Container, Input, InputGroup, Row, Button, Form } from "reactstrap";
import "../styles/pages.scss";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  getDocs,
  onSnapshot,
  where,
} from "firebase/firestore";


const Todolist = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState('');
  const [currentUserUid, setCurrentUserUid] = useState('');
  const [todo, setTodo] = useState('');
  const [todoList, setTodoList] = useState([]);

 useEffect(()=>{
 onAuthStateChanged(auth,(user) => {
    if (user) {
      setCurrentUser(user.displayName);
      setCurrentUserUid(user.uid);
      setCurrentUserEmail(user.email);
    }else{
    }
  })




  importTodo()
},[currentUserEmail])

  const importTodo = ()=>{
    onSnapshot(collection(db, 'todolist', currentUserUid, currentUserUid), (result) => {
      const box = [];
      result.forEach((doc) => {
        box.push(doc.data().todo);
      });
      setTodoList(box);
    })
  }


  const submitTodo = async () => {
    const date = String(new Date().getTime());
    // todolist 유저db 만들기
    await setDoc(doc(db, "todolist", currentUserUid), {
      name: currentUser,
      uid: currentUserUid,
      email: currentUserEmail,
      time: serverTimestamp(),
    });
    // todolist 유저db안에 subcollection 만들어서 todo넣기
    await setDoc(doc(db, "todolist", currentUserUid, currentUserUid, date), {
      name: currentUser,
      todo: todo,
      time: serverTimestamp(),
    });
    
  
  };






  console.log("재렌더링중");
  return (
    <Container className="todolist__container">
      <Row>
        <InputGroup>
          <Input
            onChange={(e) => {
              setTodo(e.target.value);
            }}
          />
          <Button onClick={submitTodo}>추가</Button>
        </InputGroup>
      </Row>
      <Row>
        {todoList &&
          todoList.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
      </Row>
    </Container>
  );
};

export default Todolist;
