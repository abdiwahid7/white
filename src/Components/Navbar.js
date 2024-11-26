import { Link } from "react-router-dom/cjs/react-router-dom.min"

const Navbar = () =>{
    return(
        <div className="Nav">
            <div className="Left">
                <h1>Front End</h1>
            </div>
            <div className="Right">
                <div className="dropdown">
                    <button className="dropbtn">Students</button>
                    <div className="drop-content">
                        <Link to="/AddStudent" className="dropdown-item">
                        AddStudent
                        </Link>
                        <Link to="/AllStudent" className="dropdown-item">
                        AllStudent
                        </Link>
                    </div>
                </div>
                        {/* Other Links */}
        <div className="One">
          <Link to="/" className="one">Login</Link>
        </div>
        <div className="One">
          <Link to="/Register" className="one">Register</Link>
        </div>
        <div className="One">
          <Link to="/LogOut" className="one">Logout</Link>
        </div>
            </div>
        </div>
    )
}
export default Navbar