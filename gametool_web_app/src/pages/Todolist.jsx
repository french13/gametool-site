import React, { useEffect, useState } from "react";
import {
  Container,
  Input,
  InputGroup,
  Row,
  Button,
  Col,
} from "reactstrap";
import "../styles/pages.scss";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  setDoc,
  doc,
  serverTimestamp,
  collection,
  onSnapshot,
  deleteDoc,
  getDoc,
  query,
  updateDoc,
} from "firebase/firestore";

const Todolist = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserUid, setCurrentUserUid] = useState("");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState('');
  const [updateText, setUpdateText] = useState([]);
  const [updateValue, setUpdateValue] = useState('');

  const [updateBox, setUpdateBox] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.displayName);
        setCurrentUserUid(user.uid);
        setCurrentUserEmail(user.email);
      } else {
      }
    });

    importTodo();
  }, [currentUserEmail]);

  const importTodo = () => {
    onSnapshot(
      collection(db, "todolist", currentUserUid, currentUserUid),
      (result) => {
        const box = [];
        result.forEach((doc) => {
          box.push(doc.data());
        });
        setTodoList(box);
      }
    );
  };

  const submitTodo = async () => {
    const date = String(new Date().getTime())

    // todolist 유저db안에 subcollection 만들어서 todo넣기
    await setDoc(doc(db, "todolist", currentUserUid, currentUserUid, date), {
      id: date,
      name: currentUser,
      todo: todo,
      time: serverTimestamp(),
    });
  };

 

  // todo 수정하기
  const updateTodo = async (e) => {
    const updateId = e.target.id;
    await getDoc(doc(db, "todolist", currentUserUid, currentUserUid, e.target.id)).then((data)=>{
      if (data.exists()) {
      setUpdateText(data.data());
      console.log(updateText)
      }
    }).catch((error)=>{
      console.log('fail')
    })
    setUpdateBox(true);
  };


  // updateInputText 수정하기
  const updateInput = (e) => {
    setUpdateValue(e.target.value);
  };


  // 수정한 updateInput 제출하기
  const updateTodoItem = async (e) => {
    const updateKey = String(e.target.id);
    await updateDoc(
      doc(db, "todolist", currentUserUid, currentUserUid, e.target.id),
      {
        todo : updateValue,
      }
    );
    setUpdateBox(false);
    setUpdateValue('')
  };

  // todo 삭제하기
  const deleteTodo = async (e) => {
    const deleteKey = e.target.id;
    await deleteDoc(
      doc(db, "todolist", currentUserUid, currentUserUid, deleteKey)
    );
  };

  const updateBoxClose = ()=>{
    setUpdateBox(false);
  }

  console.log("재렌더링중");

  return (
    <Container className="todolist__container">
      <InputGroup className="todoAdd">
        <Input
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <Button onClick={submitTodo}><i className="ri-add-line"></i></Button>
      </InputGroup>
      <Row >
        {updateBox == true ? (
          <div className="updateBox">
            <Input type="text" onChange={updateInput} value={updateValue}/>
            <Button id={updateText.id} onClick={updateTodoItem}>
            <i id={updateText.id} onClick={updateTodoItem} className="ri-arrow-left-right-line"></i>
            </Button>
            <Button onClick={updateBoxClose}><i onClick={updateBoxClose} className="ri-close-line"></i></Button>
          </div>
        ) : null}
      </Row>

      <Row>
        {todoList &&
          todoList.map((item, i) => {
            return (
              <div className="todoItem" key={i}>
                <Col xs={10}>{item.todo}</Col>

                <Button id={item.id} onClick={updateTodo}>
                <i  id={item.id} onClick={updateTodo} className="ri-pencil-line"></i>
                </Button>

                <Button id={item.id} onClick={deleteTodo}>
                <i  id={item.id} onClick={deleteTodo} className="ri-delete-bin-line"></i>
                </Button>
              </div>
            );
          })}
      </Row>
    </Container>
  );
};

export default Todolist;
