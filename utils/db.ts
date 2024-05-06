

import mongoose from 'mongoose';



async function connectToDB(){
  try {
     if(mongoose.connections[0].readyState)return false

     await mongoose.connect('mongodb://127.0.0.1:27017/next-cms-DB')
 
  } catch (error) {
    console.log('error DB : ',error)
  }
}

export default connectToDB