
class Record { 

   id: number;
   title: string;
   artist?: string;
   description?: string;
   copies?: number;
   copiesAvailable?: number;
   genre?: string;
   img?: string

   constructor(id: number, title: string, artist: string, description: string, copies: number, copiesAvailable: number, genre: string, img: string){
      this.id = id;
      this.title = title;
      this.artist = artist;
      this.description = description;
      this.copies = copies;
      this.copiesAvailable = copiesAvailable;
      this.genre = genre;
      this.img = img;
   }

}

export default Record;