import { Link } from "react-router-dom";
import RecordModel from "../../models/Record";

const CheckoutAndReviewBox: React.FC<{record: RecordModel | undefined, mobile: boolean, 
   currentLoansCount: number, isAuthenticated: any, 
   isCheckedOut: boolean, checkoutRecord: any
   isReviewLeft: boolean}> = (props) => {


   function buttonRender(){

      if(props.isAuthenticated){
         if(!props.isCheckedOut && props.currentLoansCount < 5){
            return (<button onClick={() => props.checkoutRecord()} className="btn btn-success btn-lg">Checkout</button>)
         } else if(props.isCheckedOut){
            return (<p><b>Record checked out. Enjoy listening!</b></p>)
         } else if(!props.isCheckedOut){
            return (<p className="text-danger">You already have 5 vinyls checked out!</p>)
         }
      }
      return (<Link to={'/login'} className="btn btn-success btn-lg">Sign In</Link>)
   }

   function reviewRender(){
      if(props.isAuthenticated && !props.isReviewLeft){
         return(<p>Leave a review component here</p>)
      }else if(props.isAuthenticated && props.isReviewLeft){
         return(<p><b>Thanks for your review!</b></p>)
      }
      return (<div><hr><p>Sign in to leave a review!</p></hr></div>)
   }

   return(
      <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
         <div className="card-body container">
            <div className="mt-3">
               <p>
                  <b>{props.currentLoansCount}/5 </b>
                  records checked out
               </p>
               <hr/>
               {props.record && props.record.copiesAvailable && props.record.copiesAvailable > 0 ?
                  <h4 className="text-success">
                     Available
                  </h4>
                  :
                  <h4 className="text-danger">
                     Wait list
                  </h4>
               }
               <div className="row">
                  <p className="col-6 lead">
                     <b>{props.record?.copies} </b>
                     copies
                  </p>
                  <p className="col-6 lead">
                     <b>{props.record?.copiesAvailable} </b>
                     available
                  </p>
               </div>
            </div>
            {buttonRender()}
            <hr/>
            <p className="mt-3">
               This number can change until placing order has been complete
            </p>
            {reviewRender()}
         </div>
      </div>
   )
} 

export default CheckoutAndReviewBox;