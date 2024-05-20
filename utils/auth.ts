
import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";


async function hashPassword(password:string) {
    let salt =  Number(process?.env?.salt ) as number
    const hashedPassword=await hash(password,salt) 
    return hashedPassword 
}


 function generateToken(data:any) {
   
    let salt=String(process.env.privateKey) as any
    const token = sign({...data},salt,{
        // algorithm:''
        expiresIn:'24h'
    })
    
    return token
}

export {hashPassword, generateToken}