import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase';
import { onSnapshot, collection, doc, deleteDoc } from 'firebase/firestore';

const MyIllust = () => {
    const [myIllust, setMyIllust] = useState();


    useEffect(()=>{
        onSnapshot(collection(db, "myillust", auth.currentUser.uid, auth.currentUser.uid),
        (result) => {
            let box =[]
          result.forEach((doc) => {
            box.push(doc.data())
          });
            setMyIllust(box)
        }
      );
      console.log('db에서 myillust로 도감 넣기')
      return;
    },[])
    

    const deleteMyIllust = (e) => {
        const deleteKey = e.target.id;
        deleteDoc(
          doc(db, "myillust", auth.currentUser.uid, auth.currentUser.uid, deleteKey)
        );

      };

  return (
    <div className='myillust__container'>
       {myIllust &&
        myIllust.map((item, i) => {
          return (
            <div key={i}>
              <span>{item.name}</span>
              <span>{item.location}</span>
              <span>{item.abillity}</span>
              <button id={item.id} onClick={deleteMyIllust}>삭제</button>
            </div>
          );
        })}
    </div>
  )
}

export default MyIllust
