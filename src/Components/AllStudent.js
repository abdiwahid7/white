import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllStudent = () =>{
    const [Unuthorized, setUnauthorized] = useState(false)
    const [records, setRecord] = useState([])
    const history = useHistory()

    const loadEdit = (student_id) =>{
        history.push(`/EditStudent/${student_id}`)
    }

    const loadDetails = (student_id) =>{
        history.push(`/StudentDetail/${student_id}`)
    }

    const loadDelete = (student_id) =>{
        if(window.confirm('Are You Sure You Want To Delete These Student')){
            const token = sessionStorage.getItem('accessToken')
            axios.delete(`http://localhost:4000/api/deleteStudent/${student_id}`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(()=>{
                toast.success('Student Deleted Successfully',{
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose:3000
                })
                setRecord(records.filter((record)=>record.student_id !== student_id))
            })
            .catch(()=>{
                toast.error('Error while deleting Student',{
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose:3000
                })
            })
        }
    }

    useEffect(()=>{
        const token = sessionStorage.getItem('accessToken')
        axios.get('http://localhost:4000/api/getAllStudentWithCourse',{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })
        .then((res)=>{
            console.log(res.data);
            setRecord(res.data)
        })
        .catch((err)=>{
            if(err.response && err.response.status === 403){
                setUnauthorized(true)
            }
        })
    },[])


    return(
        <div className="container">
            <div className="content">
                <div className="title">
                  <h5>AllStudent Details</h5>
                  <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>Course</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {records.map((r,i)=>(
                               <tr key={i}>
                                    <td>{r.firstname}</td>
                                    <td>{r.lastname}</td>
                                    <td>{r.gender}</td>
                                    <td>{r.course?.coursename || "N/A"}</td>
                                    <td>
                                        <div className="dropDown">
                                            <button className="dropDown-Btn">Perform Action</button>
                                            <div className="dropdownmenu">
                                                <Link to="/action-1" className="dropdown-item" onClick={(e)=>{e.preventDefault(); loadDetails(r.student_id)}}>Details</Link>
                                                <Link to="/EditStudent/:student_id" className="dropdown-item" onClick={(e)=>{e.preventDefault(); loadEdit(r.student_id)}}>Edit</Link>
                                                <Link to="/delete" className="dropdown-item" onClick={(e)=>{e.preventDefault(); loadDelete (r.student_id)}}>Delete</Link>
                                            </div>
                                        </div>
                                    </td>
                               </tr> 
                            ))}
                        </tbody>
                    </table>
                  </div>
                </div>
            </div>
        </div>
    )



}
export default AllStudent