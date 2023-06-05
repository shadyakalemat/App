import mongoose from "mongoose";

const Schema = mongoose.Schema;//תקיה משני של mongoose

//new collections
const informationSchema = new Schema({
   _id: mongoose.Schema.Types.ObjectId,
   Name: String,
   email: String,
   PhoneNumber: Number,
   Password: String,
   verficationCode: String,
   isVerified: {type: Boolean, default: false},
   //אם רוצים להציג את הפרטים
   isPublished: {type: Boolean, default: true},//ערך דיפולתיפי
   avatar: {type: String, default:'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png'}
   
})

export default mongoose.model('Informatin',informationSchema)
