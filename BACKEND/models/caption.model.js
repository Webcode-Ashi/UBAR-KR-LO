const mongoose = require('mongoose');
const captionSchema = new mongoose.Schema({
    fullname:{
        firstname:{
        type:String,
        required:true,
        minlength:[3,'firstname should be at least 3 characters long'],
        },
        lastname:{
            type:String,
            minlength:[3,'lastname should be at least 3 characters long'],
        }  
    }, 
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'password should be at least 6 characters long']
    },
    socketId:{
        type:String,
    }
},{timestamps:true})
module.exports = mongoose.model('Caption',captionSchema)