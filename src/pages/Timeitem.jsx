import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Input, Button, Col } from "reactstrap";
import "../styles/pages.scss";
import OverdueItem from "../components/OverdueItem";
import CurrentItem from "../components/CurrentItem";
import { auth, db } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { setSubCollectionDoc } from "../apis/apis";
const Timeitem = () => {
  const [itemTitle, setItemTitle] = useState("");
  const [itemTime, setItemTime] = useState("");
  const [currentItemBox, setCurrentItemBox] = useState();
  const [overdueItemBox, setOverdueItemBox] = useState();

  const containerRef = useRef(null);
  const currentRef = useRef(null)
  const overdueRef = useRef(null)

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

  const overItemTransition = () => {
    containerRef.current.className = "overItemTranslate";
    currentRef.current.className="offTimeItemBox"
    overdueRef.current.className= "onTimeItemBox"
  };

  const currentItemTranstition = () => {
    containerRef.current.className = "currentItemTranslate";
    currentRef.current.className= "onTimeItemBox"
    overdueRef.current.className= "offTimeItemBox"
  };
  return (
    <Container className="timeitem__container">
      <header>Time Item</header>
      <Row className="addItem">
        <Col xs={7}>
          <Input
            type="text"
            onChange={(e) => {
              setItemTitle(e.target.value);
            }}
          />
        </Col>
        <Col xs={5}>
          <Input
            type="date"
            onChange={(e) => {
              setItemTime(e.target.value);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={submitItem}>추가</Button>
        </Col>
      </Row>

      <Row className="changeItemContainer">
        <Col xs="6">
          <button ref={currentRef} className="onTimeItemBox" onClick={currentItemTranstition}>
            currentItem
            </button>
        </Col>
        <Col xs="6">
          <button ref={overdueRef} className="offTimeItemBox" onClick={overItemTransition}>
            overdueItem
            </button>
        </Col>
      </Row>
      <div style={{ overflow: "hidden" }}>
        <div ref={containerRef}>
          <Row xs={2} style={{ width: "200%" }}>
            <Col>
              <CurrentItem currentItemBox={currentItemBox} />
            </Col>
            <Col>
              <OverdueItem overdueItemBox={overdueItemBox} />
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default Timeitem;
