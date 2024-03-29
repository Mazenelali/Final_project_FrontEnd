import './App.css';
import {  Routes ,Route} from "react-router-dom"
import Tutors from './pages/Tutors/Tutors';
import HomePage from './pages/HomePage/HomePage';
import Layout from './Layout';
import Course from './pages/course/Course';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import PageNotFound from './pages/pageNotFound/PageNotFound';

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/' element={<Layout/>}>
        <Route index element = {<HomePage/>}/>
        <Route path='/tutors' element = {<Tutors/>}/>
        <Route path='/course' element = {<Course/>}/>
        <Route path='/profile' element = {<Profile/>}/>
        
        </Route>
        <Route path='*' element={<PageNotFound/>} /> 
      </Routes>
    
    </div>
  );
}

export default App;
