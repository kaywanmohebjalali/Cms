
const mongoose =require('mongoose')


const Schema = mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        minLength:2,
        index:true,
        unique:true,
        
    },

    email:{
        type:String,
        required:true,
        minLength:2,
        index:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:5,
          
    },
    status:{
        type:String,
        required:true,
        minLength:4,
    },
    adminImage:{
        type:String
    },
  
},
{
    timestamps:true,
}
)

const model =mongoose?.models?.Admins ||  mongoose?.model('Admins',Schema)

export default model