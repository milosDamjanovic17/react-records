import { Link } from "react-router-dom";
import RecordModel from "../../../models/Record";

const SearchRecord: React.FC<{ record: RecordModel }> = (props) => {
  
  return (
    <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
      <div className="row g-0">
        <div className="col-md-2">
          <div className="d-none d-lg-block">
            {props.record.img ? (
              <img
                src={props.record.img}
                width="135"
                height="180"
                alt="record"
              />
            ) : (
              <img
                src={require("../../../Images/RecordsImages/default-vinyl.jpg")}
                width="135"
                height="180"
                alt="record"
              />
            )}
          </div>
          <div className="d-lg-none d-flex justify-content-center align-items-center">
            {props.record.img ? (
              <img
                src={props.record.img}
                width="135"
                height="180"
                alt="record"
              />
            ) : (
              <img
                src={require("../../../Images/RecordsImages/default-vinyl.jpg")}
                width="135"
                height="180"
                alt="record"
              />
            )}
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <h5 className="card-title">{props.record.artist}</h5>
            <h4>{props.record.title}</h4>
            <p className="card-text">{props.record.description}</p>
          </div>
        </div>
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <Link to={`/checkout/${props.record.id}`} 
            className="btn btn-md main-color text-white">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchRecord;
