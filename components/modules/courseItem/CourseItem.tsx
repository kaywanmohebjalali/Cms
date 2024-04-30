import React from 'react'
import styled from '@/styles/courseItem.module.scss'
import DeleteCourse from '../deleteCourse/DeleteCourse'
import UpdateCourse from '../updateCourse/UpdateCourse'

interface typeProps{
  src:String;
  title?:String;
}
const CourseItem = ({title, src}:typeProps) => {
  return (
    <section className={`${styled.courseItem} `}>
        <div className={`${styled.right}`}>
            <img className={`${styled.imgCourse}`} src={`${src}`} alt="" />
            <h3 className={`${styled.title}`}>{title} </h3>
        </div>
        <div className={`${styled.left}`}>
          <UpdateCourse/>
          <DeleteCourse/>
        </div>
    </section>
  )
}

export default CourseItem