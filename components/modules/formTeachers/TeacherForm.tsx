import React, { useEffect } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale, faEnvelope, faFile, faKey, faTag, faUser, faVoicemail, } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import styled from '@/styles/Form.module.scss'
import { useRouter } from 'next/router';
import Spinner from '../spinner/Spinner';
import { ActionType, useStore } from '@/utils/store';
import { StateType } from '@/utils/store';
import { createTeacher, updateTeacher } from '@/services/apiTeachers';



interface typeTeacher {
  _id: any
  fullName: String,
  email: Number,
  password: String,
  teacherImage: String
}


type Inputs = {
  fullName: string,
  email: string,
  password: string
  img?: string

}


const TeacherForm = ({ title, textButton, status, teacher }: { title: String, textButton: String, status: String, teacher?: typeTeacher }) => {

  const loading = useStore((state: StateType) => state.loading)
  const setLoading = useStore((state: ActionType) => state.setLoading)
  const setTeachers = useStore((state: ActionType) => state.setTeachers)

  const update = status == 'update'
  // useEffect(() => setTeachers(teachers), [])

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: update ? teacher : {} as any,
  })


  const { replace } = useRouter()






  async function onSubmit(data: any) {

    try {
      const { fullName, email, password, img } = data

   
      const readerImg = new FileReader()

      if (img[0]) {

        readerImg?.readAsDataURL(img[0])
      } else {

        readerImg?.readAsDataURL(new Blob())
      }

      readerImg.onload = async () => {
        {
          let teacherImage: any

          if (img) {
            teacherImage = readerImg?.result
          }




          let response: any = ''
          setLoading(true)
          if (update) {
            if (img[0]) {

              response = await updateTeacher({ fullName, email, password,  teacherImage, _id: teacher?._id }) as any
            } else {

              response = await updateTeacher({ fullName, email, password,  _id: teacher?._id }) as any

            }
          } else {

            response = await createTeacher({ fullName, email, password,  teacherImage, _id: '' }) as any
            reset()
          }


          if ([200, 201].includes(response?.statusCode)) {
            setLoading(false)
            replace('/teachers')
           

            Swal.fire({
              position: "center",
              title: `teacher ${status}  successfully`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1800
            })

          } else {
            setLoading(false)
            Swal.fire({
              position: "center",
              title: `can not teacher ${status}`,
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

        {errors?.fullName?.message && <p className={`${styled.error}`}>{errors?.fullName?.message}</p>}
       <label htmlFor="fullName">

        
          <FontAwesomeIcon
            icon={faUser}
            className={`${styled.icon}`}
            
            />
          <input  id='fullName' 
          {...register("fullName", {
            required: 'نام مدرس رو وارد کنید',
            validate: (value) => {
              
              return (
                value?.length > 1 ||
                "باید نام مدرس بیشتر از 1 حرف باشد"

              );
            },
            min: {
              value: 2,
              message: "باید نام مدرس بیشتر از 1 حرف باشد"
            }
          })} type="text" placeholder='نام مدرس رو وارد کنید' defaultValue={(teacher as any)?.fullName} />
       
          </label >



        {errors?.email?.message && <p className={`${styled.error}`}>{errors?.email?.message}</p>}
        <label htmlFor="email">

          <FontAwesomeIcon
            icon={faEnvelope}
            className={`${styled.icon}`}
          />
          <input id='email'  {...register("email", {
            required: 'ایمیل رو وارد کنید',
       
          })} type="email" placeholder=' ایمیل رو وارد کنید' name='email' defaultValue={(teacher as any)?.email} />
        </label>




        {errors?.password?.message && <p className={`${styled.error}`}>{errors?.password?.message}</p>}
        <label htmlFor="password">

          <FontAwesomeIcon
            icon={faKey}
            className={`${styled.icon}`}
          />
          <input id='password' {...register("password", {
            required: ' رمز رو وارد کنید',
            validate: (value) => {
              return (
                value.length > 4 ||
                "باید  رمز بیشتر از 4 حرف باشد"

              );

            }
          })} type="password" placeholder=' رمز رو وارد کنید' name='password' defaultValue={(teacher as any)?.courseTeacherName} />
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

export default TeacherForm