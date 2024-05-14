import React from 'react'
import styled from '@/styles/courseItem.module.scss'

import UpdateAdmin from '@/components/updateAdmin/UpdateAdmin'
import DeleteAdmin from '../deleteAdmin/DeleteAdmin'

interface typeAdmin {
  _id: any
  fullName: String,
  email: Number,
  password: String,
  adminImage: String
}


const AdminItem = (admin:typeAdmin) => {

  
  return (
    <section className={`${styled.courseItem} `}>
        <div className={`${styled.right}`}>
            <img className={`${styled.imgCourse}`} src={`${admin.adminImage}`} alt="" />
            <div className={`${styled.course}`}>

            <h3 className={`${styled.courseName}`}>نام ادمین : {admin.fullName} </h3>

            </div>
        </div>
        <div className={`${styled.left}`}>
          <UpdateAdmin {...admin}/>
          <DeleteAdmin id={admin?._id}/>
        </div>
    </section>
  )
}

export default AdminItem