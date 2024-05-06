import React from 'react'
import styled from '@/styles/Courses.module.scss'
import CourseItem from '@/components/modules/courseItem/CourseItem'

import Spinner from '@/components/modules/spinner/Spinner'





interface typeCourse {
  _id: any
  courseName: String,
  coursePrice: Number,
  courseTeacherName: String,
  courseImage: String
}

const Courses = ({ courses,error }: {courses:[],error:any }) => {
 
 

  return (
    <section className={`${styled.courses} `}>
      {!courses?.length && <Spinner/>}
      {error && <p>{error}</p>} 
      {
        courses?.length && !error? courses.map((course: typeCourse) => <CourseItem key={course._id} _id={course._id} courseImage={course.courseImage} courseName={course.courseName} coursePrice={course.coursePrice} courseTeacherName={course.courseTeacherName} />)
          : <h1>دوره ای یافت نشد</h1>
      }
      

    </section>
  )
}



export default Courses

