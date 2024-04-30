import React from 'react'
import styled from '@/styles/Courses.module.scss'
import CourseItem from '@/components/modules/courseItem/CourseItem'
const Courses = () => {
  return (
    <section className={`${styled.courses} `}>
        <CourseItem src='./images/courses/PWA.jpg' title='دوره pwa'/>
        <CourseItem src='./images/courses/js.png' title='دوره js'/>
        <CourseItem src='./images/courses/js.png' title='دوره js'/>
        <CourseItem src='./images/courses/js.png' title='دوره js'/>
        <CourseItem src='./images/courses/js.png' title='دوره js'/>
        <CourseItem src='./images/courses/js.png' title='دوره js'/>
        <CourseItem src='./images/courses/js.png' title='دوره js'/>
    </section>
  )
}

export default Courses