import React from 'react'
import styled from '@/styles/courseItem.module.scss'

import UpdateTeacher from '../updateTeacher/UpdateTeacher'
import DeleteTeacher from '../deleteTeacher/DeleteTeacher'
import { typeTeacher } from '@/interfaces/teacher'

const TeacherItem = (teacher:typeTeacher) => {

  
  return (
    <section className={`${styled.courseItem} `}>
        <div className={`${styled.right}`}>
            <img className={`${styled.imgCourse}`} src={`${teacher.teacherImage}`} alt="" />
            <div className={`${styled.course}`}>

            <h3 className={`${styled.courseName}`}>نام مدرس : {teacher.fullName} </h3>

            </div>
        </div>
        <div className={`${styled.left}`}>
          <UpdateTeacher {...teacher}/>
          <DeleteTeacher id={teacher?._id}/>
        </div>
    </section>
  )
}

export default TeacherItem