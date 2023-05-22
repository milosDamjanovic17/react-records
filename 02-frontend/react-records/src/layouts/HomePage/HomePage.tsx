import React from "react";
import ExploreNewRecords from "./components/ExploreNewRecords";
import Heros from "./components/Heros";
import RecordsServices from "./components/RecordsServices";

const HomePage = () => {

   return(
      <>
         <ExploreNewRecords />
         <Heros />
         <RecordsServices />
      </>
   )
}

export default HomePage;