import React, { useEffect, useState } from "react";
import RecordModel from "../../models/Record";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import StarsReview from "../../Utils/StarsReview";
import CheckoutAndReviewBox from "./CheckoutAndReviewBox";

const RecordCheckoutPage = () => {
  const [record, setRecord] = useState<RecordModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //expose record id
  const recordId = window.location.pathname.split("/")[2]; //recordsapp.com/checkout/**id**

  useEffect(() => {
   async function fetchRecord() {

      // expose backend API selected recordId
      const baseUrl: string = `http://localhost:8080/api/records/${recordId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Whoops! Something went wrong, didn't find record...");
      }

      const responseJson = await response.json(); // convert response to json file

      const loadedRecord: RecordModel= { // instance of RecordModel obj, bind model properties with responseJson
         id: responseJson.id,
         title: responseJson.title,
         artist: responseJson.artist,
         description: responseJson.description,
         copies: responseJson.copies,
         copiesAvailable: responseJson.copiesAvailable,
         genre: responseJson.genre,
         img: responseJson.img,
      }; 

      setRecord(loadedRecord);
      setIsLoading(false);
    }

    // catch any errors during data fetch
    fetchRecord().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  // load spinner component
  if(isLoading){
   return <SpinnerLoading />
  }

  // show our http error if exists
  if(httpError){
   return (
      <div className="container m-5">
         <p>{httpError}</p>
      </div>
   )
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
         <div className="row mt-5">
            <div className="col-sm-2 col-md-2">
               {record?.img ?
                  <img src={record.img} width='290' height='310' alt="Record" />
                     :
                  <img src={require('../../Images/RecordsImages/default-vinyl.jpg')} width='290' height='310' alt="Record"/>   
               }  
            </div>
            <div className="col-4 col-md-4 container">
               <div className="ml-2">
                  <h2>{record?.title}</h2>
                  <h5 className="text-primary">{record?.artist}</h5>
                  <p className="lead">{record?.description}</p>
                  <StarsReview rating={4.5} size={32} />
               </div>
            </div>
            <CheckoutAndReviewBox record = {record} mobile={false} />
         </div>
         <hr/>
      </div>
      <div className="container d-lg-none mt-5"> {/* Mobile view container */}
         <div className="d-flex justify-content-center align-items-center">
               {record?.img ?
                  <img src={record.img} width='280' height='300' alt="Record" />
                     :
                  <img src={require('../../Images/RecordsImages/default-vinyl.jpg')} width='280' height='300' alt="Record"/>   
               }  
         </div>
         <div className="mt-4">
            <div className="ml-2">
               <h2>{record?.title}</h2>
               <h5 className="text-primary">{record?.artist}</h5>
               <p className="lead">{record?.description}</p>
               <StarsReview rating={4.5} size={32} />
            </div>
         </div>
         <CheckoutAndReviewBox record = {record} mobile={true} />
            <hr/>
      </div>
    </div>
  );
};

export default RecordCheckoutPage;
