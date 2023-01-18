import React, { useState } from "react";
import { deleteSubCollectionDoc, updateSubCollectionDoc } from "../apis/apis";
import { Card, Button, CardBody, CardTitle, CardText, Input } from "reactstrap";
import { auth } from "../firebase";

const TodoCard = ({ item, i }) => {
  const [updateForm, setUpdateForm] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  // todo 삭제하기
  const deleteTodo = async (itemId) => {
    await deleteSubCollectionDoc("todolist", auth.currentUser.uid, itemId);
  };

  // 수정한 updateInput 제출하기
  const updateTodo = async (itemId) => {
    await updateSubCollectionDoc(
      "todolist",
      auth.currentUser.uid,
      itemId,
      updateTitle,
      updateContent
    );

    setUpdateForm(false);
  };

  return (
    <Card style={{ border: "none" }}>
      <CardBody className="todoCard">
        {updateForm === false ? (
          <CardTitle>{item.title}</CardTitle>
        ) : (
          <Input
            defaultValue={item.title}
            onChange={(e) => {
              setUpdateTitle(e.target.value);
            }}
          />
        )}
        {updateForm === false ? (
          <CardText>{item.content}</CardText>
        ) : (
          <Input
            defaultValue={item.content}
            onChange={(e) => {
              setUpdateContent(e.target.value);
            }}
          />
        )}
        {updateForm === false ? (
          <Button
            id={item.id}
            onClick={() => {
              setUpdateForm(true);
              setUpdateTitle(item.title);
              setUpdateContent(item.content);
            }}
          >
            수정
          </Button>
        ) : (
          <Button
            id={item.id}
            onClick={() => {
              updateTodo(item.id);
            }}
          >
            수정완료
          </Button>
        )}

        <Button
          id={item.id}
          onClick={() => {
            deleteTodo(item.id);
          }}
        >
          삭제
        </Button>
      </CardBody>
    </Card>
  );
};

export default TodoCard;
