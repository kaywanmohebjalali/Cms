import React, { MouseEvent, useRef } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale,  faFile,  faTag, faUser, } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

import styled from '@/styles/Form.module.scss'
import { createCourse } from '@/services/apiCourses';


const Form = ({ title, textButton,status}:{title:String, textButton:String, status:String}) => {
const courseNameRef= useRef('') as any
const coursePriceRef= useRef('') as any
const courseTeacherNameRef= useRef('') as any
const courseImageRef= useRef('') as any

const update=status=='update'


async function CourseHandler(e: MouseEvent<HTMLButtonElement>){
  e.preventDefault()


  try {
    const courseName= courseNameRef.current.value
    const coursePrice=Number(coursePriceRef.current.value)
    const courseTeacherName=courseTeacherNameRef.current.value
    const readerImg=new FileReader()
    readerImg.readAsDataURL(courseImageRef.current.files[0])
    readerImg.onload =async()=>{
      
      const courseImage= readerImg?.result
    
    
      
      if (
        courseName.trim().length < 2 ||
        String(coursePrice).trim().length<5 ||
        coursePrice<=0 ||
        courseTeacherName.trim().length < 3
      ) {
        alert('data not valid')
      }
      
      const {data, statusCode}=await createCourse({courseName, coursePrice, courseTeacherName, courseImage}) as any
      
      
      
      
      if(statusCode==201){
        alert('Course added successfully')
      }else{
        alert(data?.message)
      }
    } 
} catch (error) {
    alert('مشکلی پیش امده')
}
}


  return (
    <form className={`${styled.form}`}>
      <h3 className={`${styled.title}`}>{title}</h3>
      <div className="">
      <FontAwesomeIcon
        icon={faTag}
        className={`${styled.icon}`}
       
      />
        <input ref={courseNameRef} type="text" placeholder='' name='courseName'  />
      </div>

      <div className="">
      <FontAwesomeIcon
        icon={faBalanceScale}
        className={`${styled.icon}`}
      />
        <input ref={coursePriceRef} type="number" placeholder='' name='coursePrice' />
      </div>

      <div className="">
      <FontAwesomeIcon
        icon={faUser}
        className={`${styled.icon}`}
      />
        <input ref={courseTeacherNameRef} type="text" placeholder='' name='courseTeacherName' />
      </div>
    <div className="">
      <FontAwesomeIcon
        icon={faFile}
        className={`${styled.icon}`}
      />
        <input ref={courseImageRef} type="file" name="img" />
      </div>

      <button onClick={CourseHandler}>{textButton}</button>
    </form>
  )
}

export default Form