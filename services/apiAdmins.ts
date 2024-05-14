
interface typeAdmin {
    _id: any,
    fullName: String,
    email: String,
    password: String,
    adminImage?: String,

}


export async function getAdmins(filter: String | undefined) {

    try {
        let response;
        if (!filter) {

            response = await fetch(`/api/admins`);
        } else {
            response = await fetch(`/api/admins/?filter=${filter}`);

        }

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get admins : ${error}`)
    }

}



export async function getAdmin(id: any) {


    try {
        const response = await fetch(`/api/admins/${id}`);

        const data = await response.json()

        return { data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error get admins : ${error}`)
    }

}



export async function createAdmin(admin: typeAdmin) {

    try {
        const response = await fetch(`/api/admins`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(admin)
        });

        const data = await response.json()


        return { data: data, statusCode: response?.status }
    } catch (error) {


        throw new Error(`error create admins : ${error}`)
    }

}



export async function updateAdmin(admin: typeAdmin) {

    try {
        const response = await fetch(`/api/admins/${admin?._id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(admin)
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error update admin : ${error}`)
    }

}



export async function deleteAdmin(id: any) {


    try {
        const response = await fetch(`/api/admins/${id}`, {
            method: 'DELETE',
        });

        const data = await response.json()

        return { data: data, statusCode: response?.status }
    } catch (error) {
        throw new Error(`error delete admin : ${error}`)
    }

}