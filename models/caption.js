import mongoose from "mongoose";

const Schema = mongoose.Schema;//תקיה משני של mongoose

//new collections
const captionSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   //אם רוצים להציג את הפרטים
   isPublished: {type: Boolean, default: true},//ערך דיפולתיפי
   caption: String
 
})

export default mongoose.model('Caption',captionSchema)
