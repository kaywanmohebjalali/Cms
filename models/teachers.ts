
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
    teacherImage:{
        type:String
    },
  
},
{
    timestamps:true,
}
)

const model =mongoose?.models?.Teachers ||  mongoose?.model('Teachers',Schema)

export default model