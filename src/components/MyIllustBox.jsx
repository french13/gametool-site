import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { deleteSubCollectionDoc } from "../apis/apis";
import { Button, Col, Container, Row } from "reactstrap";
import { BsSearch } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import IllustDetail from "./IllustDetail";
import { useDispatch } from "react-redux";
import { renderQuantity } from "../store";

const MyIllustBox = () => {
  const [myIllust, setMyIllust] = useState("");
  const [detailBox, setDetailBox] = useState(false);
  const [detailItem, setDetailItem] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      onSnapshot(
        collection(db, "myillust", auth.currentUser.uid, auth.currentUser.uid),
        (result) => {
          let box = [];
          result.forEach((doc) => {
            box.push(doc.data());
          });
          setMyIllust(box);
          dispatch(renderQuantity(box.length));
        }
      );
    });
  }, []);

  const deleteMyIllust = async (e) => {
    await deleteSubCollectionDoc(
      "myillust",
      auth.currentUser.uid,
      String(e.target.id)
    );
  };

  // dispatch(renderQuantity(myIllust.length))
  console.log(detailBox);
  return (
    <Container className="myillust__container">
      {detailBox === true ? (
        <IllustDetail
          detailItem={detailItem}
          detailBox={detailBox}
          setDetailBox={setDetailBox}
        />
      ) : null}

      {myIllust &&
        myIllust.map((item, i) => {
          return (
            <Row key={i}>
              <Col xs={4}>{item.name}</Col>
              <Col xs={5}>{item.title}</Col>
              <Col xs={3} style={{display : "flex"}}>
                <Button
                  className="myillust__detailButton"
                  onClick={() => {
                    setDetailItem(item);
                    setDetailBox(!detailBox);
                  }}
                >
                  <BsSearch />
                </Button>
                <Button
                  className="myillust__deleteButton"
                  id={item.id}
                  onClick={deleteMyIllust}
                >
                  <BsFillTrashFill />
                </Button>
              </Col>
            </Row>
          );
        })}
    </Container>
  );
};

export default MyIllustBox;
