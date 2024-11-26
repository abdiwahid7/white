import {BrowserRouter as Router,Route, Switch  } from 'react-router-dom/cjs/react-router-dom';
import './App.css';
import AddStudent from './Components/AddStudent';
import Navbar from './Components/Navbar';
import AllStudent from './Components/AllStudent';
import UpdateStudent from './Components/UpdateStudent';
import StudentDetails from './Components/StudentDetails';
import { useContext } from 'react';
import { AuthContext } from './Components/Auth';
import Login from './Components/Login';
import Register from './Components/Register';
import LogOut from './Components/LogOut';

function App() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Router>
      {/* Render Navbar only if the user is authenticated */}
      {isAuthenticated && <Navbar />}
    <div className="App">
      <Switch>
      <Route exact path="/">
            <Login/>
          </Route>
          <Route path="/Register">
            <Register />
          </Route>
        <Route path='/AddStudent'>
        <AddStudent/>  
        </Route>
        <Route path='/AllStudent'>
        <AllStudent/>  
        </Route>
        <Route path='/EditStudent/:student_id'>
        <UpdateStudent/>  
        </Route>
        <Route path='/StudentDetail/:student_id'>
        <StudentDetails/>  
        </Route>
        <Route path="/LogOut">
            <LogOut />
          </Route>
      </Switch>

    </div>
    </Router>
  );
}

export default App;
