import React from 'react'
import styled from '@/styles/Courses.module.scss'

import { StateType, useStore } from '@/utils/store'
import UserItem from '@/components/modules/userItem/UserItem'





interface typeUser {
  _id: any
  firstName: String,
  lastName: String,
  userName: String,
  email: Number,
  password: String,
  userImage: String
  status: String
}


const Users = ({ users,error }: {users:[],error:any }) => {
 
 
  
  const loading = useStore((state: any) => state.loading)
  

  return (
    <section className={`${styled.courses} `}>
     
      {error && <p>{error}</p>} 
      {
        users?.length && !error? users?.map((user: typeUser) => <UserItem key={user._id} _id={user._id} userImage={user.userImage} firstName={user.firstName} lastName={user.lastName}  userName={user.userName}  email={user.email} password={user.password} status={user.status}/>)
          : <h1> ادمین یافت نشد</h1>
      }
      

    </section>
  )
}



export default Users

