import { db } from "../firebase";
import {
  onSnapshot,
  where,
  query,
  collection,
  getDoc,
  doc,
  serverTimestamp,
  setDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

// id중복확인을 하기위해 유저 데이터 가져오기
const getUserDoc = (collectionName, fieldName, value) => {
  return query(collection(db, collectionName), where(fieldName, "==", value));
};

// 회원가입시 유저의 기본적인 db 문서 설치 [users, todolist, timeitem, myillust]
const setCollectionDoc = (collectionName, userUid, value) => {
  return setDoc(doc(db, collectionName, userUid), {
    uid: userUid,
    email: value,
    time: serverTimestamp(),
  });
};

// subCollection에 데이터 추가하기
const setSubCollectionDoc = (collectionName, userUid, name, title, content) => {
  const id = String(new Date().getTime());
  return setDoc(doc(db, collectionName, userUid, userUid, id), {
    id: id,
    name: name,
    title: title,
    content : content,                                            
    time: serverTimestamp(),
  });
};
// subCollection에 있는 Doc(item) 삭제하기
const deleteSubCollectionDoc = (collectionName, userUid, id) => {
  return deleteDoc(
    doc(db, collectionName, userUid, userUid, id)
  );
};
// subCollection에 있는 Doc 수정하기
const updateSubCollectionDoc = (collectionName, userUid, id, updateTitle, updateContent)=>{
   return updateDoc(doc(db,collectionName, userUid, userUid , id),
   {
     title: updateTitle,
     content: updateContent,
   }
 );
}

















export { getUserDoc, setCollectionDoc, setSubCollectionDoc, deleteSubCollectionDoc, updateSubCollectionDoc };
