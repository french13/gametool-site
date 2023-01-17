import React from 'react'
import Login from '../pages/Login';
import Register from '../pages/Register';
import Todolist from '../pages/Todolist';
import Timeitem from '../pages/Timeitem';
import Illust from '../pages/Illust';
import { Routes,Route } from 'react-router-dom';

const RoutesContainer = () => {
  return (
     <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/todolist' element={<Todolist/>}/>
        <Route path='/timeitem' element={<Timeitem/>}/>
        <Route path='/illust' element={<Illust/>}/>
     </Routes>
  )
}

export default RoutesContainer
