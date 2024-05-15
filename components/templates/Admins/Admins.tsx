import React from 'react'
import styled from '@/styles/Courses.module.scss'

import { StateType, useStore } from '@/utils/store'
import AdminItem from '@/components/modules/adminItem/AdminItem'





interface typeAdmin {
  _id: any
  fullName: String,
  email: Number,
  password: String,
  adminImage: String,
  status:String
}


const Admins = ({ admins,error }: {admins:[],error:any }) => {
 
 
  
  const loading = useStore((state: any) => state.loading)
  

  return (
    <section className={`${styled.courses} `}>
     
      {error && <p>{error}</p>} 
      {
        admins?.length && !error? admins?.map((admin: typeAdmin) => <AdminItem key={admin._id} _id={admin._id} adminImage={admin.adminImage} fullName={admin.fullName} email={admin.email} password={admin.password} status={admin.status}/>)
          : <h1> ادمین یافت نشد</h1>
      }
      

    </section>
  )
}



export default Admins

