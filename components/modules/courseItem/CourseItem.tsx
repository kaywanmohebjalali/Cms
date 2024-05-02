import React from 'react'
import styled from '@/styles/courseItem.module.scss'
import DeleteCourse from '../deleteCourse/DeleteCourse'
import UpdateCourse from '../updateCourse/UpdateCourse'

interface typeProps{
  src:String;
  courseName?:String;
  courseTeacherName?:String;
  coursePrice?:Number
}
const CourseItem = ({courseName,coursePrice, courseTeacherName, src}:typeProps) => {
  return (
    <section className={`${styled.courseItem} `}>
        <div className={`${styled.right}`}>
            <img className={`${styled.imgCourse}`} src={`${src}`} alt="" />
            <h3 className={`${styled.title}`}>{courseName} </h3>
            <div className="">
            <h3 className={`${styled.title}`}>{String(coursePrice)} </h3>
            <h3 className={`${styled.title}`}>{courseTeacherName} </h3>
             
            </div>
        </div>
        <div className={`${styled.left}`}>
          <UpdateCourse/>
          <DeleteCourse/>
        </div>
    </section>
  )
}

export default CourseItem