import axios from "axios"
import { useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import {ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const AddStudent = () =>{
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        gender: "",
        coursename: ""
    })
    const history = useHistory()

    const handleChange = (e) =>{
        const {name, value} = e.target
        setData((prev)=>{
            return{...prev, [name]:value}
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const token = sessionStorage.getItem('accessToken')
        axios.post('http://localhost:4000/api/addStudent',data,{
            headers:{
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res)=>{
            toast.success('Student Added Successfully',{
                position:toast.POSITION.TOP_RIGHT,
                autoClose:3000
            })
            history.push("/AllStudent")
        })
        .catch((err)=>{
            toast.error('Error while adding student',{
                position:toast.POSITION.TOP_RIGHT,
                autoClose:3000
            })
        })
    }

    return(
        <div className="StudentForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">Firstname</label>
                <br/>
                <input type="text" name="firstname" placeholder="Enter Firstname" onChange={handleChange}/>
                <label htmlFor="lastname">Lastname</label>
                <br/>
                <input type="text" name="lastname" placeholder="Enter Lastname" onChange={handleChange}/>
                <label htmlFor=" gender">Gender</label>
                <br/>
                <input type="text" name="gender" placeholder="Enter Gender" onChange={handleChange}/>
                <label for="coursename">Course:</label>
                <br/>
                <select name="coursename" id="coursename"  onChange={handleChange}>
                 <option value="">Select your course</option>
                 <option value="certificate_software_development">certificate_software_development</option>
                 <option value="diploma_software_development">diploma_software_development</option>
                 <option value="certificate_cyber_security">certificate_cyber_security</option>
                 <option value="diploma_cyber_security">diploma_cyber_security</option>
             </select>
             <button type="submit">Submit</button>
             <ToastContainer/>
            </form>
            {/* <p>{data.firstname}</p>
            <p>{data.lastnameastname}</p>
            <p>{data.gender}</p>
            <p>{data.coursename}</p> */}
        </div>
    )
}
export default AddStudent