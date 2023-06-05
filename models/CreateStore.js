import mongoose from "mongoose";

const Schema = mongoose.Schema;//תקיה משני של mongoose

//new collections
const createNewStore = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   firstName: String,
   mobile: Number,
   password : String,
   nameStore: String,
   address: String,
   daysWork: String,
   image: String,
   //אם רוצים להציג את הפרטים
   isPublished: {type: Boolean, default: true}//ערך דיפולתיפי
   
 
})

export default mongoose.model('CreateNewStore',createNewStore)
