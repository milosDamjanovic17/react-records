import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import SpinnerLoading from "../../../Utils/SpinnerLoading";
import LoansModal from "./LoansModal";

const Loans = () => {

   const {authState} = useOktaAuth();

   const[httpError, setHttpError] = useState(null);

   // Current loans states
   const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
   const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

   // checkout state
   const [checkout, setCheckout] = useState(false);

   // useEffect for fetching current record loans from logged user
   useEffect(() => {

      const fecthUserCurrentLoans = async () => {
      
         if(authState && authState.isAuthenticated){
            const url = `http://localhost:8080/api/records/secure/currentloans`;

            const requestOptions = {
               method: 'GET',
               headers: {
                  Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                  'Content-Type': 'application/json'
               }
            };

            const shelfCurrentLoansResponse = await fetch(url, requestOptions);
            if(!shelfCurrentLoansResponse.ok){
               throw new Error('Something went wrong => Loans/currentLoansUseEffect!')
            }

            const shelfCurrentLoansResponseJson = await shelfCurrentLoansResponse.json();
            setShelfCurrentLoans(shelfCurrentLoansResponseJson);
         }

         setIsLoadingUserLoans(false);
      }

      fecthUserCurrentLoans().catch((error:any) => {
         setIsLoadingUserLoans(false);
         setHttpError(error.message);
      })

      window.scrollTo(0, 0)
   }, [authState, checkout]);

   if(isLoadingUserLoans){
      return (<SpinnerLoading />)
   }

   if(httpError) { return (<div className="container m-5"> {httpError}</div>)};

   async function returnRecord (recordId: number) {
      const url = `http://localhost:8080/api/records/secure/return/?recordId=${recordId}`;
      const requestOptions = {
         method: 'PUT',
         headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
         }
      };
      const returnResponse = await fetch(url, requestOptions);

      if(!returnResponse.ok){
         throw new Error('Something went wrong Loans/returnRecord function')
      }
      setCheckout(!checkout)
   }

   return(
      <div>
         {/**DESKTOP */}
         <div className="d-none d-lg-block mt-2">
            {shelfCurrentLoans.length > 0 ?
               <>
               <h5>Current loans: </h5>
                  {shelfCurrentLoans.map(s => (
                     <div key={s.record.id}>
                        <div className="row mt-3 mb-3">
                           <div className="col-4 col-md-4 container">
                              {
                                 s.record?.img ?
                                    <img src={s.record?.img} width="220" height="280" alt="Record" />
                                    :
                                    <img src={require('./../../../Images/RecordsImages/default-vinyl.jpg')} width="220" height="280" alt="Record"/>
                              }
                           </div>
                           <div className="card col-3 col-md-3 container d-flex">
                              <div className="card-body">
                                 <div className="mt-3">
                                    <h4>Loan Options</h4>
                                    {s.daysLeft > 0 &&
                                       <p className="text-secondary">
                                          Due in {s.daysLeft} days.
                                       </p>
                                    }
                                    {s.daysLeft === 0 && 
                                       <p className="text-success">
                                          Due today!
                                       </p>
                                    }
                                    {s.daysLeft < 0 &&
                                       <p className="text-danger">
                                          Past due by {s.daysLeft} days!
                                       </p>
                                    }
                                    <div className="list-group mt-3">
                                       <button className="list-group-item list-group-item-action" aria-current="true" data-bs-toggle="modal" data-bs-target={`#modal${s.record.id}`}>
                                          Manage Loan
                                       </button>
                                       <Link to={'search'} className="list-group-item list-group-item-action">
                                          Search more records?
                                       </Link>
                                    </div>
                                 </div>
                                 <hr/>
                                 <p className="mt-3">
                                    Help others find their records by posting a review
                                 </p>
                                 <Link className="btn btn-primary" to={`checkout/${s.record.id}`}>
                                    Leave a review
                                 </Link>
                              </div>
                           </div>
                        </div>
                        <hr/>
                        <LoansModal shelfCurrentLoans={s} mobile={false} returnRecord={returnRecord}/>
                     </div>
                  ))}
               </> :
               <>
                  <h3 className="mt-3">
                     Currently no loans
                  </h3>
                  <Link className="btn btn-primary" to={`search`}>
                     Search your record here
                  </Link>
               </>
            }
         </div>


         {/**MOBILE */}
         <div className="container d-lg-none mt-2">
            {shelfCurrentLoans.length > 0 ?
               <>
               <h5 className="mb-3">Current loans: </h5>
                  {shelfCurrentLoans.map(s => (
                     <div key={s.record.id}>
                           <div className="d-flex justify-content-center align-items-center">
                              {
                                 s.record?.img ?
                                    <img src={s.record?.img} width="220" height="280" alt="Record" />
                                    :
                                    <img src={require('./../../../Images/RecordsImages/default-vinyl.jpg')} width="220" height="280" alt="Record"/>
                              }
                           </div>
                           <div className="card d-flex mt-5 mb-3">
                              <div className="card-body container">
                                 <div className="mt-3">
                                    <h4>Loan Options</h4>
                                    {s.daysLeft > 0 &&
                                       <p className="text-secondary">
                                          Due in {s.daysLeft} days.
                                       </p>
                                    }
                                    {s.daysLeft === 0 && 
                                       <p className="text-success">
                                          Due today!
                                       </p>
                                    }
                                    {s.daysLeft < 0 &&
                                       <p className="text-danger">
                                          Past due by {s.daysLeft} days!
                                       </p>
                                    }
                                    <div className="list-group mt-3">
                                       <button className="list-group-item list-group-item-action" aria-current="true" data-bs-toggle="modal" data-bs-target={`#mobilemodal${s.record.id}`}>
                                          Manage Loan
                                       </button>
                                       <Link to={'search'} className="list-group-item list-group-item-action">
                                          Search more records?
                                       </Link>
                                    </div>
                                 </div>
                                 <hr/>
                                 <p className="mt-3">
                                    Help others find their records by posting a review
                                 </p>
                                 <Link className="btn btn-primary" to={`checkout/${s.record.id}`}>
                                    Leave a review
                                 </Link>
                              </div>
                           </div>
                        <hr/>
                        <LoansModal shelfCurrentLoans={s} mobile={true} returnRecord={returnRecord}/>
                     </div>
                  ))}
               </> :
               <>
                  <h3 className="mt-3">
                     Currently no loans
                  </h3>
                  <Link className="btn btn-primary" to={`search`}>
                     Search your record here
                  </Link>
               </>
            }
         </div>
      </div>
   );
}

export default Loans;