import { useEffect, useState } from "react";
import RecordModel from "../../../models/Record";
import { useOktaAuth } from "@okta/okta-react";

const ChangeQuantityRecord: React.FC<{ record: RecordModel, deleteRecord: any }> = (props, key) => {

   const {authState} = useOktaAuth();
   const [quantity, setQuantity] = useState<number>(0);
   const [remaining, setRemaining] = useState<number>(0);

   useEffect(() => {
      const fetchRecordInState = () => {
         props.record.copies ? setQuantity(props.record.copies) : setQuantity(0);
         props.record.copiesAvailable ? setRemaining(props.record.copiesAvailable) : setRemaining(0);
      };

      fetchRecordInState();
   },[]);

   async function increaseQuantity() {
      
      const url = `http://localhost:8080/api/admin/secure/increase/record/quantity/?recordId=${props.record?.id}`;
      const requestOptions = {
         method: 'PUT',
         headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
         }
      };

      const quantityUpdateResponse = await fetch(url, requestOptions);

      if(!quantityUpdateResponse.ok){
         throw new Error('Something went wrong!')
      }

      setQuantity(quantity + 1);
      setRemaining(remaining + 1);
   }

   async function decreaseQuantity() {

      const url = `http://localhost:8080/api/admin/secure/decrease/record/quantity/?recordId=${props.record?.id}`;
      const requestOptions = {
         method: 'PUT',
         headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
         }
      };

      const quantityUpdateResponse = await fetch(url, requestOptions);

      if(!quantityUpdateResponse.ok){
         throw new Error('Something went wrong!')
      }

      setQuantity(quantity - 1);
      setRemaining(remaining - 1);
   }

   async function deleteRecord(){

      const url = `http://localhost:8080/api/admin/secure/delete/record/?recordId=${props.record?.id}`;
      const requestOptions = {
         method: 'DELETE',
         headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            'Content-Type': 'application/json'
         }
      };

      const updateResponse = await fetch(url, requestOptions);

      if(!updateResponse.ok){
         throw new Error('Something went wrong!')
      }

      props.deleteRecord();
   }

   return (
      <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
         <div className="row g-0">
            <div className="col-md-2">
               <div className="d-none d-lg-block">
                  {props.record.img ?
                     <img src={props.record.img} width='130' height='160' alt="Record" />
                     :
                     <img src={require('./../../../Images/RecordsImages/default-vinyl.jpg')} width='130' height='160' alt="Record" />
                  }
               </div>
               <div className="d-lg-none d-flex justify-content-center align-items-center">
                  {props.record.img ?
                     <img src={props.record.img} width='130' height='160' alt="Record" />
                     :
                     <img src={require('./../../../Images/RecordsImages/default-vinyl.jpg')} width='130' height='160' alt="Record" />
                  }                 
               </div>
            </div>
            <div className="col-md-6">
               <div className="card-body">
                  <h5 className="card-tutle">{props.record.artist}</h5>
                  <h4>{props.record.title}</h4>
                  <p className="card-text">{props.record.description}</p>
               </div>
            </div>
            <div className="mt-3 col-md-4">
               <div className="d-flex justify-content-center align-items-center">
                  <p>Total quantity: <b>{quantity}</b></p>
               </div>
               <div className="d-flex justify-content-center align-items-center">
                  <p>Records remaining: <b>{remaining}</b></p>
               </div>   
            </div>
            <div className="mt-3 col-md-1">
               <div className="d-flex justify-content-start">
                  <button className="m-1 btn btn-md btn-danger" onClick={deleteRecord}>Delete</button>
               </div>
            </div>
            <button className="m1 btn btn-md main-color text-white" onClick={increaseQuantity}>Increase</button>
            <button className="m1 btn btn-md btn-warning" onClick={decreaseQuantity}>Decrease</button>
         </div>
      </div>
   )
}

export default ChangeQuantityRecord;