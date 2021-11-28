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
        <Route path="*" element={<Navigate to="/login" />}/>
      </Routes>
  );
}

export default App;
