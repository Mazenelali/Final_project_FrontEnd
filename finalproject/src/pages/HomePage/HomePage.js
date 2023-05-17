import "./HomePage.css"
import hero from "../../image/hero.png"
import tutors from "../../image/tutors.jpg"
import library from "../../image/library.jpg"
import {useNavigate} from "react-router-dom"

function HomePage() {
    const navigate =useNavigate()

    return (
    <div className="HomePage">
        <div className="heroSection">
            <div className="description">
                <h1>Empower Your Learning Journey with Expert Online Tutoring</h1>
                <div className="buttons">
                <div className="button1">
                <button onClick={()=>{navigate('/tutors')}} >
                Find tutor
                </button>
                </div>
                <div className="button2">
                <button>
                Become a tutor
                </button>
                </div>
                </div>
            </div>
            <div className="image">
                <img src={hero} alt="hero"/>
            </div>
        </div>
        <div className="navigate-to" >
            <h2>Our tutors and courses</h2>
            <div className = "Our-tutors-section">
            <div className="section-under-hero" onClick={()=>{navigate('/tutors')}}>
                <img src={tutors} alt="tutors" />
                <div className="Under-image">
                    <h4>+600 tutors</h4>
                </div>
            </div>
            <div className="section-under-hero" onClick={()=>{navigate('/course')}}>
                <img src={library} alt="library" />
                <div className="Under-image">
                <h4>+400 course</h4> 
                </div>
            </div>
            </div>
        </div>
        <footer>
            
        </footer>
    </div>
    );
}

export default HomePage;