import { typeTeacher } from "@/interfaces/teacher";


export async function getTeachers(filter: String | undefined) {

    try {
        let response;
        if (!filter) {

            response = await fetch(`/api/teachers`);
        } else {
            response = await fetch(`/api/teachers/?filter=${filter}`);

        }

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get teachers : ${error}`)
    }

}


export async function getTeacher(id: any) {


    try {
        const response = await fetch(`/api/teachers/${id}`);

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get teacher : ${error}`)
    }

}



export async function createTeacher(teacher: typeTeacher) {




    try {
        const response = await fetch(`/api/teachers`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(teacher)
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error create teacher : ${error}`)
    }

}




export async function updateTeacher(course: typeTeacher) {


    try {
        const response = await fetch(`/api/teachers/${course?._id}`, {
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
        throw new Error(`error update teacher : ${error}`)
    }

}




export async function deleteTeacher(id: any) {


    try {
        const response = await fetch(`/api/teachers/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error delete teacher : ${error}`)
    }

}