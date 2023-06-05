import express from 'express';
import mongoose from 'mongoose';
import Information from '../models/information.js';
import bcryptjs from 'bcryptjs';
import jwt  from 'jsonwebtoken';
import Caption from '../models/caption.js';
import CreateStore from '../models/CreateStore.js';

//דרל ה router יכולים לגשת ל postmen
const router = express.Router();

//////////////////////////////////////////STORE///////////////////////
router.post('/createNewStore', async(request,response) => {
    //create object id
     const id = new mongoose.Types.ObjectId();
    //get data from postmen
    const {firstName,mobile,password,nameStore,address,daysWork,image} = request.body;             
    //new ducoment in caption collection
    const _createStore = new CreateStore({
        _id: id,
        firstName: firstName,
        mobile: mobile,
        password: password,
        nameStore: nameStore,
        address: address,
        daysWork: daysWork,
        image: image
    })
    _createStore.save()
    .then(results => {
        return response.status(200).json({
           message: results
        })
    })
    .catch(error => {
       return response.status(500).json({
         message: error.message
       })
    })
 
 })

 router.delete('/deleteStore/:_id', async(reqeust,response) => {
    const id = reqeust.params._id;
    CreateStore.findByIdAndDelete(id)
    .then(results => {
        return response.status(200).json({
            message: results
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})

router.get('/getAllStore', async(request,response) => {

    //const account = await Information.find();
    const store = await CreateStore.find();
    response.status(200).json({
        store: store
    })
})

router.put('/updateStore/:gid', async(req,res) => {
    const gid = req.params.gid;
    const {firstName,mobile,password,nameStore,address,daysWork,image,isPublished} = req.body; 

    CreateStore.findById(gid)
     .then(store_s => {
       
        store_s.firstName = firstName
        store_s.mobile = mobile
        store_s.password = password
        store_s.nameStore = nameStore
        store_s.address = address
        store_s.daysWork = daysWork
        store_s.image = image
        store_s.isPublished = isPublished

        store_s.save()

        .then(store_update => {
            return res.status(200).json({
                message: store_update
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
   
})

//////////////////////////////////Caption/////////////////////////////////
router.post('/createNewCaption', async(request,response) => {
   //create object id
    const id = new mongoose.Types.ObjectId();
   //get data from postmen
   const caption = request.body.caption;             
   //new ducoment in caption collection
   const _caption = new Caption({
       _id: id,
       caption: caption
   })
   _caption.save()
   .then(results => {
       return response.status(200).json({
          message: results
       })
   })
   .catch(error => {
      return response.status(500).json({
        message: error.message
      })
   })

})

router.delete('/deleteCaption/:_id', async(reqeust,response) => {
    const id = reqeust.params._id;
    Caption.findByIdAndDelete(id)
    .then(results => {
        return response.status(200).json({
            message: results
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})

router.get('/getCaption', async(request,response) => {

    //const account = await Information.find();
    const caption = await Caption.find();
    response.status(200).json({
        caption: caption
    })
})

router.put('/updateCaption/:gid', async(req,res) => {
    const gid = req.params.gid;
    const { caption ,isPublished} = req.body;

    Caption.findById(gid)
     .then(caption_board => {
        
       
        caption_board.isPublished = isPublished;
        caption_board.caption = caption;

        caption_board.save()

        .then(caption_update => {
            return res.status(200).json({
                message: caption_update
            })
        })
        .catch(error => {
            return res.status(500).json({
                message: error.message
            })
        })
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
   
})

//////////////////////////////////////////Account//////////////////////////////
router.get('/getAccounts', async(request,response) => {

    //const account = await Information.find();
    const account = await Information.find();
    response.status(200).json({
        account: account
    })
})
//=========================================================================
// router.post('/register', async(request,response) => {
//     //get account info from body
//     const {Name,email,PhoneNumber,Password} = request.body;
//     //check if phoneNumber exist
//     const isAccountExist = await Information.findOne({PhoneNumber: PhoneNumber});
//     if(isAccountExist){
//         return response.status(200).json({
//             status: false,
//             message: 'Account Exist'
//         });
//     }
//     //password crypt מוצפנת
//     const hash_password = await bcryptjs.hash(Password,10);//hash פונקציה מצפינה
//     //create user in db
//     const id = new mongoose.Types.ObjectId();
//     const _account = new Information({
//         _id: id,
//         Name: Name,
//         email: email,
//         PhoneNumber: PhoneNumber,
//         Password: hash_password,
//         verficationCode: generateRandomIntegerInRange(1000,9999)
//     })
//     _account.save()
//     .then(result => {
//          return response.status(200).json({
//             status: true,
//             result: result
//          })
//     })
//     .catch(error => {
//         return response.status(500).json({
//             status: false,
//             message: error
//         });
//     })


// })
///========================================================================

router.post('/register', async(request,response) => {


    const user = request.body;
    const id = new mongoose.Types.ObjectId();

//console.log(user.PhoneNumber);

    Information.findOne({PhoneNumber: user.PhoneNumber})
    .then(async information => {
        console.log(information);
        if(information)
        {
            return response.status(401).json({
                message:'Account Is Not Available',
                status:false
            })
        }
        else
        {
            const hash = await bcryptjs.hash(user.Password, 10);
            const _information = new  Information({
                _id:id,
                Name: user.Name,
                PhoneNumber:user.PhoneNumber,
                email: user.email,
                Password: hash,
                verficationCode: generateRandomIntegerInRange(1000,9999),//generateRandomNumber
            })
            _information.save()
            .then(accountCreated => {
                return response.status(200).json({
                    message:accountCreated,
                    status:true
                })
            })
            .catch(error=>{
                return response.status(500).json({
                    message:error.message,
                    status:false
                })
            })
        }
    })
    .catch(error=>{
        return response.status(500).json({
            message:error.message,
            status:false
        })
    })
})



/*router.post('/register', async(request,response) =>{
    const user = request.body;
    const id = new mongoose.Types.ObjectId();
    Information.findOne({PhoneNumber:user.PhoneNumber})
     .then(async account => {
        if(account){
            return response.status(401).json({
                message: 'Account is not available',
                status:false
            })
        } else {
           const hash = await bcryptjs.hash(user.Password, 10);
             
            const _account = new Information({
                _id: id,
                Name: user.Name,
                email: user.email,
                Password: hash,
                PhoneNumber:user.PhoneNumber,
                verficationCode: generateRandomIntegerInRange(1000,9999)
              
            })
            _account.save()
            .then(accountCreated => {
                return response.status(200).json({
                    message: accountCreated,
                    status:true
                })
            })
            .catch(error => {
                return response.status(500).json({
                    message: error.message,
                    status:false
                })
            })
        }
     })
     .catch(error=>{
        return response.status(500).json({
            message: error.message,
            status:false
        })
     })
}) */

router.post('/login', async(request,response) => {
    //get account info from client
    const {PhoneNumber,Password} =  request.body;
    //Check if user exist by PhoneNumber
    Information.findOne({PhoneNumber: PhoneNumber})
    .then(async account => {
        if(PhoneNumber === '' || Password === ''){
            return response.status(200).json({
                message: 'Messing Data'
            })
        }
        if(!account){
            return response.status(200).json({
                status: false,
                message: 'Account not Exist'
            });
        }
        //Compare password
        const isMatch = await bcryptjs.compare(Password, account.Password);
        if(!isMatch){
           return response.status(200).json({
            status: false,
            message: 'Password not match'
           });
        }
       
         //generate jwt token
        const dataToToken = {
            _id: account._id,
            name: account.Name,
            email: account.email,
            PhoneNumber: account.PhoneNumber,
            avatar: account.avatar 
        }
        const token = await jwt.sign({dataToToken}, process.env.JWT_KEY, {expiresIn:'30d'});

        //response

        return response.status(200).json({
            status: true,
            message: account,
            token: token
        })
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
           message: error.message
        })
    })
})

router.delete('/deleteAccount/:_id', async(reqeust,response) => {
    const id = reqeust.params._id;
    Information.findByIdAndDelete(id)
    .then(results => {
        return response.status(200).json({
            message: results
        })
    })
    .catch(error => {
        return response.status(500).json({
            message: error.message
        })
    })
})

router.put('/verifyAccount', async(request,response) => {
    const {PhoneNumber,verficationCode} = request.body;

   // console.log(verify);

    Information.findOne({PhoneNumber: PhoneNumber, verficationCode: verficationCode})
    .then(account => {
        if(account){
            account.isVerified = true;
            account.save()
            .then(account_update => {
                return response.status(200).json({
                    status: true,
                    message: account_update
                })
            })
        } else {
            return response.status(401).json({
                status:false,
                message: 'Something went wrong...'
            })
        }
    })
    .catch(error => {
        return response.status(500).json({
            status: false,
            message: error.message
        })
     })
})

function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random()* (max - min + 1 )) + min;
}

export default router;//מיצאים את כל ה routers

