class AddRecordRequest {

   title: string;
   artist: string;
   description: string;
   copies: number;
   genre: string;
   img?: string;

   constructor(title: string, artist: string, description: string, copies: number, genre: string){

      this.title = title;
      this.artist = artist;
      this.description = description;
      this.copies = copies;
      this.genre = genre;
   }

}

export default AddRecordRequest;