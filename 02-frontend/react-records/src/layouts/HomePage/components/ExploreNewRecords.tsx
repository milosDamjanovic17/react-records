import React from "react";
import { Link } from "react-router-dom";

const ExploreNewRecords = () => {


   return(

      <div className="p-5 mb-4 bg-dark header">
        <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
            <div>
               <h1 className="display-5 fw-bold">Explore new records here!</h1>
               <p className="col-md-8 fs-4">What's next on your playlist?</p>
               <Link to="/search" type="button" className="btn main-color btn-lg text-white">More records here</Link>
            </div>
        </div>
      </div>
   )
}

export default ExploreNewRecords;