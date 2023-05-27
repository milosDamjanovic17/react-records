import React, { useEffect, useState } from "react";
import RecordModel from "../../models/Record";
import SpinnerLoading from "../../Utils/SpinnerLoading";

const RecordCheckoutPage = () => {
  const [record, setRecord] = useState<RecordModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  //expose record id
  const recordId = window.location.pathname.split("/")[2]; //recordsapp.com/checkout/**id**

  useEffect(() => {
   async function fetchRecord() {

      // expose selected recordId
      const baseUrl: string = `http://localhost:8080/api/records/${recordId}`;

      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Whoops! Something went wrong, didn't find record...");
      }

      const responseJson = await response.json(); // convert response to json file


      const loadedRecord: RecordModel= { // instance of RecordModel obj, bind model to responseJson
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
      <h3>Component works!</h3>
    </div>
  );
};

export default RecordCheckoutPage;
