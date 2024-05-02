
interface typeCourse { 
    courseName:String,
     coursePrice:Number, 
     courseTeacherName:String,
      courseImage:any 
    }


    export async function getCourses() {
   
   
        try {
            const response = await  fetch(`/api/courses`);
    
           const data = await response.json()
          
           return {data,statusCode:response?.status}
        } catch (error) {
            throw new Error(`error get courses : ${error}`)
        }
    
    }


    export async function getCourse(id:any) {
   
   
        try {
            const response = await  fetch(`/api/courses/${id}`);
    
           const data = await response.json()
          
           return {data,statusCode:response?.status}
        } catch (error) {
            throw new Error(`error get courses : ${error}`)
        }
    
    }



export async function createCourse(course: typeCourse) {
   
    
    try {
        const response = await  fetch(`/api/courses`, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
          });

      const data = await response.json()
      
       return {data:data,statusCode:response?.status}
    } catch (error) {
        throw new Error(`error create course : ${error}`)
    }

}