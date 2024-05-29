import React from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faUser, } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import styled from '@/styles/FormTeachers.module.scss'
import { useRouter } from 'next/router';
import Spinner from '../spinner/Spinner';
import { useStore } from '@/utils/store';
import { login } from '@/services/apiAuth';





type Inputs = {
  identifier: string,
  password: string,
  remember: boolean,
}


const LoginForm = ({ title, textButton }: { title: String, textButton: String }) => {

  const loading = useStore((state: any) => state.loading)
  const setLoading = useStore((state: any) => state.setLoading)



  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()


  const { replace } = useRouter()




  async function onSubmit(data: any) {

    try {
      const { identifier, password,remember } = data


      let response: any = ''
      setLoading(true)

  
      
      response = await login({ identifier, password,remember }) as any





      if ([200, 201].includes(response?.statusCode)) {
        setLoading(false)
        replace('/')


        Swal.fire({
          position: "center",
          title: `login admin successfully`,
          icon: 'success',
          showConfirmButton: false,
          timer: 2800
        })

      } else if (response?.statusCode == 422) {
        setLoading(false)
        Swal.fire({
          position: "center",
          title: `${response?.data?.message}`,
          icon: 'error',
          showConfirmButton: false,
          timer: 2800
        })
      } else if (response?.statusCode == 404) {
        setLoading(false)
        Swal.fire({
          position: "center",
          title: `user don't exist with username or email`,
          icon: 'error',
          showConfirmButton: false,
          timer: 2800
        })
      } else if (response?.statusCode == 500) {
        setLoading(false)
        Swal.fire({
          position: "center",
          title: ` مشکلی پیش امده بعدا امتحان کنید`,
          icon: 'error',
          showConfirmButton: false,
          timer: 2800
        })
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

        {errors?.identifier?.message && <p className={`${styled.error}`}>{errors?.identifier?.message}</p>}
        <label htmlFor="identifier">


          <FontAwesomeIcon
            icon={faUser}
            className={`${styled.icon}`}

          />
          <input id='identifier'
            {...register("identifier", {
              required: ' ایمیل یا نام کاربری  رو وارد کنید',
              validate: (value) => {

                return (
                  value?.length > 1 ||
                  "باید ایمیل یا نام کاربری  ادمین بیشتر از 1 حرف باشد"

                );
              },
              min: {
                value: 2,
                message: "باید ایمیل یا نام کاربری ادمین بیشتر از 1 حرف باشد"
              }
            })} type="text" placeholder=' ایمیل یا نام کاربری  رو وارد کنید'  />

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
          })} type="password" placeholder=' رمز رو وارد کنید' name='password' />
        </label>




        <label className={`${styled.checkBox}`} htmlFor="remember">

          <input id='remember' {...register("remember")} type="checkbox"  name='remember'/>
         <p>مرا به خاطر بسپار</p>
        </label>

        <button type='submit'>{textButton}</button>
      </form>

    </>
  )
}

export default LoginForm