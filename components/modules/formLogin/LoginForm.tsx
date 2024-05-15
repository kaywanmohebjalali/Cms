import React from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFile, faKey,  faUser,  } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import styled from '@/styles/FormTeachers.module.scss'
import { useRouter } from 'next/router';
import Spinner from '../spinner/Spinner';
import { ActionType, useStore } from '@/utils/store';
import { StateType } from '@/utils/store';
import { createAdmin, updateAdmin } from '@/services/apiAdmins';



interface typeLogin {
  _id: any
  fullName: String,
  password: String,
  
}


type Inputs = {
  fullName: string,
  email: string,
  password: string
  img?: string

}


const LoginForm = ({ title, textButton, user }: { title: String, textButton: String, user?: typeLogin }) => {

  const loading = useStore((state: any) => state.loading)
  const setLoading = useStore((state: any) => state.setLoading)



  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()


  const { replace } = useRouter()






  async function onSubmit(data: any) {

  //   try {
  //     const { fullName,  password } = data


  //         let response: any = ''
  //         setLoading(true)
  //         if (update) {
  //           if (img[0]) {

  //             response = await updateAdmin({ fullName, email, password,  adminImage, _id: admin?._id }) as any
  //           } else {

  //             response = await updateAdmin({ fullName, email, password,  _id: admin?._id }) as any

  //           }
  //         } else {

  //           response = await createAdmin({ fullName, email, password,  adminImage, _id: '' }) as any
  //           reset()
  //         }


  //         if ([200, 201].includes(response?.statusCode)) {
  //           setLoading(false)
  //           replace('/admins')
           

  //           Swal.fire({
  //             position: "center",
  //             title: `admin ${status}  successfully`,
  //             icon: 'success',
  //             showConfirmButton: false,
  //             timer: 1800
  //           })

  //         } else {
  //           setLoading(false)
  //           Swal.fire({
  //             position: "center",
  //             title: `can not admin ${status}`,
  //             icon: 'error',
  //             showConfirmButton: false,
  //             timer: 1800
  //           })
  //         }
  //       }
      



  //   } catch (error) {
  //     setLoading(false)

  //     Swal.fire({
  //       position: "center",
  //       title: 'مشکلی پیش امده',
  //       icon: 'error',
  //       showConfirmButton: false,
  //       timer: 1800
  //     })

  //   }
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
            required: 'نام ادمین رو وارد کنید',
            validate: (value) => {
              
              return (
                value?.length > 1 ||
                "باید نام ادمین بیشتر از 1 حرف باشد"

              );
            },
            min: {
              value: 2,
              message: "باید نام ادمین بیشتر از 1 حرف باشد"
            }
          })} type="text" placeholder='نام ادمین رو وارد کنید' defaultValue={(user as any)?.fullName} />
       
          </label >



   



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
          })} type="password" placeholder=' رمز رو وارد کنید' name='password' defaultValue={(user as any)?.password} />
        </label>
        
        
        
      
        <button type='submit'>{textButton}</button>
      </form>

    </>
  )
}

export default LoginForm