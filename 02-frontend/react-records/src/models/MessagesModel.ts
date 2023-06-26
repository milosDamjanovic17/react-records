class MessagesModel {

   title: string;
   question: string;
   id?: number;
   userEmail?: string;
   adminEmail?: string;
   response?: string;
   closed?: boolean;


   constructor(id: number, userEmail: string, title: string, question: string, adminEmail: string, response: string, closed: boolean){

      this.title = title;
      this.question = question;
   }

}

export default MessagesModel;