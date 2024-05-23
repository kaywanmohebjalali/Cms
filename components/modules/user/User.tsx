import { useStore } from '@/utils/store'
import React from 'react'

const User = () => {
  const user = useStore((state: any) => state.user)
 

  

  return (
    <section className='user'>
       <p className='first-name'>{user?.firstName}</p>
        <img className='img-user' src={`${user?.userImage}`} alt="" />
    </section>
  )
}

export default User