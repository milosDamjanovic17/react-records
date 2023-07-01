import React, {useState, useEffect} from "react";
import ReturnRecord from "./ReturnRecord";
import SpinnerLoading from "../../../Utils/SpinnerLoading";
import RecordModel from "../../../models/Record";
import { Link } from "react-router-dom";

const Carousel = () => {

   const [records, setRecords] = useState<RecordModel[]>([]);
   const [isLoading, setIsLoading] = useState(true); // state for showing loading screen during the component fetching the data from backend API
   const [httpError, setHttpError] = useState(null);
 
 
   useEffect(() => {
 
     async function fetchRecords() {
       // fetch data from backend API path, we want only 9 records to be shown in our Carousel
       const baseUrl: string = `${process.env.REACT_APP_API}/records`;
 
       const url: string = `${baseUrl}?page=0&size=9`;
 
       const response = await fetch(url);
 
       if(!response.ok){
         throw new Error('Whoops! Something went wrong...');
       }
 
       const responseJson = await response.json(); // convert response to json file
 
       const responseData = responseJson._embedded.records;
 
       const loadedRecords: RecordModel[] = []; // instance of RecordModel array
 
       // populate loadedRecords collection
       for(const key in responseData){
         loadedRecords.push({
           id: responseData[key].id,
           title: responseData[key].title,
           artist: responseData[key].artist,
           description: responseData[key].description,
           copies: responseData[key].copies,
           copiesAvailable: responseData[key].copiesAvailable,
           genre: responseData[key].genre,
           img: responseData[key].img,
         })
       }
 
       setRecords(loadedRecords);
       setIsLoading(false);
     };
 
     // catch any errors during data fetch
     fetchRecords().catch((error: any) => {
       setIsLoading(false);
       setHttpError(error.message)
     })
   }, [])
 
   // render util Spinner Loading component if the state is still fetching data from our backend API
   if(isLoading){
     return(
       <SpinnerLoading/>
     )
   }
 
   // create error component if there are any http errors during data fetch 
   if(httpError){
     return(
       <div className='container m-5'>
         <p>{httpError}</p>
       </div>
     )
   }

   
   return(

      <div className="container mt-5 rounded" style={{ height: 550, backgroundColor: "#f7f7ff" }}>
      <div className="homepage-carousel-title">
        <h3>Find your next favourite record here!</h3>
      </div>
      <div
        id="carouselExampleControls"
        className="carousel carousel-dark slide mt-5 
        d-none d-lg-block"
        data-bs-interval="false"
      >
         {/* Desktop View */}
         <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex justify-content-center align-items-center">
              {records.slice(0,3).map(rec => (
                <ReturnRecord record={rec} key= {rec.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {records.slice(3,6).map(rec => (
                <ReturnRecord record={rec} key= {rec.id} />
              ))}
            </div>
          </div>
          <div className="carousel-item">
            <div className="row d-flex justify-content-center align-items-center">
              {records.slice(6,9).map(rec => (
                <ReturnRecord record={rec} key= {rec.id} />
              ))}
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleControls"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Mobile View */}
      <div className="d-lg-none mt-3">
        <div className="row d-flex justify-content-center align-items-center">
          <ReturnRecord record={records[2]} key={records[2].id}/>
        </div>
      </div>
      {/* View More btn */}
      <div className="homepage-carousel-title mt-3">
        <Link className="btn btn-outline-secondary btn-kg" to="/search">
          View More
        </Link>
      </div>
    </div>
   )
}

export default Carousel;