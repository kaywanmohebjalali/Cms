import React, { useEffect } from 'react'
import styled from '@/styles/Courses.module.scss'
import CourseItem from '@/components/modules/courseItem/CourseItem'

import Spinner from '@/components/modules/spinner/Spinner'
import { StateType, useStore } from '@/utils/store'
import { typeCourse } from '@/interfaces/course'







const Courses = ({ courses,error }: {courses:[],error:any }) => {
 
  const loading = useStore((state: any) => state.loading)
  

  return (
    <section className={`${styled.courses} `}>
      {/* {loading && <Spinner/>} */}
      {error && <p>{error}</p>} 
      {
        courses?.length && !error? courses.map((course: typeCourse) => <CourseItem key={course._id} _id={course._id} courseImage={course.courseImage} courseName={course.courseName} coursePrice={course.coursePrice} teacherId={course?.teacherId} />)
          : <h1>دوره ای یافت نشد</h1>
      }
      

    </section>
  )
}



export default Courses

