import React, { useEffect, useState } from "react";
import { Container, Input, Row, Button, FormGroup } from "reactstrap";
import "../styles/pages.scss";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { setSubCollectionDoc } from "../apis/apis";
import TodoCard from "../components/TodoCard";
const Todolist = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoContent, setTodoContent] = useState("");
  const [todoList, setTodoList] = useState("");

  const [todoFormActive, setTodoFormActive] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          collection(
            db,
            "todolist",
            auth.currentUser.uid,
            auth.currentUser.uid
          ),
          (result) => {
            const box = [];
            result.forEach((doc) => {
              box.push(doc.data());
            });
            setTodoList(box);
          }
        );
      }
    });
  }, []);

  // todo추가하기
  const submitTodo = async () => {
    await setSubCollectionDoc(
      "todolist",
      auth.currentUser.uid,
      auth.currentUser.email,
      todoTitle,
      todoContent
    );
    setTodoFormActive(false);
  };

  console.log("재렌더링중");

  return (
    <Container className="todoContainer">
      <div className="todoHeader">
        <p>To Do List</p>
        <Button        onClick={() => {
            setTodoFormActive(true);
          }} className="addButton">추가</Button>
      </div>

      {todoFormActive === true ? (
        <FormGroup className="todoAddForm">
          <Button
            onClick={() => {
              setTodoFormActive(false);
            }}
            className="closeButton"
          >
            x
          </Button>
          <Input
            value={todoTitle}
            type="text"
            onChange={(e) => {
              setTodoTitle(e.target.value);
            }}
          />
          <Input
            value={todoContent}
            type="textarea"
            style={{ height: "200px" }}
            onChange={(e) => {
              setTodoContent(e.target.value);
            }}
          />
          <Button className="addTodoButton" onClick={submitTodo}>
            추가
          </Button>
        </FormGroup>
      ) : null}

      <Row xs={1} md={1} lg={2}>
        {todoList &&
          todoList.map((item, i) => {
            return <TodoCard key={i} item={item} i={i} />;
          })}
      </Row>
    </Container>
  );
};

export default Todolist;
