import express  from "express";//in express we have body-barser
import mongoose from "mongoose";
import actions from './controller/actions.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();// משתנה מחזיק את האבליקאציה 

app.use(express.urlencoded({extended:false}));//links for our project
app.use(express.json());//כל משנכנס ויוצא במבנה של json

const mongo_url = process.env.MONGO_URL;
const port = process.env.PORT;
//הראוט שלנו של postmen
app.use('/api', actions);
mongoose.set({'strictQuery':false});//FOR ERRORS

//link for mongoDb
mongoose.connect(mongo_url)
.then(results => {
  app.listen(port, function(){//האבליקציה מאזינה ל port
    console.log(`server is running port ${port}`);
})

})
.catch(error => {
    console.log(error);
})

