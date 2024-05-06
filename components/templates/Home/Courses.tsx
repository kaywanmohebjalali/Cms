import React, { useEffect, useState } from 'react'
import styled from '@/styles/Courses.module.scss'
import CourseItem from '@/components/modules/courseItem/CourseItem'
import { getCourses } from '@/services/apiCourses'
import Spinner from '@/components/modules/spinner/Spinner'
import { StateType, useStore } from '@/utils/store'





interface typeCourse {
  _id: any
  courseName: String,
  coursePrice: Number,
  courseTeacherName: String,
  courseImage: String
}

const Courses = ({ filter, courses,error }: { filter: any,courses:[],error:any }) => {
 console.log(filter);
 
  const loading = useStore((state:StateType) => state.loading)
  const setLoading = useStore((state:StateType) => state.setLoading)
 

  return (
    <section className={`${styled.courses} `}>
      {error && <p>{error}</p>} 
      {
        courses?.length && !error? courses.map((course: typeCourse) => <CourseItem key={course._id} _id={course._id} courseImage={course.courseImage} courseName={course.courseName} coursePrice={course.coursePrice} courseTeacherName={course.courseTeacherName} />)
          : <h1>دوره ای یافت نشد</h1>
      }
      

    </section>
  )
}



export default Courses

