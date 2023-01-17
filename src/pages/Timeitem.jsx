import React, { useEffect, useState, useRef } from "react";
import { Container, Row, Input, Button, Col } from "reactstrap";
import "../styles/pages.scss";
import OverdueItem from "./OverdueItem";
import CurrentItem from "./CurrentItem";
import { auth,db } from "../firebase";
import { serverTimestamp, setDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Timeitem = () => {
  const [itemBox, setItemBox] = useState(true);
  const [currentItemBox, setCurrentItemBox]= useState();
  const [overdueItemBox, setOverdueItemBox]= useState();
  const [leftBt, setLeftBt] = useState('on')
  const [rightBt, setRightBt] = useState('')

 

  useEffect(()=>{

    onAuthStateChanged(auth, (user)=>{
      if(user){
        onSnapshot(collection(db, "timeitem", auth.currentUser.uid, auth.currentUser.uid),
        (result) => {
          const current = [];
          const overdue = [];
          result.forEach((doc) => {
            const today = new Date()
            let today2 = new Date(today.setDate(today.getDate()-1))

            if(Number(doc.data().dDay)-today2 > 0 ){
              current.push(doc.data())
            }else{
              overdue.push(doc.data())
            }
          });
          setCurrentItemBox(current);
          setOverdueItemBox(overdue);
        }
      );
      }
    })


    return
  },[])

  const submitItem = async(e)=>{
    e.preventDefault()
    const dDayTime = new Date(e.target[1].value).getTime();
    const date = new Date().getTime()

    await setDoc(doc(db, "timeitem", auth.currentUser.uid, auth.currentUser.uid, String(date)), {
      id: date,
      userName: auth.currentUser.displayName,
      itemName: e.target[0].value,
      dDay : dDayTime,
      time: serverTimestamp(),
    });
    // const Day = (Math.floor(dDay / (1000*60*60*24)))+1;
  }

    const clickEffect = ()=>{
      setLeftBt('on')
      setRightBt('')
    }
    const clickEffect2 = ()=>{
   
      setLeftBt('')
      setRightBt('on')
    }
  return (
    <Container className="timeitem__container">
      <Row className="addItem">
        <form onSubmit={submitItem}>
          <Input type='type'/>
          <Input type="date" />
          <br/>
          <Button>추가</Button>
        </form>
      </Row>
      <Row className="changeItemContainer">
        <Col xs="6">
          <Button id={leftBt}
          
            onClick={() => {
              setItemBox(true);
              clickEffect()}}>
            currentItem
          </Button>
        </Col>
        <Col xs="6">
          <Button id={rightBt}
         
            onClick={() => {setItemBox(false);
              clickEffect2()}}>
            overdueItme
          </Button>
        </Col>
      </Row>
      {itemBox == true ? <CurrentItem currentItemBox = {currentItemBox} /> : <OverdueItem overdueItemBox = {overdueItemBox}/>}
    </Container>
  );
};

export default Timeitem;
