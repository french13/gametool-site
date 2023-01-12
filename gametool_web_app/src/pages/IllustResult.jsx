
import React, {useEffect, useState} from "react";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";

const IllustResult = ({ illustBox }) => {

    const addMyIllust = async(e) =>{
        const date = String(new Date().getTime());
        const name = e.target.previousSibling.previousSibling.previousSibling.innerText
        const location = e.target.previousSibling.previousSibling.innerText
        const abillity = e.target.previousSibling.innerText

        await setDoc(doc(db, "myillust", auth.currentUser.uid, auth.currentUser.uid, date), {
          id: date,
          name: name,
          location: location,
          abillity : abillity,
          time: serverTimestamp(),
        });

        console.log('클릭해서 db에 도감 넣기')
    }


  return (
    <div className="illustResult__container">
      {illustBox &&
        illustBox.map((item, i) => {
          return (
            <div key={i}>
              <span>{item.name}</span>
              <span>{item.location}</span>
              <span>{item.abillity}</span>
              <button onClick={addMyIllust}>+</button>
            </div>
          );
        })}
    </div>
  );
};

export default IllustResult;
