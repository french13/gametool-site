import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { onSnapshot, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { deleteSubCollectionDoc } from "../apis/apis";

const MyIllustBox = () => {
  const [myIllust, setMyIllust] = useState();

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
        }
      );
      return;
    });
  }, []);

  const deleteMyIllust = async (e) => {
    await deleteSubCollectionDoc("myillust", auth.currentUser.uid, e.target.id);
  };

  return (
    <div className="myillust__container">
      {myIllust &&
        myIllust.map((item, i) => {
          return (
            <div key={i}>
              <span>{item.name}</span>
              <span>{item.title}</span>
              <span>{item.content}</span>
              <button id={item.id} onClick={deleteMyIllust}></button>
            </div>
          );
        })}
    </div>
  );
};

export default MyIllustBox;
