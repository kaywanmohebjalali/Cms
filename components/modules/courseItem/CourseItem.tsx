import React from 'react'
import styled from '@/styles/courseItem.module.scss'
import DeleteCourse from '../deleteCourse/DeleteCourse'
import UpdateCourse from '../updateCourse/UpdateCourse'

interface typeCourse { 
  _id:any
  courseName:String,
   coursePrice:Number, 
   courseTeacherName:String,
    courseImage:String 
  }

const CourseItem = (course:typeCourse) => {
 
  
  return (
    <section className={`${styled.courseItem} `}>
        <div className={`${styled.right}`}>
            <img className={`${styled.imgCourse}`} src={`${course.courseImage}`} alt="" />
            <h3 className={`${styled.title}`}>{course.courseName} </h3>
            <div className="">
            <h3 className={`${styled.title}`}>{String(course.coursePrice)} </h3>
            <h3 className={`${styled.title}`}>{course.courseTeacherName} </h3>

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