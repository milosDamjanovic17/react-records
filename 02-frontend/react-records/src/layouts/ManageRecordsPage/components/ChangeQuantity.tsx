import { useState, useEffect } from "react";
import RecordModel from "../../../models/Record";
import SpinnerLoading from "../../../Utils/SpinnerLoading";
import Pagination from "../../../Utils/Pagination";
import ChangeQuantityRecord from "./ChangeQuantityRecord";

const ChangeQuantity = () => {

   const [records, setRecords] = useState<RecordModel[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [httpError, setHttpError] = useState(null);
 
   const [currentPage, setCurrentPage] = useState(1);
   const [recordsPerPage, setRecordsPerPage] = useState(5);
   const [totalRecordsAmount, setTotalRecordsAmount] = useState(0);
   const [totalPages, setTotalPages] = useState(0);

   const [recordDelete, setRecordDelete] = useState(false);

   useEffect(() => {
      async function fetchRecords() {
        const baseUrl: string = `${process.env.REACT_APP_API}/records?page=${currentPage - 1}&size=${recordsPerPage}`;

  
        const response = await fetch(baseUrl);
  
        if (!response.ok) {
          throw new Error("Whoops! Something went wrong...");
        }
  
        const responseJson = await response.json();
  
        const responseData = responseJson._embedded.records;
  
        setTotalRecordsAmount(responseJson.page.totalElements);
        setTotalPages(responseJson.page.totalPages);
  
        const loadedRecords: RecordModel[] = [];
  
        for (const key in responseData) {
          loadedRecords.push({
            id: responseData[key].id,
            title: responseData[key].title,
            artist: responseData[key].artist,
            description: responseData[key].description,
            copies: responseData[key].copies,
            copiesAvailable: responseData[key].copiesAvailable,
            genre: responseData[key].genre,
            img: responseData[key].img,
          });
        }
  
        setRecords(loadedRecords);
        setIsLoading(false);
      }
  
      fetchRecords().catch((error: any) => {
        setIsLoading(false);
        setHttpError(error.message);
      });
  
    }, [currentPage, recordDelete]);
  
    const indexOfLastRecord: number = currentPage * recordsPerPage;
    const indexOfFirstBook: number = indexOfLastRecord - recordsPerPage;
  
    let lastItem =
      recordsPerPage * currentPage <= totalRecordsAmount
        ? recordsPerPage * currentPage
        : totalRecordsAmount;
  
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const deleteRecord = () => setRecordDelete(!recordDelete);

    if(isLoading){
      return <SpinnerLoading />
    }

    if(httpError){
      return <div className="container m-5"><p>{httpError}</p></div>
    }

   return(
      <div className="container mt-5">
         {totalRecordsAmount > 0 ?
            <>
               <div className="mt-3">
                  <h3>Number of results: ({totalRecordsAmount})</h3>
               </div>
               <p>
                  {indexOfFirstBook + 1} to {lastItem} of {totalRecordsAmount} items:
               </p>
               {records.map(record => (
                  <ChangeQuantityRecord record={record} key={record.id} deleteRecord={deleteRecord}/>
               ))}
            </>
            :
            <h5>Add a record before changing quantity</h5>
         }
         {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />} 
      </div>
   )
}

export default ChangeQuantity;