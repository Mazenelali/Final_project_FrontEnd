import "./HomePage.css"
import hero from "../../image/hero.png"
import tutors from "../../image/tutors.jpg"
import library from "../../image/library.jpg"
import Footer from "../../component/footer/Footer"
import {useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import MiniLoder from "../../component/Mini-loder/MiniLoder"

function HomePage() {
    const navigate =useNavigate()

    const [dataTutors , setDataTutors] = useState(null)
    const [dataCourse , setDataCourse] = useState(null)

    const getDataTutors = ()=>{
        axios.get(`${process.env.REACT_APP_URL}/User/`).then((response)=>{
            setDataTutors(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const getDataCourse = ()=>{
        axios.get(`${process.env.REACT_APP_URL}/Post/`).then((response)=>{
            setDataCourse(response.data)
        }).catch((err)=>{
            console.log(err)
        })
    }

    useEffect(()=>{
        getDataTutors()
        getDataCourse()
    },[])

    return (
        <>
    <div className="HomePage">
        <div className="heroSection">
            <div className="description">
                <h1>Empower Your <span style={{color:'#FF673D'}}> Learning</span> Journey with Expert Online <span style={{color:'#FCDC5B'}}>Tutoring</span> </h1>
                <div className="buttons">
                <div className="button1">
                <button onClick={()=>{navigate('/tutors')}} >
                Find tutor
                </button>
                </div>
                <div className="button2">
                <button onClick={()=>navigate('/register')}>
                Become a tutor
                </button>
                </div>
                </div>
            </div>
            <div className="image">
                <img src={hero} alt="hero"/>
            </div>
        </div>
        <div className="carousel_tutors">
            <div className="the-tutors">
            <h2>
                Latest Tutors
            </h2>
            <div className="card-carousel">
            {!dataTutors? <MiniLoder/> : dataTutors.slice(0 , 9).map((ele)=>{return <div className="each-card">
                        <div className="cards">
                            <div className="imageofcarouser">
                                <img src={`${ele.image}`} alt=""/>
                            </div>
                            <div className="sub-image">
                                <h3> {`${ele.first_name} ${ele.last_name}`}</h3>
                                <p>{ele.class_title}</p>
                            </div>
                        </div>
                </div>})}
                
            </div>
            </div>
        </div>
        <div className="carousel_tutors" style={{marginTop:"100px"}}>
            <div className="the-tutors">
            <h2>
                Latest Cousers
            </h2>
            <div className="card-carousel">
            {!dataCourse? <MiniLoder/> : dataCourse.slice(0 , 9).map((ele)=>{return <div className="each-card">
                        <div className="cards">
                            <div className="imageofcarouser">
                                <img src={`${ele.image}`} alt=""/>
                            </div>
                            <div className="sub-image">
                                <h3>  {ele.title}</h3>
                                <p> {ele.description}</p>
                            </div>
                        </div>
                </div>})}
                
            </div>
            </div>
        </div>
        <div className="navigate-to" >
            <h2>Our tutors and courses</h2>
            <div className = "Our-tutors-section">
            <div className="section-under-hero" onClick={()=>{navigate('/tutors')}}>
                <div className="imageContainer">
                <img src={tutors} alt="tutors" />
                </div>
                <div className="Under-image">
                    <h4>+{!dataTutors ? 0 : dataTutors.length} tutors</h4>
                </div>
            </div>
            <div className="section-under-hero" onClick={()=>{navigate('/course')}}>
                <div className="imageContainer">
                <img src={library} alt="library" />
                </div>
                <div className="Under-image">
                <h4>+{!dataCourse ? 0 :dataCourse.length} course</h4> 
                </div>
            </div>
            </div>
        </div>
        <Footer/>
    </div>
    
    </>
    );
}

export default HomePage;