import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import AdminMessages from "./components/AdminMessages";
import AddNewRecord from "./components/AddNewRecord";
import ChangeQuantity from "./components/ChangeQuantity";


const ManageRecordsPage = () => {

   const {authState} = useOktaAuth();

   const [changeQuantityOfRecordsClick, setChangeQuantityOfRecordsClick] = useState(false);
   const [messagesClick, setMessagesClick] = useState(false);

   function addRecordClickFC(){
      setChangeQuantityOfRecordsClick(false);
      setMessagesClick(false);
   }

   function changeQuantityOfRecordsFC(){
      setChangeQuantityOfRecordsClick(true)
      setMessagesClick(false)
   }

   function messagesClickFC(){
      setChangeQuantityOfRecordsClick(false)
      setMessagesClick(true)
   }

   // check if user that wants to access admin page is actually has an admin role
   if(authState?.accessToken?.claims.userType === undefined){
      return <Redirect to='/home'/>
   }

   return(
      <div className="container">
         <div className="mt-5">
            <h3>Manage Records Inventory</h3>
            <nav>
               <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button onClick={addRecordClickFC}  className="nav-link active" id='nav-add-record-tab' data-bs-toggle='tab'
                     data-bs-target='#nav-add-record' type='button' role='tab' aria-controls='nav-add-record' aria-selected='false'
                  >
                     Add new record
                  </button>
                  <button onClick={changeQuantityOfRecordsFC} className="nav-link" id='nav-quantity-tab' data-bs-toggle='tab'
                     data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity' aria-selected='true'
                  >
                     Change quantity
                  </button>
                  <button onClick={messagesClickFC} className="nav-link" id='nav-messages-tab' data-bs-toggle='tab'
                     data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages' aria-selected='true'
                  >
                     Messages
                  </button>
               </div>
            </nav>
            <div className="tab-content" id='nav-tab-content'>
               <div className="tab-pane fade show active" id='nav-add-record' role="tabpanel"
                  aria-labelledby="nav-add-record-tab">
                     <AddNewRecord />
               </div>
               <div className="tab-pane fade" id='nav-quantity' role="tabpanel" aria-labelledby="nav-quantity-tab">
                  {changeQuantityOfRecordsClick ? <ChangeQuantity /> : <></>}
               </div>
               <div className="tab-pane fade" id='nav-messages' role="tabpanel" aria-labelledby="nav-messages-tab">
               {messagesClick ? <AdminMessages /> : <></>}
               </div>
            </div>
         </div>
      </div>
   )
}

export default ManageRecordsPage;