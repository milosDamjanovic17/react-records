import React from "react";

const Footer = () => {

   return(
      <div className="main-color">
      <footer className="container d-flex flex-wrap justify-content-between align-items-center py-5 main-color">
         <p className="col-mb-4 mb-0 text-white">© Moose Records App, Inc</p>
         <ul className="nav navbar-dark col-md-4 justify-content-end">
            <li className="nav-item">
               <a href="#" className="nav-link px-2 text-white">
                  Home
               </a>
            </li>
            <li className="nav-item">
               <a href="#" className="nav-link px-2 text-white">
                  Search Records
               </a>
            </li>
         </ul>
      </footer>
   </div>
   )
}

export default Footer;