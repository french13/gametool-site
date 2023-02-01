import React, { useState } from "react";
import { deleteSubCollectionDoc, updateSubCollectionDoc } from "../apis/apis";
import { Card, Button, CardBody, CardTitle, CardText, Input } from "reactstrap";
import { auth } from "../firebase";
import { BsFillTrashFill } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import { BsCheckLg } from "react-icons/bs";

const TodoCard = ({ item, i }) => {
  const [updateForm, setUpdateForm] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateContent, setUpdateContent] = useState("");

  const [deleteConfirm, setDeleteConfirm] = useState(false);

  // todo 삭제하기
  const deleteTodo = async (itemId) => {
    await deleteSubCollectionDoc("todolist", auth.currentUser.uid, itemId);
    setDeleteConfirm(false);
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
        {deleteConfirm === true ? (
          <div className="deleteConfirmBox">
            <p>삭제하시겠습니까?</p>
            <div>
              <button
                onClick={() => {
                  deleteTodo(item.id);
                }}
              >
                삭제
              </button>
              <button
                onClick={() => {
                  setDeleteConfirm(false);
                }}
              >
                취소
              </button>
            </div>
          </div>
        ) : null}
        {updateForm === false ? (
          <>
            <CardTitle>{item.title}</CardTitle>
            <CardText>{item.content}</CardText>
            <Button id={item.id} onClick={() => {
                setUpdateForm(true);
                setUpdateTitle(item.title);
                setUpdateContent(item.content);}}>
              <BsFillPencilFill />
            </Button>
          </>
        ) : (
          <>
            <Input defaultValue={item.title} onChange={(e) => 
            {setUpdateTitle(e.target.value);}}/>
            <Input style={{ marginTop: "5px" }} defaultValue={item.content} onChange={(e) => {
                setUpdateContent(e.target.value);}}/>
            <Button id={item.id} onClick={() => {
                updateTodo(item.id);}} >
              <BsCheckLg />
            </Button>
          </>
        )}
        <Button
          id={item.id}
          onClick={() => {
            setDeleteConfirm(true);
          }}
        >
          <BsFillTrashFill />
        </Button>
      </CardBody>
    </Card>
  );
};

export default TodoCard;
