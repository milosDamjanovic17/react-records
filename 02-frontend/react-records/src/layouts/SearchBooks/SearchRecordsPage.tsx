import React, {useEffect, useState} from 'react';
import RecordModel from '../../models/Record';
import SpinnerLoading from '../../Utils/SpinnerLoading';
import SearchRecord from './components/SearchRecord';

const SearchBooksPage = () => {

   const[records, setRecords] = useState<RecordModel[]>([]);
   const[isLoading, setIsLoading] = useState(true);
   const[httpError, setHttpError] = useState(null);

   useEffect(() => {

      async function fetchRecords() {
         
         const baseUrl: string = "http://localhost:8080/api/records";

         const renderUrl = `${baseUrl}?page=0&size=5`

         const response = await fetch(renderUrl);

         if(!response.ok){
            throw new Error('Whoops! Something went wrong...');
          }

         const responseJson = await response.json();

         const responseData = responseJson._embedded.records;

         const loadedRecords: RecordModel[] = [];

         for(const key in responseData){
            loadedRecords.push({
               id: responseData[key].id,
               title: responseData[key].title,
               artist: responseData[key].artist,
               description: responseData[key].description,
               copies: responseData[key].copies,
               copiesAvailable: responseData[key].copiesAvailable,
               genre: responseData[key].genre,
               img: responseData[key].img
            })
         }


         setRecords(loadedRecords);
         setIsLoading(false);
      }

      fetchRecords().catch((error: any) => {
         setIsLoading(false);
         setHttpError(error.message);
      })

      
   },[])
   
   if(isLoading){
      return <SpinnerLoading />
   }

   if(httpError){
      <div className='container m-5'>
         <p>{httpError}</p>
      </div>
   }

   return(
      <div>
         <div className='container'>
            <div>
               <div className='row mt-5'>
                  <div className='d-flex'>
                     <input className='form-control me-2' type='search' placeholder='Search records here' aria-label='Search'/>
                     <button className='btn btn-outline-success'>
                        Search
                     </button>
                  </div>
               </div>
               <div className='col-4'>
                  <div className='dropdown'>
                     <button className='btn btn-secondary dropdown-toggle' 
                             type='button' 
                             id='dropdownMenuButton1' 
                             data-bs-toggle='dropdown'
                             aria-expanded='false'
                     >
                        Category
                     </button>
                     <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton1'>
                        <li>
                           <a href='#' className='dropdown-item'>
                              All Genres
                           </a>
                        </li>
                        <li>
                           <a href='#' className='dropdown-item'>
                              House
                           </a>
                        </li>
                        <li>
                           <a href='#' className='dropdown-item'>
                              Trance
                           </a>
                        </li>
                        <li>
                           <a href='#' className='dropdown-item'>
                              HipHop/R&B
                           </a>
                        </li>
                        <li>
                           <a href='#' className='dropdown-item'>
                              D&B
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
               <div className='mt-3'>
                  <h5>Number of records: (10)</h5>
               </div>
               <p>
                  1 to 5 of 10 records:
               </p>
               {records.map(rec => (
                  <SearchRecord record = {rec} key={rec.id} />
               ))}
            </div>
         </div>
      </div>
   )
}

export default SearchBooksPage