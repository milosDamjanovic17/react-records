import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";
import AddRecordRequest from "../../../models/AddRecordRequest";

const AddNewRecord = () => {

   const {authState} = useOktaAuth();

   // New Record
   const [title, setTitle] = useState('');
   const [artist, setArtist] = useState('');
   const [description, setDescription] = useState('');
   const [copies, setCopies] = useState(0);
   const [genre, setGenre] = useState('Genre');
   const [selectedImage, setSelectedImage] = useState<any>(null);

   // feedback success/failed msg
   const [displayWarning, setDisplayWarning] = useState(false);
   const [displaySuccess, setDisplaySuccess] = useState(false);

   function genreField(value: string) {
      setGenre(value);
   }

   async function base64ImgConversion(inputImg: any) {
      if(inputImg.target.files[0]){
         getBase64(inputImg.target.files[0]);
      }
   }

   function getBase64(file: any){
      let reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = function () {
         setSelectedImage(reader.result);
      };

      reader.onerror = function (error){
         console.log('Error', error);
      }
   }

   async function submitNewRecord() {
      const url = `${process.env.REACT_APP_API}/admin/secure/add/record`;
      
      if(authState?.isAuthenticated && title !== '' && artist !== '' && genre !== 'Genre' 
            && description !== '' && copies >= 0){

               const record: AddRecordRequest = new AddRecordRequest (title, artist, description, copies, genre);
               record.img = selectedImage;

               const requestOptions = {
                  method: 'POST',
                  headers: {
                     Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                     'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(record)
               };

               const submitRecordResponse = await fetch (url, requestOptions);
               if(!submitRecordResponse.ok){
                  throw new Error('Something went wrong');
               }

               setTitle('');
               setArtist('')
               setDescription('');
               setCopies(0);
               setGenre('Genre');
               setSelectedImage(null);
               setDisplayWarning(false);
               setDisplaySuccess(true)
            }else{
               setDisplayWarning(true);
               setDisplaySuccess(false);
            }
   }

   return(
      <div className="container mt-5 mb-5">
         {displaySuccess && 
            <div className="alert alert-success" role="alert">
               Record added successfully
            </div>
         }
         {displayWarning &&
            <div className="alert alert-danger" role="alert">
               All fields must be filled out!
            </div>
         }
         <div className="card">
            <div className="card-header">
               Add a new Record to library
            </div>
            <div className="card-body">
               <form method="POST">
                  <div className="row">
                     <div className="col-md-6 mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" required onChange={e => setTitle(e.target.value)} value={title}></input>
                     </div>
                     <div className="col-md-3 mb-3">
                        <label className="form-label">Artist</label>
                        <input type="text" className="form-control" name="artist" required onChange={e => setArtist(e.target.value)} value={artist}></input>
                     </div>
                     <div className="col-md-3 mb-3">
                        <label className="form-label">Genre</label>
                        <button className="form-control btn btn-secondary dropdown-toggle" type="button" id='dropdownMenuButton1' data-bs-toggle='dropdown'
                           aria-expanded='false'>
                              {genre}
                        </button>
                        <ul id='addNewRecordId' className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                           <li><a onClick={() => genreField('DnB')} className="dropdown-item">D&B</a></li>
                           <li><a onClick={() => genreField('HipHop/Rap')} className="dropdown-item">HipHop/Rap</a></li>
                           <li><a onClick={() => genreField('House')} className="dropdown-item">House</a></li>
                           <li><a onClick={() => genreField('Trance')} className="dropdown-item">Trance</a></li>
                           <li><a onClick={() => genreField('Other')} className="dropdown-item">Other</a></li>
                        </ul>
                     </div>
                  </div>
                  <div className="col-md-12 mb-3">
                     <label className="form-label">Description</label>
                     <textarea className="form-control" id='exampleFormControlTextarea1' rows={3} onChange={e => setDescription(e.target.value)} value={description}></textarea>
                  </div>
                  <div className="col-md-3 mb-3">
                     <label className="form-label">Copies</label>
                     <input type="number" className="form-control" name="Copies" required onChange={e => setCopies(Number(e.target.value))} value={copies}/>
                  </div>
                  <input type='file'onChange={e => base64ImgConversion(e)}/>
                  <div>
                     <button type="button" className="btn btn-primary mt-3" onClick={submitNewRecord}>
                        Add Record
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   )
}

export default AddNewRecord;