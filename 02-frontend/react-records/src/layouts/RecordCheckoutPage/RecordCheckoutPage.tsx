import React, { useEffect, useState } from "react";
import RecordModel from "../../models/Record";
import SpinnerLoading from "../../Utils/SpinnerLoading";
import StarsReview from "../../Utils/StarsReview";
import CheckoutAndReviewBox from "./CheckoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import { error } from "console";
import LatestReviews from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../models/ReviewRequestModel";

const RecordCheckoutPage = () => {

   const {authState} = useOktaAuth();

  const [record, setRecord] = useState<RecordModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // Review related states
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [totalStars, setTotalStars] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  // Loans count state
  const[currentLoansCount, setCurrentLoansCount] = useState(0);
  const[isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

  // is record checked out already?
  const[isCheckedOut, setIsCheckedOut] = useState(false);
  const [isLoadingRecordCheckedOut, setIsLoadingRecordCheckedOut] = useState(true)

  // Payment
  const [displayError, setDisplayError] = useState(false);

  //expose record id
  const recordId = window.location.pathname.split("/")[2]; //recordsapp.com/checkout/**id**

  // useEffect for fetching the Record obj
  useEffect(() => {
   async function fetchRecord() {

      // expose backend API selected recordId
      const baseUrl: string = `${process.env.REACT_APP_API}/records/${recordId}`;

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
  }, [isCheckedOut]);

  // useEffect for fetching record Reviews
  useEffect(() => {
   async function fetchRecordReviews() {
      
      const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByRecordId?recordId=${recordId}`;

      const responseReviews = await fetch(reviewUrl);

      if(!responseReviews.ok){
         throw new Error('Something went wrong.....')
      }

      const responseJsonReviews = await responseReviews.json();

      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for(const key in responseData){
         loadedReviews.push({
            id: responseData[key].id,
            userEmail: responseData[key].userEmail,
            date: responseData[key].date,
            rating: responseData[key].rating,
            recordId: responseData[key].recordId,
            reviewDescription: responseData[key].reviewDescription
         });
         weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      // round up review decimals
      if(loadedReviews){
         const round = (Math.round((weightedStarReviews / loadedReviews.length) * 2) / 2).toFixed(1);
         setTotalStars(Number(round));
      }

      setReviews(loadedReviews);
      setIsLoadingReview(false);
   }
   fetchRecordReviews().catch((error: any) => {
      setIsLoadingReview(false);
      setHttpError(error.message);
   })
  },[isReviewLeft])

  // useEffect for checking if current user in session already left a review to clicked record
  useEffect(() => {
   const fetchUserReviewRecord = async () => {

      if(authState && authState.isAuthenticated){
         const url = `${process.env.REACT_APP_API}/reviews/secure/user/record/?recordId=${recordId}`;

         const requestOptions = {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${authState.accessToken?.accessToken}`,
               'Content-Type': 'application/json'
            }
         };
         const userReview = await fetch(url, requestOptions);
         if(!userReview.ok){
            throw new Error('Something went wrong!');
         }

         const userReviewResponseJson = await userReview.json();
         setIsReviewLeft(userReviewResponseJson);
         setIsLoadingUserReview(false);
      }

   }
   fetchUserReviewRecord().catch((error: any) => {
      setIsLoadingUserReview(false);
      setHttpError(error.message);
   })
  }, [authState])

  // useEffect for loans count
  useEffect(() => {

      const fetchUserCurrentLoansCount = async () => {

         if(authState && authState.isAuthenticated){
            const url = `${process.env.REACT_APP_API}/records/secure/currentcheckout/count`;
            const requestOptions = {
               method: 'GET',
               headers: {
                  Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                  'Content-Type': 'application/json'
               }
            };
            const currentLoansCountResponse = await fetch(url, requestOptions);
            if(!currentLoansCountResponse.ok){
               throw new Error('Something went wrong');
            }
            const currentLoansCountResponseJson = await currentLoansCountResponse.json();
            setCurrentLoansCount(currentLoansCountResponseJson);
         }

         setIsLoadingCurrentLoansCount(false);
      }
      fetchUserCurrentLoansCount().catch((error:any) => {
         setIsLoadingCurrentLoansCount(false);
         setHttpError(error.message);
      })
  },[authState, isCheckedOut])

  // useEffect for is record isCheckedOut
  useEffect(() => {
   const fetchUserCheckedOutRecord = async () => {

      if(authState && authState.isAuthenticated){
         const url = `${process.env.REACT_APP_API}/records/secure/ischeckedout/byuser?recordId=${recordId}`;
         const requestOptions = {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${authState.accessToken?.accessToken}`,
               'Content-Type': 'application/json'
            }
         };
         const recordCheckedOut = await fetch(url, requestOptions);

         if(!recordCheckedOut.ok){
            throw new Error('Something went wrong!');
         }

         const recordCheckedOutResponseJson = await recordCheckedOut.json();

         setIsCheckedOut(recordCheckedOutResponseJson);
      }
      setIsLoadingRecordCheckedOut(false);
   }

   fetchUserCheckedOutRecord().catch((error:any) => {
      setIsLoadingRecordCheckedOut(false);
      setHttpError(error.message)
   })
  }, [authState])

  // load spinner component
  if(isLoading || isLoadingReview || isLoadingCurrentLoansCount || isLoadingRecordCheckedOut || isLoadingUserReview){
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

  async function checkoutRecord() {
   const url = `${process.env.REACT_APP_API}/records/secure/checkout/?recordId=${recordId}`;
   const requestOptions = {

      method: 'PUT',
      headers: {
         Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
         'Content-Type': 'application/json',
      }
   }
   const checkoutResponse = await fetch(url, requestOptions);
   if (!checkoutResponse.ok){
      setDisplayError(true);
      throw new Error('Something went wrong');
   }
   setDisplayError(false);
   setIsCheckedOut(true);
  }

  // submit review function
  async function submitReview(starInput: number, reviewDescription: string){

   let recordId: number = 0;
   if(record?.id){
      recordId = record.id;
   }

   const reviewRequestModel = new ReviewRequestModel(starInput, recordId, reviewDescription);

   const url = `${process.env.REACT_APP_API}/reviews/secure`;
   const requestOptions = {
      method: 'POST',
      headers: {
         Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviewRequestModel),
   };

   const returnResponse = await fetch(url, requestOptions);

   if(!returnResponse.ok){
      throw new Error('Something went wrong!')
   }
   setIsReviewLeft(true);
  }

  return (
    <div>
      <div className="container d-none d-lg-block">
         {displayError && 
            <div className="alert alert-danger mt-3" role="alert">
               Please pay outstanding fees or return late record(s)
           </div>
         }
         <div className="row mt-5">
            <div className="col-sm-2 col-md-2">
               {record?.img ?
                  <img src={record.img} width='250' height='310' alt="Record" />
                     :
                  <img src={require('../../Images/RecordsImages/default-vinyl.jpg')} width='290' height='310' alt="Record"/>   
               }  
            </div>
            <div className="col-4 col-md-4 container">
               <div className="ml-2">
                  <h2>{record?.title}</h2>
                  <h5 className="text-primary">{record?.artist}</h5>
                  <p className="lead">{record?.description}</p>
                  <StarsReview rating={totalStars} size={32} />
               </div>
            </div>
            <CheckoutAndReviewBox record = {record} mobile={false} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} 
            isCheckedOut={isCheckedOut} checkoutRecord={checkoutRecord} isReviewLeft={isReviewLeft} submitReview={submitReview}/>
         </div>
         <hr/>
         <LatestReviews reviews={reviews} recordId={record?.id} mobile = {false}/>
      </div>
      <div className="container d-lg-none mt-5"> {/* Mobile view container */}
      {displayError && 
            <div className="alert alert-danger mt-3" role="alert">
               Please pay outstanding fees or return late record(s)
           </div>
         }
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
               <StarsReview rating={totalStars} size={32} />
            </div>
         </div>
         <CheckoutAndReviewBox record = {record} mobile={true} currentLoansCount={currentLoansCount} isAuthenticated={authState?.isAuthenticated} 
         isCheckedOut={isCheckedOut} checkoutRecord={checkoutRecord} isReviewLeft={isReviewLeft} submitReview={submitReview}/>
            <hr/>
            <LatestReviews reviews={reviews} recordId={record?.id} mobile = {true}/>
      </div>
    </div>
  );
};

export default RecordCheckoutPage;
