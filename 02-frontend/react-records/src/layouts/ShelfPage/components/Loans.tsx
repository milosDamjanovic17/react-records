import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";
import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";
import SpinnerLoading from "../../../Utils/SpinnerLoading";

const Loans = () => {

   const {authState} = useOktaAuth();

   const[httpError, setHttpError] = useState(null);

   // Current loans states
   const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoans[]>([]);
   const [isLoadingUserLoans, setIsLoadingUserLoans] = useState(true);

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
   }, [authState]);

   if(isLoadingUserLoans){
      return (<SpinnerLoading />)
   }

   if(httpError) { return (<div className="container m-5"> {httpError}</div>)}

   return('');
}

export default Loans;