
import { hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


async function hashPassword(password:string) {
    let salt =  Number(process?.env?.salt ) as number
    const hashedPassword=await hash(password,salt) 
    return hashedPassword 
}

async function verifyPassword(password:string, hashedPassword:string) {
    let salt =  Number(process?.env?.salt ) as number
    const verifiedPassword=await compare(password,hashedPassword) 
    return verifiedPassword 
}


 function generateToken(data:any) {
   
    let salt=String(process.env.privateKey) as any
    const token = sign({...data},salt,{
        // algorithm:''
        expiresIn:'24h'
    })
    
    return token
}

export {hashPassword, verifyPassword,  generateToken}