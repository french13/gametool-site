import { db } from "../firebase";
import { onSnapshot, where, query, collection, getDoc, doc } from "firebase/firestore";



// id중복확인을 하기위해 유저 데이터 가져오기
const getUserDoc = (collectionName, fieldName, value)=>{
   return  query(collection(db, collectionName), where(fieldName, "==", value));
}





export  {getUserDoc}