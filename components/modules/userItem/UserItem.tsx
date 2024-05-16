import React from 'react'
import styled from '@/styles/courseItem.module.scss'

import UpdateUser from '@/components/modules/updateUser/UpdateUser'
import DeleteUser from '../deleteUser/DeleteUser'
import { typeUser } from '@/interfaces/user'



const UserItem = (user:typeUser) => {

  
  return (
    <section className={`${styled.courseItem} `}>
        <div className={`${styled.right}`}>
            <img className={`${styled.imgCourse}`} src={`${user.userImage}`} alt="" />
            <div className={`${styled.course}`}>

            <h3 className={`${styled.courseName}`}>نام کاربری ادمین : {user.userName} </h3>
            <h3 className={`${styled.courseName}`}>وضعیت ادمین : {user.status} </h3>

            </div>
        </div>
        <div className={`${styled.left}`}>
          <UpdateUser {...user}/>
          <DeleteUser id={user?._id}/>
        </div>
    </section>
  )
}

export default UserItem