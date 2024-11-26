import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const StudentDetails = () => {
  const { student_id} = useParams(); // Extract the student ID from the URL
  const [student, setStudent] = useState(null); // State to store student details
  const [loading, setLoading] = useState(true); // State for loading status
  const history = useHistory();

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    axios
      .get(`http://localhost:4000/api/getOneStudentWithCourse/${student_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setStudent(res.data); // Set the student data
      })
      .catch((err) => {
        console.error("Error fetching student details:", err);
        alert("Failed to load student details.");
      })
      .finally(() => {
        setLoading(false); // Stop the loading indicator
      });
  }, [student_id]);

  if (loading) {
    return <p>Loading student details...</p>;
  }

  if (!student) {
    return <p>No student details found.</p>;
  }

  return (
    <div className="student-details-container">
      <div className="student-card">
        <h3 className="card-title">Student Details</h3>
        <p className="card-text">
          <strong>Firstname:</strong> {student.firstname}
        </p>
        <p className="card-text">
          <strong>Lastname:</strong> {student.lastname}
        </p>
        <p className="card-text">
          <strong>Gender:</strong> {student.gender}
        </p>
        <p className="card-text">
        <strong>Course:</strong> {student.course?.coursename || "Not Assigned"}
        </p>
        <button
          className="back-button"
          onClick={() => history.push("/AllStudent")}
        >
          Back to All Students
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
