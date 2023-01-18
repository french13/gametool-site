import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Input, Button, Col } from "reactstrap";
import "../styles/pages.scss";
import OverdueItem from "../components/OverdueItem";
import CurrentItem from "../components/CurrentItem";
import { auth, db } from "../firebase";
import {
  onSnapshot,
  collection,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { setSubCollectionDoc } from "../apis/apis";
const Timeitem = () => {
  const [itemTitle, setItemTitle] = useState("");
  const [itemTime, setItemTime] = useState("");
  const [itemBox, setItemBox] = useState(true);
  const [currentItemBox, setCurrentItemBox] = useState();
  const [overdueItemBox, setOverdueItemBox] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onSnapshot(
          collection(
            db,
            "timeitem",
            auth.currentUser.uid,
            auth.currentUser.uid
          ),
          (result) => {
            const current = [];
            const overdue = [];
            result.forEach((doc) => {
              const today = new Date();
              let today2 = new Date(today.setDate(today.getDate() - 1));

              if (Number(doc.data().content) - today2 > 0) {
                current.push(doc.data());
              } else {
                overdue.push(doc.data());
              }
            });
            setCurrentItemBox(current);
            setOverdueItemBox(overdue);
          }
        );
      }
    });

    return;
  }, []);

  const submitItem = async (e) => {
    const dDayTime = new Date(itemTime).getTime();

    await setSubCollectionDoc(
      "timeitem",
      auth.currentUser.uid,
      auth.currentUser.email,
      itemTitle,
      dDayTime
    );
  };
  return (
    <Container className="timeitem__container">
      <Row className="addItem">
        <form>
          <Input
            type="text"
            onChange={(e) => {
              setItemTitle(e.target.value);
            }}
          />
          <Input
            type="date"
            onChange={(e) => {
              setItemTime(e.target.value);
            }}
          />
          <br />
          <Button onClick={submitItem}>추가</Button>
        </form>
      </Row>
      <Row className="changeItemContainer">
        <Col xs="6">
          <Button
            onClick={() => {
              setItemBox(true);
            }}
          >
            currentItem
          </Button>
        </Col>
        <Col xs="6">
          <Button
            onClick={() => {
              setItemBox(false);
            }}
          >
            overdueItme
          </Button>
        </Col>
      </Row>
      {itemBox == true ? (
        <CurrentItem currentItemBox={currentItemBox} />
      ) : (
        <OverdueItem overdueItemBox={overdueItemBox} />
      )}
    </Container>
  );
};

export default Timeitem;
