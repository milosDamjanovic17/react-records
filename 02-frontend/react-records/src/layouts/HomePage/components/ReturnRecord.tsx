import React from "react";
import RecordModel from "../../../models/Record";

const ReturnRecord: React.FC<{ record: RecordModel}> = (props) => {
  return (
    <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
      <div className="text-center">
        {props.record.img ? (
          <img src={props.record.img} width="170" height="220" alt="record" />
        ) : (
          <img
            src={require("./../../../Images/RecordsImages/default-vinyl.jpg")}
            width="170"
            height="220"
            alt="record"
          />
        )}
        <h6 className="mt-2">{props.record.title}</h6>
        <p>{props.record.artist}</p>
        <a className="btn main-color text-white" href="#">
          Order here
        </a>
      </div>
    </div>
  );
};

export default ReturnRecord;
