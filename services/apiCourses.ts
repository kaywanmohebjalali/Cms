// import { typeCourse } from "@/interfaces/course";



interface typeCourse {
    _id: any
    courseName: String,
    coursePrice: Number,
    courseImage?: String
    teacherId?:any
  }

export async function getCourses(filter: String | undefined) {



    try {
        let response;
        if (!filter) {

            response = await fetch(`/api/courses`);
        } else {
            response = await fetch(`/api/courses/?filter=${filter}`);

        }

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get courses : ${error}`)
    }

}


export async function getCourse(id: any) {


    try {
        const response = await fetch(`/api/courses/${id}`);

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get courses : ${error}`)
    }

}



export async function createCourse(course: typeCourse) {




    try {
        const response = await fetch(`/api/courses`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        });

        const data = await response.json()

  
        return { data: data, statusCode: response?.status }
    } catch (error) {
        
        
        throw new Error(`error create course : ${error}`)
    }

}




export async function updateCourse(course: typeCourse) {

 
  
    try {
        const response = await fetch(`/api/courses/${course?._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(course)
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error update course : ${error}`)
    }

}




export async function deleteCourse(id: any) {


    try {
        const response = await fetch(`/api/courses/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error delete course : ${error}`)
    }

}