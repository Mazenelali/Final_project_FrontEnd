import "../loderCourse/LoderCours.css"

function LoderCourse() {

    let repet = [1,1,1,1,1,1 ,1 ,1]

    return (
        <div className="loderCourse">
           {repet.map(()=>{ return <div className="card-all">
                <div className="card-1"></div>
                <div className="right">
                    <div className="card-2"></div>
                    <div className="card-3"></div>
                    <div className="card-3"></div>
                    <div className="card-3"></div>
                    <div className="card-3"></div>
                    <div className="bottom">
                        <div className="card-4"></div>
                        <div className="card-4"></div>
                        <div className="card-4"></div>
                    </div>
                </div>
            </div>})}

        </div>
    );
}

export default LoderCourse;