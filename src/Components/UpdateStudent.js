import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const UpdateStudent = () => {
  const { student_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    coursename: ""
  });

  const history = useHistory();

  useEffect(() => {
    setLoading(true);

    axios
      .get(`http://localhost:4000/api/getOneStudentWithCourse/${student_id}`)
      .then((res) => {
        setData({
          student_id: res.data.student_id,
          firstname: res.data.firstname,
          lastname: res.data.lastname,
          gender: res.data.gender,
          coursename: res.data.course ? res.data.course.coursename : "", 
        });
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  }, [student_id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

const saveStudent = (e) => {
    e.preventDefault();
    console.log("Payload being sent:", data); // Log payload
    const token = sessionStorage.getItem("accessToken");
    setLoading(true);
    axios
      .patch(`http://localhost:4000/api/updateStudent/${student_id}`, data,{
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
      })
      .then(() => {
        alert("Student updated successfully");
        history.push("/AllStudent");
      })
      .catch((err) => {
        alert("An error occurred while updating the record.");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });

      
};


  return (
    <div className="update-student-container">
      <form className="update-student-form" onSubmit={saveStudent}>
        <h4 className="form-title">Edit Student</h4>

        <input
          type="hidden"
          value={data.student_id}
          name="_id"
          disabled
          className="hidden-input"
        />

        <div className="form-group">
          <label htmlFor="firstname">Firstname:</label>
          <br/>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={data.firstname}
            onChange={handleChange}
            placeholder="Enter Firstname"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Lastname:</label>
          <br/>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={data.lastname}
            onChange={handleChange}
            placeholder="Enter Lastname"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <br/>
          <input
            type="text"
            id="gender"
            name="gender"
            value={data.gender}
            onChange={handleChange}
            placeholder="Enter Gender"
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
        <label htmlFor="coursename">Course Name:</label>
        <br/>
          <input
            type="text"
            id="coursename"
            name="coursename"
            value={data.coursename}
            onChange={handleChange}
            placeholder="Enter course"
            required
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className="update-button"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
