import "./Register.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {BiArrowBack} from "react-icons/bi"
import axios from "axios"
import { useContext } from "react";
import { UrlContext } from "../../Layout";
function Register() {
    const navigation = useNavigate()

    const [isClickedButton1, setIsClickedButton1] = useState(false);
    const [isClickedButton2, setIsClickedButton2] = useState(false);
    const URL = useContext(UrlContext)
    const [image , setImage] = useState()

    const [postDataTutors ,setDataTutors] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
        class_title:"",
        class_level:"",
        languages:"",
        location:"",
        description:"",
        number_phone :"",
        image:null,
    })

    const [postDataStudent , setDataStudent] = useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
    })

    const handleClickButton1 = () => {
        setIsClickedButton1(true);
        setIsClickedButton2(false);
    };

    const handleClickButton2 = () => {
        setIsClickedButton1(false);
        setIsClickedButton2(true);
    };


    const handleChange = (e) => {
        const value = e.target.value;
        setDataTutors({
          ...postDataTutors,
          [e.target.name]: value
        });
      };


    const SubmitTutors = ()=>{
        console.log(postDataTutors)
        const formData = new FormData();
        formData.append('image', image);

        axios.post ('https://api.imgbb.com/1/upload?key=1d88a70f2899ea43e3ea29a52cfadddb' , formData).then((res)=>{
            console.log(res)
            const data = postDataTutors
            data.image = res.data.data.url
            axios.post(`https://educate-mazenelali.onrender.com/User/`,postDataTutors ).then((response)=>{
                console.log(response)
                navigation('/login')
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    }

    const handleChangeStudent = (e) => {
        const value = e.target.value;
        setDataStudent({
          ...postDataStudent,
          [e.target.name]: value
        });
      };
    
      const submitStudent = ()=>{
        axios.post(`${URL}/Student/addStudent/`,postDataStudent).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
      }
      console.log(postDataTutors)

    return (<div  >
        <div className="register">
            <div>
            </div>
            <div className="back-to-home">
                <button onClick={()=>{navigation('/homepage')}}> < BiArrowBack/> <span> Back to Home </span></button> 
            </div>
            <section className="section_form" >
                <h2>Register</h2>
                <div className="register-as" style={{display:"flex" , justifyContent:"center" ,width:"100%"}} >
                    <button onClick={handleClickButton1}
                        style={ isClickedButton1 ? {color:"black" , borderBottom:"1px solid black"} : undefined }>Register as tutors</button>
                    {/* <button
                        onClick={handleClickButton2}
                        style={  isClickedButton2 ? {color:"black" , borderBottom:"1px solid black"} : undefined }>Register as student</button> */}
                </div>

                {isClickedButton1&&<div id="consultation-form" className="feed-form small_input"  >
                    <div className="input-beSide">
                    <input name="first_name" required="" placeholder="First Name" type="text" onChange={handleChange} />
                    <input name="last_name" required="" placeholder="Last Name" type="text" onChange={handleChange} />
                    </div>

                    <input name="email" required="" placeholder="E-mail" type="email"  onChange={handleChange}/>
                    <input name="password" type="password" required="" placeholder="Password" onChange={handleChange}/>
                    <input name="description" required="" placeholder="Description about your self" type="text"  onChange={handleChange}/>
                    <input name="number_phone" required="" placeholder="Phone Number whit ur country code" type="text"  onChange={handleChange}/>
                    <input name="class_title" required="" placeholder="Class Title" type="text" onChange={handleChange} />
                    <div className="input-beSide">
                    <input name="class_level" required="" placeholder="Class Level" type="text"  onChange={handleChange}/>
                    <input name="languages" required="" placeholder="Languages" type="text" onChange={handleChange} />
                    </div>
                    
                    <input name="location" required="" placeholder="Location" type="text" onChange={handleChange} />
                    
                    
                    
                    <label> Uplod image Profile</label>
                    <input name="image" required="" placeholder="Image" type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
                    

                    <button className="button_submit"  onClick={SubmitTutors}>Register</button>
                </div>}
{/* 
                {isClickedButton2 &&<div id="consultation-form" className="feed-form" >

                    <div className="input-beSide">
                    <input name="first_name" required="" placeholder="First Name" type="text" onChange={handleChangeStudent}/>
                    <input name="last_name" required="" placeholder="Last Name" type="text" onChange={handleChangeStudent} />
                    </div>

                    <input name="email" required="" placeholder="E-mail" type="email" onChange={handleChangeStudent} />
                    <input name="password" type="password" required="" placeholder="Password" onChange={handleChangeStudent} />
                    <button className="button_submit" onClick={submitStudent}>Register</button>
                </div>} */}

            </section>
        </div>
        </div>
    );
}

export default Register;