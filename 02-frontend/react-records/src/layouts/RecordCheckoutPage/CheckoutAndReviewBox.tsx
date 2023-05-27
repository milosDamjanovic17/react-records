import { Link } from "react-router-dom";
import RecordModel from "../../models/Record";

const CheckoutAndReviewBox: React.FC<{record: RecordModel | undefined, mobile: boolean}> = (props) => {


   return(
      <div className={props.mobile ? 'card d-flex mt-5' : 'card col-3 container d-flex mb-5'}>
         <div className="card-body container">
            <div className="mt-3">
               <p>
                  <b>0/5 </b>
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
            <Link to='/#' className="btn btn-success btn-large">Sign In</Link>
            <hr/>
            <p className="mt-3">
               This number can change until placing order has been complete
            </p>
            <p>
               Sign in to be able to leave a review and rating.
            </p>
         </div>
      </div>
   )
} 

export default CheckoutAndReviewBox;