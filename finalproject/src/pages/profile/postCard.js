

function PostCard(props) {
    return ( <>
            <div className="tutors_card" style={{ height :"220px"}}>
            <div className="tutors-image">
                <img src={`http://localhost:4000/${props.image}`} alt="tuors" />
            </div>
            <div className='tutors-info'>
                <h3><span>title : </span> {props.title} </h3>
                <div className='tutors-info-container' >
                <p className='class-title'><span>description :</span> {props.description}</p>
                <p><span>start date end date :</span> {props.start_date_end_date} </p>
                <p><span> price :</span> {props.price} </p>
                <p><span> Location : </span> {props.location}</p>
                </div>
            </div>
        </div>
    </> );
}

export default PostCard;