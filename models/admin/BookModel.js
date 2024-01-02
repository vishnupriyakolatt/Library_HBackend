const mongoose=require('mongoose')
const bookSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
ISBN:{
type:String,
required:true,
unique:true
},
author:{
type:String,
},
image:{
    type:String,
    required:true,
},
available:{
type:Boolean,
default:true
},
category:{
    type:String
}
})

module.exports=mongoose.model('Book',bookSchema)