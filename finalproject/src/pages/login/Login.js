import "./Login.css"
import { useNavigate } from "react-router-dom";
import {BiArrowBack} from "react-icons/bi"
import { useState , useEffect } from "react";
import axios from "axios";


function Login() {
    const navigation = useNavigate()
    const [dataLogin ,setDataLogin]=useState({
        email:"" ,
        password : ""
})

const [visible , setvisible] = useState(false)
const [responseLogin , setResposeLogin] = useState()







const submitLogin = ()=>{
    axios.post(`https://educate-mazenelali.onrender.com/User/login` , dataLogin).then((response)=>{
        console.log(response)
        setResposeLogin(response.data.message)
        
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('full name', `${response.data.user.first_name} ${response.data.user.last_name}`);
        localStorage.setItem('_id', response.data.user._id);
        localStorage.setItem('role', response.data.user.role);
        localStorage.setItem('image', response.data.user.image);

        setvisible(true)
        setTimeout(() => {
            navigation("/homepage")
        }, 1600 );
        
    }).catch((err)=>{
        console.log(err)
    })
}
   const handleChange = (e)=>{
    const value = e.target.value
    setDataLogin({
        ...dataLogin,
        [e.target.name]:value
    })
   }

    return (
        <div className="login">
            <div>
            <div className="back-to-home">
                <button onClick={()=>{navigation('/homepage')}}> < BiArrowBack/> <span> Back to Home </span></button> 
            </div>
            <div class="triangle-down"></div>
            </div>
            <section className="section_form">
                <h2>Login</h2>
                <div id="consultation-form" className="feed-form">
                    {visible&&<p><span>{responseLogin}</span></p>}
                    <input name="email" required="" placeholder="E-mail" type="email" onChange={handleChange} />
                    <input name="password" type="password" required="" placeholder="Password" onChange={handleChange} />
                    <button className="button_submit" onClick={()=>{ submitLogin()}} >Login</button>
                </div>
                <p>don't have an account? <button className="register-now" onClick={()=>{navigation('/register')}}>register now</button></p>
            </section>
        </div>);
}

export default Login;