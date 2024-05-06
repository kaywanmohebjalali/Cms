import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faFile, faTag, faUser, } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

import styled from '@/styles/Form.module.scss'
import { createCourse, updateCourse } from '@/services/apiCourses';
import { useRouter } from 'next/router';
import Spinner from '../spinner/Spinner';
import { useStore } from '@/utils/store';
 
import Swal from 'sweetalert2'

import { StateType } from '@/utils/store';
interface typeCourse {
  _id: any
  courseName: String,
  coursePrice: Number,
  courseTeacherName: String,
  courseImage: String
}



const Form = ({ title, textButton, status, course }: { title: String, textButton: String, status: String, course?: typeCourse }) => {
  
  const loading = useStore((state:StateType) => state.loading)
  const setLoading = useStore((state:StateType) => state.setLoading)
  const update = status == 'update'







  const courseNameRef = useRef('') as any
  const coursePriceRef = useRef('') as any
  const courseTeacherNameRef = useRef('') as any
  const courseImageRef = useRef('') as any
  const {replace}=useRouter()





  async function CourseHandler(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
  
    try {
      const courseName = courseNameRef?.current?.value
      const coursePrice = Number(coursePriceRef?.current?.value)
      const courseTeacherName = courseTeacherNameRef?.current?.value
      let img = courseImageRef?.current?.value
      img = courseImageRef.current.files[0]

      


   

      const readerImg = new FileReader()
      readerImg.readAsDataURL(courseImageRef?.current?.files[0])

      readerImg.onload = async () => {
        {
          let courseImage = readerImg?.result


          if (
            courseName.trim().length < 2 ||
            String(coursePrice).trim().length < 5 ||
            coursePrice <= 0 ||
            courseTeacherName.trim().length < 3
          ) {
            Swal.fire({
              position: "center",
              title: `data not valid`,
              icon: 'error',
              showConfirmButton: false,
              timer: 1800
            })
          }
          let response: any = ''
          setLoading(true)
          if (status == 'create') {

            response = await createCourse({ courseName, coursePrice, courseTeacherName, courseImage, _id: '' }) as any
          } else {
            response = await updateCourse({ courseName, coursePrice, courseTeacherName, courseImage, _id: course?._id }) as any

          }
          
           
          if ([200,201].includes(response?.statusCode) ) {
            setLoading(false)
            replace('/')
         
            Swal.fire({
              position: "center",
              title: `Course ${status}  successfully`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1800
            })
            
          } else {
            setLoading(false)
            Swal.fire({
              position: "center",
              title: `can not Course ${status}`,
              icon: 'error',
              showConfirmButton: false,
              timer: 1800
            })
          }
        }
      }
    } catch (error) {
      setLoading(false)

      Swal.fire({
        position: "center",
        title: 'مشکلی پیش امده',
        icon: 'error',
        showConfirmButton: false,
        timer: 1800
      })

    }
  }



  return (
    <>
    {loading&& <Spinner/>}

    <form className={`${styled.form}`}>
      <h3 className={`${styled.title}`}>{title}</h3>
      <div className="">
        <FontAwesomeIcon
          icon={faTag}
          className={`${styled.icon}`}
          
          />
        <input ref={courseNameRef} type="text" placeholder='' name='courseName' defaultValue={(course as any)?.courseName} />
      </div>

      <div className="">
        <FontAwesomeIcon
          icon={faBalanceScale}
          className={`${styled.icon}`}
          />
        <input ref={coursePriceRef} type="number" placeholder='' name='coursePrice' defaultValue={(course as any)?.coursePrice} />
      </div>

      <div className="">
        <FontAwesomeIcon
          icon={faUser}
          className={`${styled.icon}`}
          />
        <input ref={courseTeacherNameRef} type="text" placeholder='' name='courseTeacherName' defaultValue={(course as any)?.courseTeacherName} />
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

          </>
  )
}

export default Form