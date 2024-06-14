import { getMe } from '@/services/apiAuth'
import { useStore } from '@/utils/store'
import React, { useEffect, useState } from 'react'

const User = () => {
  const person = useStore((state: any) => state.user)
  const [user , setUser]=useState(person)

 

useEffect(()=>{
  async function getDate() {
    const {data}=await getMe()
    setUser(data?.user)

  }
  console.log('p  :',person);
  
  // if(Object.keys({})?.length<1)getDate()
  if(person)getDate()
},[person])
 


  return (
    <section className='user'>
    {user?.userImage&& <>
       <p className='first-name'>{user?.firstName}</p>
     <img className='img-user' src={`${user?.userImage}`} alt="" />
    </>
     }
    </section>
  )
}

export default User