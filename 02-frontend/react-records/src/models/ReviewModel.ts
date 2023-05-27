class ReviewModel {

   id: number;
   userEmail: string;
   date: string;
   rating: number;
   recordId: number;
   reviewDescription: string;

   constructor(id: number, userEmail: string, date: string, rating: number, recordId: number, reviewDescription: string){
      this.id = id;
      this.userEmail = userEmail;
      this.date = date;
      this.rating = rating;
      this.recordId = recordId;
      this.reviewDescription = reviewDescription;
   }


}

export default ReviewModel;