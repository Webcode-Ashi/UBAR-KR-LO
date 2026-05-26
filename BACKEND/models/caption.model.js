const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
    },
    Status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive',
    },
    vehicle:{
        color:{
            type:String,
            required:true,
        minlength:[3,'color should be at least 3 characters long'],
    },
    plate:{
        type:String,
        required:true,
        minlength:[6,'plate should be at least 6 characters long'],
    },
    capacity:{
        type:Number,
        required:true,
        min:[1,'capacity should be at least 1'],    
    },
    vehicleType:{
        type:String,
        required:true,
        enum:['car','auto','motercycle'],
    }
},
location:{
     lat:{
        type:Number,
        
},
     lng:{
        type:Number,
       
}
}
},
{timestamps:true})
captionSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'1h'})
    return token;
}
captionSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
captionSchema.statics.hashPassword = async function(password){
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}
const CaptionModel = mongoose.model('Caption',captionSchema)
module.exports = CaptionModel;