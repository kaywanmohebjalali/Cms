const mongoose =require('mongoose')


const Schema = mongoose.Schema({
    courseName:{
        type:String,
        required:true
    },
    coursePrice:{
        type:Number,
        required:true
    },

    courseTeacherName:{
        type:String,
        required:true,
    },
    // courseImage:{
    //     data:Buffer,
    //     contentType:String
    // }

       courseImage:{
        type:String
    }

})

const model =mongoose.models.Courses ||  mongoose.model('Courses',Schema)

export default model