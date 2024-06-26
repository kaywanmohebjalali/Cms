import React, { useRef } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faFile, faTag, faUser, } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import styled from '@/styles/Form.module.scss'
import { createCourse, updateCourse } from '@/services/apiCourses';
import { useRouter } from 'next/router';
import Spinner from '../spinner/Spinner';
import { useStore } from '@/utils/store';
import { StateType } from '@/utils/store';



interface typeCourse {
  _id: any
  courseName: String,
  coursePrice: Number,
  courseTeacherName: String,
  courseImage: String
}


type Inputs = {
  courseName: string,
  coursePrice: number,
  courseTeacherName: string
  img?: string

}


const Form = ({ title, textButton, status, course }: { title: String, textButton: String, status: String, course?: typeCourse }) => {

  const loading = useStore((state: StateType) => state.loading)
  const setLoading = useStore((state: StateType) => state.setLoading)
  const update = status == 'update'

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: update ? course : {} as any,
  })


  const { replace,reload } = useRouter()






  async function onSubmit(data: any) {

    try {
      const { courseName, coursePrice, courseTeacherName, img } = data


      const readerImg = new FileReader()

      if (img[0]) {

        readerImg?.readAsDataURL(img[0])
      } else {

        readerImg?.readAsDataURL(new Blob())
      }

      readerImg.onload = async () => {
        {
          let courseImage: any

          if (img) {
            courseImage = readerImg?.result
          }




          let response: any = ''
          setLoading(true)
          if (update) {
            if (img[0]) {

              response = await updateCourse({ courseName, coursePrice, courseTeacherName, courseImage, _id: course?._id }) as any
            } else {

              response = await updateCourse({ courseName, coursePrice, courseTeacherName, _id: course?._id }) as any

            }
          } else {
            response = await createCourse({ courseName, coursePrice, courseTeacherName, courseImage, _id: '' }) as any
            reset()
          }


          if ([200, 201].includes(response?.statusCode)) {
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




  function onError(error: any) {
    // console.log('error form  :', error);
  }



  return (
    <>
      {loading && <Spinner />}

      <form className={`${styled.form}`} onSubmit={handleSubmit(onSubmit, onError)}>
        <h3 className={`${styled.title}`}>{title}</h3>

        {errors?.courseName?.message && <p className={`${styled.error}`}>{errors?.courseName?.message}</p>}
       <label htmlFor="courseName">

        
          <FontAwesomeIcon
            icon={faTag}
            className={`${styled.icon}`}
            
            />
          <input  id='courseName' 
          {...register("courseName", {
            required: 'نام دوره رو وارد کنید',
            validate: (value) => {
              
              return (
                value?.length > 1 ||
                "باید نام دوره بیشتر از 1 حرف باشد"

              );
            },
            min: {
              value: 2,
              message: "باید نام دوره بیشتر از 1 حرف باشد"
            }
          })} type="text" placeholder='نام دوره رو وارد کنید' defaultValue={(course as any)?.courseName} />
       
          </label >

        {errors?.coursePrice?.message && <p className={`${styled.error}`}>{errors?.coursePrice?.message}</p>}
        <label htmlFor="coursePrice">

          <FontAwesomeIcon
            icon={faBalanceScale}
            className={`${styled.icon}`}
          />
          <input id='coursePrice'  {...register("coursePrice", {
            required: 'قیمت دوره رو وارد کنید',
            min: {
              value: 100000,
              message: "باید قیمت دوره بیشتر از 9999 تومان باشد",
            },
          })} type="number" placeholder='قیمت دوره رو وارد کنید' name='coursePrice' defaultValue={(course as any)?.coursePrice} />
        </label>

        {errors?.courseTeacherName?.message && <p className={`${styled.error}`}>{errors?.courseTeacherName?.message}</p>}
        <label htmlFor="courseTeacherName">

          <FontAwesomeIcon
            icon={faUser}
            className={`${styled.icon}`}
          />
          <input id='courseTeacherName' {...register("courseTeacherName", {
            required: 'نام مدرس رو وارد کنید',
            validate: (value) => {
              return (
                value.length > 2 ||
                "باید نام مدرس بیشتر از 2 حرف باشد"

              );

            }
          })} type="text" placeholder='نام مدرس رو وارد کنید' name='courseTeacherName' defaultValue={(course as any)?.courseTeacherName} />
        </label>
        {errors?.img?.message && <p className={`${styled.error}`}>{errors?.img?.message}</p>}
        <div className="">
        <FontAwesomeIcon
            icon={faFile}
            className={`${styled.icon}`}
            />
        <label className={`${styled.labelImg}`} htmlFor="img">
               انتخاب عکس  
          </label>
       
          <input className={`${styled.inputImg}`} id='img' {...register("img", {
            required: update ? false : 'لطفا یک عکس انتخاب کنید'
          })} type="file" name="img" />
          </div>

        <button type='submit'>{textButton}</button>
      </form>

    </>
  )
}

export default Form