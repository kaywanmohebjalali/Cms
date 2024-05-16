
const mongoose =require('mongoose')


const Schema = mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
    },
    lastName:{
        type:String,
        required:true,
        minLength:2, 
    },
    userName:{
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
    role:{
        type:String,
        required:true,
        minLength:4,
        enum:['admin','superAdmin'],
        default:'admin'
    },
    userImage:{
        type:String
    },
  
},
{
    timestamps:true,
}
)

const model =mongoose?.models?.Users  ||  mongoose?.model('Users',Schema)

export default model