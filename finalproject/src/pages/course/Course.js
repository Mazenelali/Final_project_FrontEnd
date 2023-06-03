import "./Cours.css"
import {useState ,useEffect} from "react"
import axios from "axios"
import LoderCourse from "../../component/loderCourse/LoderCours"
import {MdArrowBackIosNew} from 'react-icons/md'
import {MdArrowForwardIos} from 'react-icons/md'
import {AiOutlineStar} from 'react-icons/ai'



function Course() {
    
    const [dataCouse , setDataCourse] = useState(null)
    const [dataAwait ,setAwaitData] =useState([])
    


    const getData= ()=>{
        axios.get(`${process.env.REACT_APP_URL}/Post/`).then((response)=>{
            console.log(response.data)
            setDataCourse(response.data)
            setAwaitData ( splitArray( response.data , chunkSize))
        }).catch((err)=>{
            console.log(err)
        })
    } 

    useEffect(()=>{
        getData()
    },[])

    function splitArray(arr, chunkSize) {
        let result = [];
      
         for (let i = 0; i < arr.length; i += chunkSize) {
           let chunk = arr.slice(i, i + chunkSize);
          result.push(chunk);
        }
      
        return result;
      }
    
      let chunkSize = 12;
      
      
      
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

        const [idFavorite ,setIdFavorite]=useState() 

      const MakeFavorite = ()=>{
        axios.post(`${process.env.REACT_APP_URL}/Student/addFavoriteCourse/${localStorage.getItem('_id')}` , idFavorite).then((response)=>{
            console.log(response)
        }).catch((err)=>{
            console.log(err)
        })
      }

      console.log(idFavorite)

    return (
        <>
            <div className="Cousers">
                <div className="head-of-page-couser">
                    <h2> Find your best course</h2>

                </div>
                <div className="all-card">
                {!dataCouse ? <LoderCourse/> : dataAwait[increse].map((ele)=>{

                return <article class="card"> 
                        {/* {localStorage.getItem('role') === 'student' ? <div className="input-star"> <input id="star1" class="Star" type="checkbox"  title="bookmark page" onClick={()=>{setIdFavorite({favorite_post_id : ele._id}) ; MakeFavorite()} }  /> </div> : null} */}
                        <img src={`${ele.image}`} alt="" />
                        <div class="card_content">
                            <span class="card_title">{ele.title}</span>
                            <div className="posted-by">
                                <div className="image-person">
                                    <img src={`${ele.User_id[0].image}`} alt=""/>
                                </div>
                                <span>{`${ele.User_id[0].first_name} ${ele.User_id[0].last_name}`}</span>
                            </div>
                            <p className ="numberPhonePost">Number Phone : {ele.User_id[0].number_phone}</p>
                            <span class="card_subtitle">Description : {ele.description}</span>
                            <p class="card_description">
                                <span> Duration : {ele.availble_week} </span>
                                <span> Price : {ele.price} $</span>
                                <span> location : {ele.location} </span>
                            </p>

                        </div>
                    </article>
                    }) }
                </div>
                <div className="pagination">
            <button onClick={decrease}><MdArrowBackIosNew/><MdArrowBackIosNew/>Previous</button>
            <p> Page  {dataAwait.indexOf(dataAwait[increse])} </p>
            <button onClick={Increse}> Next <MdArrowForwardIos/><MdArrowForwardIos/></button>
        </div>
            </div>
        </>);
}

export default Course;