import connectToDB from '@/utils/db'
import userModel from '@/models/users'
import { verifyToken } from '@/utils/auth'
import User from '@/components/modules/user/User'
import { useStore } from '@/utils/store'
import { useEffect } from 'react'

const Dashboard = ({user}:{user:any}) => {
  
  const setUser = useStore((state: any) => state.setUser)
  useEffect(()=>{
   setUser(user)
  },[])

  
  return (
    <>
      <section className="">
      dashboard
      </section>
    </>
  )
}

export default Dashboard

export async function getServerSideProps(context: any) {
  try {
  const { token } = context?.req?.cookies  
  const tokenPayload = verifyToken(token)
 
 if(!token || !tokenPayload)return{
  redirect:{
    destination:'/login'
  }
 }
  
const {email}=tokenPayload as {email:string}


connectToDB()
const user = await userModel.findOne({email},'firstName userImage ');



    return {
      props: { user: JSON.parse(JSON.stringify(user)), error: null },

    }
  } catch (error: any) {

    return {
      props: {error: error?.message },

    }

  }
}