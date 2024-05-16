import React from 'react'
import styled from '@/styles/courseItem.module.scss'
import DeleteCourse from '../deleteCourse/DeleteCourse'
import UpdateCourse from '../updateCourse/UpdateCourse'
import { typeCourse } from '@/interfaces/course'



const CourseItem = (course:typeCourse) => {
 
  
  return (
    <section className={`${styled.courseItem} `}>
        <div className={`${styled.right}`}>
            <img className={`${styled.imgCourse}`} src={`${course.courseImage}`} alt="" />
            <div className={`${styled.course}`}>

            <h3 className={`${styled.courseName}`}>نام دوره : {course.courseName} </h3>
            <h3 className={`${styled.coursePrice}`}>قیمت :  {String(course.coursePrice)} </h3>
            <h3 className={`${styled.courseTeacherName}`}>نام مدرس : {course.teacherId.fullName} </h3>

            </div>
        </div>
        <div className={`${styled.left}`}>
          <UpdateCourse {...course}/>
          <DeleteCourse id={course?._id}/>
        </div>
    </section>
  )
}

export default CourseItem