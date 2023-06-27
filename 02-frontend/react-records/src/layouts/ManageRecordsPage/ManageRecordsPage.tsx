import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";


const ManageRecordsPage = () => {

   const {authState} = useOktaAuth();

   const [changeQuantityOfRecordsClick, setChangeQuantityOfRecordsClick] = useState(false);
   const [messagesClick, setMessagesClick] = useState(false);


   return(
      <div className="container">
         <div className="mt-5">
            <h3>Manage Records Inventory</h3>
            <nav>
               <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id='nav-add-record-tab' data-bs-toggle='tab'
                     data-bs-target='#nav-add-record' type='button' role='tab' aria-controls='nav-add-record' aria-selected='false'
                  >
                     Add new record
                  </button>
                  <button className="nav-link" id='nav-quantity-tab' data-bs-toggle='tab'
                     data-bs-target='#nav-quantity' type='button' role='tab' aria-controls='nav-quantity' aria-selected='true'
                  >
                     Change quantity
                  </button>
                  <button className="nav-link" id='nav-messages-tab' data-bs-toggle='tab'
                     data-bs-target='#nav-messages' type='button' role='tab' aria-controls='nav-messages' aria-selected='true'
                  >
                     Messages
                  </button>
               </div>
            </nav>
            <div className="tab-content" id='nav-tab-content'>
               <div className="tab-pane fade show active" id='nav-add-record' role="tabpanel"
                  aria-aria-labelledby="nav-add-record-tab">
                     Add new record
               </div>
               <div className="tab-pane fade" id='nav-quantity' role="tabpanel" aria-labelledby="nav-quantity-tab">
                  Change quantity
               </div>
               <div className="tab-pane fade" id='nav-messages' role="tabpanel" aria-labelledby="nav-messages-tab">
                  Admin messages
               </div>
            </div>
         </div>
      </div>
   )

}

export default ManageRecordsPage;