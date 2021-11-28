import React from 'react';
import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import {Todolist} from "./components/Todolist";

function App() {
  return (
      <Routes >
        <Route path='/login' element={<Login/>}/>
        <Route path='/todolist' element={<Todolist/>}/>
        {/*<Route path='/404' element={<NotFound/>}/>*/}
        <Route path="*" element={<Navigate to="/404" />}/>
      </Routes>
  );
}

export default App;
