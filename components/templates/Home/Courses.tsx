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

const Courses = ({ filter }: { filter: any }) => {

  const [courses, setCourses] = useState([])

  const loading = useStore((state:StateType) => state.loading)
  const setLoading = useStore((state:StateType) => state.setLoading)

 


  async function getData() {

    try {

      setLoading(true)
      const { data, statusCode } = await getCourses(filter) as any
      if (statusCode == '200') {

        setCourses(data)
        setLoading(false)
      } else {
        alert('اطلاعات دریافت نشد')
      }


    } catch (error) {
      alert('مشکلی پیش امده')

    }


  }

  useEffect(function () {
    getData()
  }, [])

  return (
    <section className={`${styled.courses} `}>
      {loading && <Spinner />} 
      {
        courses.length? courses.map((course: typeCourse) => <CourseItem key={course._id} _id={course._id} courseImage={course.courseImage} courseName={course.courseName} coursePrice={course.coursePrice} courseTeacherName={course.courseTeacherName} />)
          : <h1>دوره ای یافت نشد</h1>
      }
      

    </section>
  )
}



export default Courses