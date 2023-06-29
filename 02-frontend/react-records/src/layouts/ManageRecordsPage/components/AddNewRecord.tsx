import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";

const AddNewRecord = () => {

   const {authState} = useOktaAuth();

   // New Record
   const [title, setTitle] = useState('');
   const [artist, setArtist] = useState('');
   const [description, setDescription] = useState('');
   const [copies, setCopies] = useState(0);
   const [genre, setGenre] = useState('Genre');
   const [selectedImage, setSelectedImage] = useState('');

   // feedback success/failed msg
   const [displayWarning, setDisplayWarning] = useState(false);
   const [displaySuccess, setDisplaySuccess] = useState(false);

   function genreField(value: string) {
      setGenre(value);
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
                           <li><a onClick={() => genreField('DnB')} className="dropdown-item"></a>D&B</li>
                           <li><a onClick={() => genreField('HipHop/Rap')} className="dropdown-item"></a>HipHop/Rap</li>
                           <li><a onClick={() => genreField('House')} className="dropdown-item"></a>House</li>
                           <li><a onClick={() => genreField('Trance')} className="dropdown-item"></a>Trance</li>
                           <li><a onClick={() => genreField('Other')} className="dropdown-item"></a>Other</li>
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
                  <input type='file'/>
                  <div>
                     <button type="button" className="btn btn-primary mt-3">
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