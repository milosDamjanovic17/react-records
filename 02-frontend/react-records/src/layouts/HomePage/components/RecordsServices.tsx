import React from "react";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

const RecordsServices = () => {

  const {authState} = useOktaAuth();

  const authCheck = () => {
    return (
      authState?.isAuthenticated ? 
      (
        <Link type="button" className="btn main-color btn-lg px-4 me-md-2 fw-bold text-white" to="/messages">
          Library Services
        </Link>
      ) 
        : 
      (
        <Link className="btn main-color btn-lg text-white" to="/login">
          Sign up
        </Link>
      )
    )
  };

  return (
    <div className="container my-5">
      <div className="row p-4 align-items-center border shadow-lg">
        <div className="col-lg-7 p-3">
          <h1 className="display-4 f2-bold">
            Can't find what you are looking for?
          </h1>
          <p className="lead">
            If you don't see what you are looking for, send us a message!
          </p>
          <div className="d-grid gap-2 justify-content-md-start mb-4 mb-3">
            {authCheck()}
          </div>
        </div>
        <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
      </div>
    </div>
  );
};

export default RecordsServices;
