import { typeComment } from "@/interfaces/comment";



export async function getComments(filter: String | undefined) {

    try {
        let response;
        if (!filter) {

            response = await fetch(`/api/comments`);
        } else {
            response = await fetch(`/api/comments/?filter=${filter}`);

        }

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get Comments : ${error}`)
    }

}



export async function getComment(id: any) {


    try {
        const response = await fetch(`/api/comments/${id}`);

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get comments : ${error}`)
    }

}



export async function createComment(comment: typeComment) {




    try {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });

        const data = await response.json()

  
        return { data: data, statusCode: response?.status }
    } catch (error) {
        
        
        throw new Error(`error create comments : ${error}`)
    }

}



export async function updateComment(comment: typeComment) {


    try {
        const response = await fetch(`/api/comments/${comment?._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error update comment : ${error}`)
    }

}



export async function deleteComment(id: any) {


    try {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error delete comment : ${error}`)
    }

}