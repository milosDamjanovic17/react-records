import { useOktaAuth } from "@okta/okta-react";
import {useEffect, useState} from 'react';
import MessagesModel from "../../../models/MessagesModel";
import SpinnerLoading from "../../../Utils/SpinnerLoading";

const AdminMessages = () => {

   const {authState} = useOktaAuth();

   // Normal loading pieces
   const [isLoadingMessages, setIsLoadingMessages] = useState(true);
   const [httpError, setHttpError] = useState(null);

   // Messages endpoint States
   const [messages, setMessages] = useState<MessagesModel[]>([]);
   const [messagesPerPage] = useState(5);

   // pagination
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);

   useEffect(() => {
      const fetchUserMessages = async () => {
         
      }
      fetchUserMessages().catch((error:any) => {
         setIsLoadingMessages(false);
         setHttpError(error.message)
      })
      window.scrollTo(0, 0);
   }, [authState, currentPage])

   if(isLoadingMessages){
      return <SpinnerLoading />
   }

   if(httpError){
      return (
         <div className="container m-5">
            <p>{httpError}</p>
         </div>
      )
   }

   const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

   return(
      <div>

      </div>
   )
}

export default AdminMessages;