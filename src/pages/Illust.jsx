import React, { useCallback, useState, useRef } from 'react'
import { Container, Row, Col, Input, Button } from 'reactstrap'
import { onSnapshot, collection, where, query } from 'firebase/firestore'
import { auth, db } from '../firebase'
import IllustResultBox from '../components/IllustResultBox'
import MyIllustBox from '../components/MyIllustBox'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Illust = () => {
  const [illustBox, setIllustBox] =useState()
  const [boxChange, setBoxChange] = useState(false)
  const illustBoxRef = useRef(null)

  let illustQuantity = useSelector((state)=>{return state.illustQuantity})

  const searchIllustSelect = (e) =>{
    onSnapshot(query(collection(db, 'deck'), where('type', '==', e.target.value)), (result)=>{
      let box = []
     result.forEach((doc)=>{

      box.push(doc.data());
     })
     setIllustBox(box)
    })
    console.log('셀렉트에서 result로 도감 넣기')
  }

  const searchIllustInput = async(e) => {
    const q = query(collection(db, 'deck'), where("name", ">=", String(e.target.value)), where("name", "<=", String(e.target.value) + "\uf8ff"))
    onSnapshot(q, (result)=>{
      let box = []
      result.forEach((doc)=>{
     
        box.push(doc.data())
      })
      setIllustBox(box)
     })
     console.log('인풋에서 result로 도감 넣기')
  }

  const boxRotate = (className, boolean) => {
    illustBoxRef.current.className= className;
    setBoxChange(boolean)
  }

  return (
    <Container className='illust__container'>
      <header>
        아이템 도감
        {
          boxChange === false ?
          <Button className='myillustButton' onClick={()=>{boxRotate("illustBox rotateOn", true) }}>
            <span className='myillustQuantity'>{illustQuantity}</span>
            MY 도감리스트
            </Button> :
          <Button  onClick={()=>{boxRotate("illustBox rotateReset", false)}}>도감 검색</Button>
        }
       
      </header>
      <Row><Input placeholder='도감 이름을 찾아보세요.' className='illust__input' onChange={searchIllustInput}/></Row>
      <Row>
      <select className="deckSelect" onChange={searchIllustSelect}>
          <option>-- 몬스터 선택 --</option>
          <option value="BOSS">보스 몬스터</option>
          <option value="MUTATION">돌연변이 몬스터</option>
          <option value="LV1">Lv 1 - 20</option>
          <option value="LV21">Lv 21 - 40</option>
          <option value="LV41">Lv 41 - 60</option>
          <option value="LV61">Lv 61 - 80</option>
          <option value="LV81">Lv 81 - 100</option>
          <option value="LV101">Lv 101 - 120</option>
          <option value="LV121">Lv 121 - 140</option>
          <option value="LV141">Lv 141 - 160</option>
          <option value="LV161">Lv 161 - 180</option>
          <option value="LV181">Lv 181 - 200</option>
          <option value="LV201">Lv 201 - 220</option>
          <option value="LV221">Lv 221 - 240</option>
          <option value="LV241">Lv 241 - 260</option>
          <option value="LV261">Lv 261 - 280</option>
          <option value="ULV1">ULv 1 - 1000</option>
          <option value="ULV1001">ULv 1001 - 2000</option>
          <option value="ULV2001">ULv 2001 - 3000</option>
          <option value="ULV3001">ULv 3001 - 4000</option>
          <option value="ULV4001">ULv 4001 - 5000</option>
        </select>
      </Row>
      <Outlet></Outlet>
      <div ref={illustBoxRef} className='illustBox'>
      <IllustResultBox illustBox={illustBox}/>
      <MyIllustBox/>
      </div>
    </Container>
  )
}

export default Illust
