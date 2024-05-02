import React, { useEffect, useState } from 'react'
import styled from '@/styles/Courses.module.scss'
import CourseItem from '@/components/modules/courseItem/CourseItem'
import { getCourses } from '@/services/apiCourses'



interface typeCourse { 
  courseName:String,
   coursePrice:Number, 
   courseTeacherName:String,
    courseImage:String 
  }



const Courses = () => {
  const [courses, setCourses] = useState([])


  async function getData() {
    try {


      const { data, statusCode } =await getCourses() as any
      if (statusCode == '200') {

        setCourses(data)
      } else {
        alert('اطلاعات دریافت نشد')
      }


    } catch (error) {
      alert('مشکلی پیش امده')

    }


  }

  useEffect(function(){
    getData()
  },[])

  return (
    <section className={`${styled.courses} `}>

      {
        courses.length && courses.map((course:any)=><CourseItem key={course._id} src={course.courseImage} courseName={course.courseName} coursePrice={course.coursePrice} courseTeacherName={course.courseTeacherName} />
      )
      }

    </section>
  )
}



export default Courses