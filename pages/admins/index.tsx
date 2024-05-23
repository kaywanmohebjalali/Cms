import connectToDB from '@/utils/db';
import React from 'react'
import userModel from '@/models/users'
import AddUser from '@/components/modules/addUser/AddUser';
import Users from '@/components/templates/Users/Users';
import { verifyToken } from '@/utils/auth';

const AdminPage = ({ users, error }: { users: [], error: any }) => {
  
  return <section className="container main">
    <div className="top-main">
      <h1> ادمین ها</h1>
      <AddUser />
    </div>
    <Users  users={users} error={error} />
  </section>
};

export default AdminPage;

export async function getServerSideProps(context: any) {
  const { query } = context
  try {
    connectToDB()
    const { token } = context?.req?.cookies  
    const tokenPayload = verifyToken(token)
   if(!token || !tokenPayload)return{
    redirect:{
      destination:'/login'
    }
   }
   const {email}=tokenPayload as {email:string}
   const user = await userModel.findOne({email},'role');
   if(user.role!='superAdmin')return{
    redirect:{
      destination:'/dashboard'
    }
   }


    let users: any
    if (Object.keys(query).length) {
      
      users = await userModel.find({ userName: { $regex: query?.filter } });

    } else {

      users = await userModel.find()
    }

    return {
      props: { users: JSON.parse(JSON.stringify(users)), error: null },

    }
  } catch (error: any) {

    return {
      props: { users: error?.message, error: error?.message },

    }

  }
}

