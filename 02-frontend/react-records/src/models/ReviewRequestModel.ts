class ReviewRequestModel{

   rating: number;
   recordId: number;
   reviewDescription?: string;


   constructor(rating: number, recordId: number, reviewDescription: string){
      this.rating = rating,
      this.recordId = recordId,
      this.reviewDescription = reviewDescription
   }

}
export default ReviewRequestModel;