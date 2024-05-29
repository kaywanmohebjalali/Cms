import { typeUser } from "@/interfaces/user";


export async function getUsers(filter: String | undefined) {

    try {
        let response;
        if (!filter) {

            response = await fetch(`/api/auth`);
        } else {
            response = await fetch(`/api/auth/?filter=${filter}`);

        }

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get users : ${error}`)
    }

}



export async function getMe() {


    try {
        const response = await fetch(`/api/auth/me`);

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get admins : ${error}`)
    }

}



export async function createUser(user: typeUser) {

    try {
        const response = await fetch(`/api/auth/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json()


        return { data: data, statusCode: response?.status }
    } catch (error) {


        throw new Error(`error create user : ${error}`)
    }

}



export async function updateUser(user: typeUser) {
  
  
    try {
        const response = await fetch(`/api/auth/me`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error update user : ${error}`)
    }

}



export async function deleteAdmin() {


    try {
        const response = await fetch(`/api/auth/me`, {
            method: 'DELETE',
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error delete user : ${error}`)
    }

}


export async function login(dataLogin:{identifier:string,password:string,remember:boolean}) {
    try {
        
        const response = await fetch(`/api/auth/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataLogin)
        });

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error login admin : ${error}`)
    }

}


export async function logout() {
    try {
        
        const response = await fetch(`/api/auth/signout`)
        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error logout admin : ${error}`)
    }

}






