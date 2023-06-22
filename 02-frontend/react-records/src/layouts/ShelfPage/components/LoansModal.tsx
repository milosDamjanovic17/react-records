import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";

const LoansModal: React.FC<{ shelfCurrentLoans: ShelfCurrentLoans, mobile: boolean, returnRecord: any }> = (props) => {


   return(
      <div className="modal fade" id={props.mobile ? `mobilemodal${props.shelfCurrentLoans.record.id}` : `modal${props.shelfCurrentLoans.record.id}`} 
         data-bs-backdrop='static' data-bs-keyboard='false' aria-labelledby="staticBackdropLabel" aria-hidden='true' key={props.shelfCurrentLoans.record.id}>
            <div className="modal-dialog">
               <div className="modal-content">
                  <div className="modal-header">
                     <h5 className="modal-title" id='staticBackdropLabel'>
                        Loan options
                     </h5>
                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
                     </button>
                  </div>
                  <div className="modal-body">
                     <div className="container">
                        <div className="mt-3">
                           <div className="row">
                              <div className="col-2">
                                 {props.shelfCurrentLoans.record?.img ? 
                                    <img src={props.shelfCurrentLoans.record?.img}
                                       width='50' height='80' alt="Record"
                                    />
                                    :
                                    <img src={require('./../../../Images/RecordsImages/default-vinyl.jpg')}
                                       width='50' height='80' alt="Record"
                                    />
                                 }
                              </div>
                              <div className="col-10">
                                 <h6>{props.shelfCurrentLoans.record.artist}</h6>
                                 <h4>{props.shelfCurrentLoans.record.title}</h4>
                              </div>
                           </div>
                           <hr/>
                              {props.shelfCurrentLoans.daysLeft > 0 &&
                                 <p className="text-secondary">
                                    Due in {props.shelfCurrentLoans.daysLeft} days.
                                 </p>
                              }
                              {props.shelfCurrentLoans.daysLeft === 0 && 
                                 <p className="text-success">
                                     Due today!
                                 </p>
                              }
                              {props.shelfCurrentLoans.daysLeft < 0 &&
                                 <p className="text-danger">
                                    Past due by {props.shelfCurrentLoans.daysLeft} days!
                                 </p>
                              }
                              <div className="list-grop mt-3">
                                 <button onClick={() => props.returnRecord(props.shelfCurrentLoans.record.id)} 
                                    data-bs-dismiss='modal' className="list-group-item list-group-item-action"
                                    aria-current='true'>
                                       Return record
                                 </button>
                                 <button data-bs-dismiss='modal' 
                                    className={
                                          props.shelfCurrentLoans.daysLeft < 0 ?
                                             'list-group-item list-group-item-action inactiveLink' :
                                             'list-group-item list-group-item-action'
                                          }>
                                          {props.shelfCurrentLoans.daysLeft < 0 ? 
                                             'Late dues cannot be renewed' : 'Renew loan for 7 days'
                                          }
                                 </button>
                              </div>
                        </div>
                     </div>
                  </div>
                  <div className="modal-footer">
                     <button type="button" className="btn btn-secondary" data-bs-dismiss='modal'>
                           Close
                     </button>
                  </div>
               </div>
            </div>
      </div>


   )
}

export default LoansModal;