import mongoose from 'mongoose'

const roomSchema = mongoose.Schema({
    lng:{type:Number, required:true},
    lat:{type:Number, required:true},
    price:{type:Number, min:0, max:2000, default:0},
    title:{type:String, minLength:5, maxLength:150, required:true},
    description:{type:String, minLength:10, maxLength:1000, required:true},
    images:{type:[String], validate:(v)=>Array.isArray(v) && v.length>0},
    uid:{type:String, required:true},
    uName:{type:String, required:true},
    uPhoto:{type:String, default:''},
},
{timestamps:true});

const Room = mongoose.model('rooms', roomSchema)    

export default Room