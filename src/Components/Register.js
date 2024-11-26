import React from 'react';
import axios from "axios"
import { useState } from "react"
import {ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Register = () => {

  const [data, setData] =  useState({
    email: "",
    password: ""
})

const handleChange = (e) => {
  const {name, value} = e.target
  setData((prev)=>{
      return{...prev, [name]:value}
  })
}

const handleSubmit = (e) => {
  e.preventDefault()

  const token = sessionStorage.getItem("access_token")

  axios.post('http://localhost:4000/api/register', data,{
     headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
     } 
  })
  .then((res)=>{
      toast.success('Student Added Succefuly', {
          position:toast.POSITION.TOP_RIGHT,
          autoClose:3000
      })
  })
  .catch((err)=>{
      toast.error('There was an error when adding the Student', {
          position:toast.POSITION.TOP_RIGHT,
          autoClose:3000
      })
  })
}
  
    
  return (
    <div className="StudentForm">
      
      <form onSubmit={handleSubmit}>
      <label for="email">Email</label>
        <br/>
        <input type="email" name="email" placeholder="Enter you Email" onChange={handleChange}/>
        <br/>
        <label for="password">Password</label>
        <br/>
        <input type="password" name="password" placeholder="Enter you Password"  onChange={handleChange}/>

        <button type="submit">Submit</button>
        <ToastContainer/>
      </form>
    </div>
  );
};

export default Register;
