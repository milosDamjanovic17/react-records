import React from "react";
import ExploreNewRecords from "./components/ExploreNewRecords";
import Heros from "./components/Heros";
import RecordsServices from "./components/RecordsServices";
import Carousel from "./components/Carousel";

const HomePage = () => {

   return(
      <>
         <ExploreNewRecords />
         <Carousel />
         <Heros />
         <RecordsServices />
      </>
   )
}

export default HomePage;