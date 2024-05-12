import React from 'react'
import styled from '@/styles/Courses.module.scss'

import { StateType, useStore } from '@/utils/store'
import TeacherItem from '@/components/modules/teacherItem/TeacherItem'






interface typeTeacher {
  _id: any
  fullName: String,
  email: Number,
  password: String,
  teacherImage: String
}

const Teachers = ({ teachers,error }: {teachers:[],error:any }) => {
 
 
  
  const loading = useStore((state: StateType) => state.loading)
  

  return (
    <section className={`${styled.courses} `}>
     
      {error && <p>{error}</p>} 
      {
        teachers?.length && !error? teachers?.map((teacher: typeTeacher) => <TeacherItem key={teacher._id} _id={teacher._id} teacherImage={teacher.teacherImage} fullName={teacher.fullName} email={teacher.email} password={teacher.password} />)
          : <h1> مدرسی یافت نشد</h1>
      }
      

    </section>
  )
}



export default Teachers
