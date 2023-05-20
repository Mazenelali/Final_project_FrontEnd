import './Tutor.css'

function TutorsCard(props) {
    return ( 
        <div className="tutors_card">
            <div className="tutors-image">
                <img src={`http://localhost:4000/${props.image}`} alt="tuors" />
            </div>
            <div className='tutors-info'>
                <h3> {props.fullName}</h3>
                <div className='tutors-info-container' >
                <p className='class-title'>{props.classTitle}</p>
                <p><span>Trusted Teacher :</span> {props.description} </p>
                <p><span> Languages :</span> {props.languages} </p>
                <p><span> Location : </span> {props.location}</p>
                </div>

                <p className='phone-number'><span> Phone Number: </span>{props.phone}</p>
            </div>
        </div>
     );
}

export default TutorsCard;