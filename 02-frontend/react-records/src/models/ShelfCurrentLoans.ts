import RecordModel from "./Record";

class ShelfCurrentLoans {

   record: RecordModel;
   daysLeft: number;

   constructor(record: RecordModel, daysLeft: number){
      this.record = record;
      this.daysLeft = daysLeft;
   }
}