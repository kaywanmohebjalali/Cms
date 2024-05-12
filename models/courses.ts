
const mongoose =require('mongoose')
 require('@/models/teachers')
const Schema = mongoose.Schema({
    courseName:{
        type:String,
        required:true,
        minLength:2,

        index:true,
        unique:true,

    },
    coursePrice:{
        type:Number,
        required:true,
        min:100000
    },

       courseImage:{
        type:String
    },
    teacherId:{
        type:mongoose.Types.ObjectId,
        ref:"Teachers",
        required:true
    },

},
{
    timestamps:true,
}
)

const model =mongoose?.models?.Courses ||  mongoose.model('Courses',Schema)

export default model