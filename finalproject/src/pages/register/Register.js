import "./Register.css"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {BiArrowBack} from "react-icons/bi"
import axios from "axios"

function Register() {
    const navigation = useNavigate()

    const [isClickedButton1, setIsClickedButton1] = useState(false);
    const [isClickedButton2, setIsClickedButton2] = useState(false);

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
        formData.append('image', postDataTutors.image);
        formData.append('first_name', postDataTutors.first_name);
        formData.append('last_name', postDataTutors.last_name);
        formData.append('languages', postDataTutors.languages);
        formData.append('email' , postDataTutors.email)
        formData.append('class_level', postDataTutors.class_level);
        formData.append('class_title', postDataTutors.class_title);
        formData.append('location', postDataTutors.location);
        formData.append('password', postDataTutors.password);
        formData.append('description', postDataTutors.description);
        formData.append('number_phone', postDataTutors.number_phone);

       axios.post("http://localhost:4000/User/",formData ).then((response)=>{
        console.log(response)
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
        axios.post('http://localhost:4000/Student/addStudent/',postDataStudent).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
      }
      console.log(postDataTutors)

    return (<>
        <div className="register">
            <div className="back-to-home">
                <button onClick={()=>{navigation('/homepage')}}> < BiArrowBack/> <span> Back to Home </span></button> 
            </div>
            <section className="section_form">
                <h2>Register</h2>
                <div className="register-as" >
                    <button onClick={handleClickButton1}
                        style={ isClickedButton1 ? {color:"black" , borderBottom:"1px solid black"} : undefined }>Register as tutors</button>
                    <button
                        onClick={handleClickButton2}
                        style={  isClickedButton2 ? {color:"black" , borderBottom:"1px solid black"} : undefined }>Register as student</button>
                </div>

                {isClickedButton1&&<div id="consultation-form" className="feed-form" >
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
                    <input name="image" required="" placeholder="Image" type="file" onChange={(e)=>{setDataTutors({...postDataTutors, image: e.target.files[0]})}}/>
                    

                    <button className="button_submit" onClick={SubmitTutors}>Register</button>
                </div>}

                {isClickedButton2 &&<div id="consultation-form" className="feed-form" >

                    <div className="input-beSide">
                    <input name="first_name" required="" placeholder="First Name" type="text" onChange={handleChangeStudent}/>
                    <input name="last_name" required="" placeholder="Last Name" type="text" onChange={handleChangeStudent} />
                    </div>

                    <input name="email" required="" placeholder="E-mail" type="email" onChange={handleChangeStudent} />
                    <input name="password" type="password" required="" placeholder="Password" onChange={handleChangeStudent} />
                    <button className="button_submit" onClick={submitStudent}>Register</button>
                </div>}

            </section>
        </div>
        </>
    );
}

export default Register;