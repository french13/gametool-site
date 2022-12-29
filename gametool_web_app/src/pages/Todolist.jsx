import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Container,
  Input,
  InputGroup,
  Row,
  Button,
  Form,
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
  getDocs,
  onSnapshot,
  where,
  deleteDoc,
  getDoc,
  query,
  updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";

const Todolist = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [currentUserEmail, setCurrentUserEmail] = useState("");
  const [currentUserUid, setCurrentUserUid] = useState("");
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [updateText, setUpdateText] = useState("");
  const [updateId, setUpdateId] = useState("");
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
      id: date,
      name: currentUser,
      todo: todo,
      time: serverTimestamp(),
    });
  };
  // todo 수정하기
  const updateTodo = async (e) => {
    const updateId = String(e.target.value);
    const data = await getDoc(
      query(doc(db, "todolist", currentUserUid, currentUserUid, updateId))
    );
    if (data.exists()) {
      setUpdateText(data.data().todo);
      setUpdateId(data.data().id);
    }
    setUpdateBox(true);
  };
  // updateInputText 수정하기
  const updateInput = (e) => {
    setUpdateText(e.target.value);
  };
  // 수정한 updateInput 제출하기
  const updateTodoItem = async (e) => {
    const updateKey = e.target.value;
    await updateDoc(
      doc(db, "todolist", currentUserUid, currentUserUid, updateKey),
      {
        todo: updateText,
      }
    );
    setUpdateBox(false);
  };

  // todo 삭제하기
  const deleteTodo = async (e) => {
    const deleteKey = e.target.value;
    await deleteDoc(
      doc(db, "todolist", currentUserUid, currentUserUid, deleteKey)
    );
  };

  console.log("재렌더링중");

  return (
    <Container className="todolist__container">
      <InputGroup>
        <Input
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
        <Button onClick={submitTodo}>추가</Button>
      </InputGroup>
      <Row>
        {updateBox == true ? (
          <>
            <input type="text" value={updateText} onChange={updateInput} />
            <Button value={updateId} onClick={updateTodoItem}>
              수정하기
            </Button>
          </>
        ) : null}
      </Row>

      <Row>
        {todoList &&
          todoList.map((item, i) => {
            return (
              <div className="todoItem" key={i}>
                <Col xs={10}>{item.todo}</Col>

                <Button value={item.id} onClick={updateTodo}>
                  <i className="ri-pencil-line"></i>
                </Button>

                <Button value={item.id} onClick={deleteTodo}>
                  <i className="ri-delete-bin-line"></i>
                </Button>
              </div>
            );
          })}
      </Row>
    </Container>
  );
};

export default Todolist;
