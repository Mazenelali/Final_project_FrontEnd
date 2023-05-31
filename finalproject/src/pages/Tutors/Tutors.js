import "./Tutor.css"
import TutorsCard from "./TutorsCard";
import { useState , useEffect  } from "react";
import axios from "axios";
import Loder from "../../component/loder/Loder";
import {MdArrowBackIosNew} from 'react-icons/md'
import {MdArrowForwardIos} from 'react-icons/md'
import { useContext } from "react";
import { UrlContext } from "../../Layout";

function Tutors () {
    const [DataTutors ,setDataTutors]=useState(null) 
    const [dataAwait ,setAwaitData] =useState([])

    const URL = useContext(UrlContext)
    
    const getDataTutors = ()=>{
        axios.get(`${URL}/User/`).then((response)=>{
            setDataTutors(response.data)
            setAwaitData ( splitArray( response.data , chunkSize))
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getDataTutors()
    },[])

     function splitArray(arr, chunkSize) {
        let result = [];
      
         for (let i = 0; i < arr.length; i += chunkSize) {
           let chunk = arr.slice(i, i + chunkSize);
          result.push(chunk);
        }
      
        return result;
      }
    
      let chunkSize = 5;
      
      
      
       // Output: [ [ 1, 2, 3 ], [ 4, 5, 6 ], [ 7, 8, 9 ] ]
    
      const [ increse ,  setincrese] = useState(0)
      const decrease =()=>{
        setincrese(increse-1)
        if( increse === 0 ){
          setincrese(0)
        }
      }
    
      const Increse = ()=>{
        setincrese(increse +1)
        if(increse  === dataAwait.length-1){
          setincrese(dataAwait.length-1)
        }
      }

    return ( 
    <div className="tutor">
        <div className="tutor-Constainer">
        <h3>Privet Tutors </h3>
        <div className="shearch-tutor">
            <input type="text"  placeholder="Shearch for teacher"/>
            <button>Shearch</button>
        </div>
        <div className="tutors-card-container">
            {!DataTutors  ?<Loder/> : dataAwait[increse].map((ele)=>{
                return <TutorsCard fullName ={`${ele.first_name} ${ele.last_name}`} classTitle = {ele.class_title} description= {ele.description} phone = {ele.number_phone} languages={ele.languages} image={ele.image} location = {ele.location}   />
            })
            }
        </div>
        <div className="pagination">
            <button onClick={decrease}><MdArrowBackIosNew/><MdArrowBackIosNew/>Previous</button>
            <p> Page  {dataAwait.indexOf(dataAwait[increse])} </p>
            <button onClick={Increse}> Next <MdArrowForwardIos/><MdArrowForwardIos/></button>
        </div>
        </div>
    </div>
    );
}

export default Tutors;