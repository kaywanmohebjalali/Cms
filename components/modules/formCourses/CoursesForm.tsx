import React, { useEffect,  useState } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faFile, faTag } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import styled from '@/styles/FormCourses.module.scss'
import { createCourse, updateCourse } from '@/services/apiCourses';
import { useRouter } from 'next/router';
import Spinner from '../spinner/Spinner';
import { useStore } from '@/utils/store';
import { getTeachers } from '@/services/apiTeachers';
import { typeCourse } from '@/interfaces/course';





type Inputs = {
  courseName: string,
  coursePrice: number,
  teacherId: string
  img?: string

}


const CoursesForm = ({ title, textButton, status, course }: { title: String, textButton: String, status: String, course?: typeCourse }) => {
  
  const [teachers, setTeachers]=useState([])
  const loading = useStore((state: any) => state.loading)
  const setLoading = useStore((state: any) => state.setLoading)
  const { replace } = useRouter()
  const update = status == 'update'

  


  useEffect(()=>{
     async function getData() {
      try {
        let {data}=await getTeachers(undefined)
        setTeachers(data)
        
        
      } catch (error) {
        
      }
     }
     getData()
     
  },[])

  



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: update ? {...course, 'teacherId':course?.teacherId?._id} : {} as any,
  })


 




  async function onSubmit(data: any) {
  
    try {
      let { courseName, coursePrice, teacherId, img } = data
      
      teacherId=teacherId._id?teacherId._id:teacherId
      
   coursePrice=+coursePrice;

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

              response = await updateCourse({ courseName, coursePrice, teacherId:teacherId, courseImage, _id: course?._id }) as any
            } else {

              response = await updateCourse({ courseName, coursePrice, teacherId:teacherId, _id: course?._id }) as any

            }
          } else {
   
            response = await createCourse({ courseName, coursePrice, teacherId:teacherId, courseImage, _id: '' }) as any
            // reset()
          }


          if ([200, 201].includes(response?.statusCode)) {
            setLoading(false)
            replace('/courses')
           

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

        {errors?.teacherId?.message && <p className={`${styled.error}`}>{errors?.teacherId?.message}</p>}
        <label htmlFor="teacherId" className={`${styled.labelSelect}`}>

         <select  defaultValue={1} 
       
       
        className={`${styled.select}`} 
     {...register("teacherId", {
       required: true,
       validate: (value:any) => {
      
        return (
          value!='1' ||
          "باید نام مدرس  را انتخاب کنید"

        );

      }
       
      })}
      >
       

        <option  value="1" >نام مدرس را انتخاب کنید</option>
      {teachers.length && teachers.map((teacher:any)=><option value={`${teacher._id}`}>{teacher?.fullName}</option>)}
      
        </select>

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

export default CoursesForm