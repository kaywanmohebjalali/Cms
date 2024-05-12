
const mongoose =require('mongoose')


const Schema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:2,
    },

    courseId:{
        type:mongoose.Types.ObjectId,
        ref:"Courses",
        required:true
    },

  
},
{
    timestamps:true,
}
)

const model =mongoose?.models?.Comments ||  mongoose?.model('Comments',Schema)

export default model