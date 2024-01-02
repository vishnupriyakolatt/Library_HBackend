const mongoose  = require("mongoose")
const dotenv=require('dotenv')

dotenv.config()


module.exports={
    dbconnect:()=>{
        mongoose.connect(process.env.MONGO_URL,{
        })
        .then(()=>{
            console.log("Database is connected successfully")
        })
        .catch((err)=>console.log('err'+err))
    }
}