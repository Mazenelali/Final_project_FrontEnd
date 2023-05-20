import "./Tutor.css"
import TutorsCard from "./TutorsCard";
import { useState , useEffect  } from "react";
import axios from "axios";
import Loder from "../../component/loder/Loder";


function Tutors () {
    const [DataTutors ,setDataTutors]=useState(null) 
    
    const getDataTutors = ()=>{
        axios.get("http://localhost:4000/User/").then((response)=>{
            setDataTutors(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getDataTutors()
    },[])

    return ( 
    <div className="tutor">
        <div className="tutor-Constainer">
        <h3>Privet Teacher </h3>
        <div className="shearch-tutor">
            <input type="text"  placeholder="Shearch for teacher"/>
            <button>Shearch</button>
        </div>
        <div className="tutors-card-container">
            {!DataTutors?<Loder/> : DataTutors.map((ele)=>{
                return <TutorsCard fullName ={`${ele.first_name} ${ele.last_name}`} classTitle = {ele.class_title} description= {ele.description} phone = {ele.number_phone} languages={ele.languages} image={ele.image} location = {ele.location}   />
            })
            }
        </div>
        </div>
    </div>
    );
}

export default Tutors;