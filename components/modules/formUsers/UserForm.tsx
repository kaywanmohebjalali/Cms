import React from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faFile, faKey, faUser, } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import styled from '@/styles/FormCourses.module.scss'
import { useRouter } from 'next/router';
import Spinner from '../spinner/Spinner';
import { useStore } from '@/utils/store';


import { createAdmin, updateAdmin } from '@/services/apiAuth';
import { typeUser } from '@/interfaces/user';





type Inputs = {
  firstName: String,
  lastName: String,
  userName: String,
  email: string,
  password: string
  img?: string,
  role: String

}


const UserForm = ({ title, textButton, statusForm, user }: { title: String, textButton: String, statusForm: String, user?: typeUser }) => {

  const loading = useStore((state: any) => state.loading)
  const setLoading = useStore((state: any) => state.setLoading)

  const update = statusForm == 'update'


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: update ? user : {} as any,
  })


  const { replace } = useRouter()






  async function onSubmit(data: any) {

    try {
      const { firstName,lastName,userName, email, password, img, role } = data


      const readerImg = new FileReader()

      if (img[0]) {

        readerImg?.readAsDataURL(img[0])
      } else {

        readerImg?.readAsDataURL(new Blob())
      }

      readerImg.onload = async () => {
        {
          let userImage: any

          if (img) {
            userImage = readerImg?.result
          }




          let response: any = ''
          setLoading(true)
          if (update) {
            if (img[0]) {

              response = await updateAdmin({ firstName,lastName,userName, email, password, userImage, _id: user?._id, role }) as any
            } else {

              response = await updateAdmin({ firstName,lastName,userName, email, password, _id: user?._id, role }) as any

            }
          } else {

            response = await createAdmin({ firstName,lastName,userName,email, password, userImage, _id: '' }) as any
            reset()
          }


          if ([200, 201].includes(response?.statusCode)) {
            setLoading(false)
            replace('/admins')


            Swal.fire({
              position: "center",
              title: `admin  ${statusForm}  successfully`,
              icon: 'success',
              showConfirmButton: false,
              timer: 1800
            })

          } else {
            setLoading(false)
            Swal.fire({
              position: "center",
              title: `can not admin ${statusForm}`,
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

        {errors?.firstName?.message && <p className={`${styled.error}`}>{errors?.firstName?.message}</p>}
        <label htmlFor="fullName">


          <FontAwesomeIcon
            icon={faUser}
            className={`${styled.icon}`}

          />
          <input id='firstName'
            {...register("firstName", {
              required: 'نام ادمین رو وارد کنید',
              validate: (value) => {

                return (
                  value?.length > 1 ||
                  "باید نام ادمین بیشتر از 1 حرف باشد"

                );
              },
              min: {
                value: 2,
                message: "باید نام خانوادگی ادمین بیشتر از 1 حرف باشد"
              }
            })} type="text" placeholder='نام ادمین رو وارد کنید' defaultValue={(user as any)?.firstName} />

        </label >


        {errors?.lastName?.message && <p className={`${styled.error}`}>{errors?.lastName?.message}</p>}
        <label htmlFor="lastName">


          <FontAwesomeIcon
            icon={faUser}
            className={`${styled.icon}`}

          />
          <input id='lastName'
            {...register("lastName", {
              required: 'نام خانوادگی رو وارد کنید',
              validate: (value) => {

                return (
                  value?.length > 1 ||
                  "باید نام خانوادگی بیشتر از 1 حرف باشد"

                );
              },
              min: {
                value: 2,
                message: "باید نام خانوادگی بیشتر از 1 حرف باشد"
              }
            })} type="text" placeholder='نام خانوادگی رو وارد کنید' defaultValue={(user as any)?.lastName} />

        </label >


        {errors?.userName?.message && <p className={`${styled.error}`}>{errors?.userName?.message}</p>}
        <label htmlFor="userName">


          <FontAwesomeIcon
            icon={faUser}
            className={`${styled.icon}`}

          />
          <input id='userName'
            {...register("userName", {
              required: 'نام  کاربری رو وارد کنید',
              validate: (value) => {

                return (
                  value?.length > 1 ||
                  "باید نام کاربری بیشتر از 1 حرف باشد"

                );
              },
              min: {
                value: 2,
                message: "باید نام کاربری بیشتر از 1 حرف باشد"
              }
            })} type="text" placeholder='نام کاربری رو وارد کنید' defaultValue={(user as any)?.userName} />

        </label >




        {errors?.email?.message && <p className={`${styled.error}`}>{errors?.email?.message}</p>}
        <label htmlFor="email">

          <FontAwesomeIcon
            icon={faEnvelope}
            className={`${styled.icon}`}
          />
          <input id='email'  {...register("email", {
            required: 'ایمیل رو وارد کنید',

          })} type="email" placeholder=' ایمیل رو وارد کنید' name='email' defaultValue={(user as any)?.email} />
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
          })} type="password" placeholder=' رمز رو وارد کنید' name='password' defaultValue={(user as any)?.password} />
        </label>







        {
        update?(<div className="">{errors?.role?.message && <p className={`${styled.error}`}>{errors?.role?.message}</p>}
        <label htmlFor="role" className={`${styled.labelSelect}`}>

<select 
className={`${styled.select}`}
  {...register("role", {
    required: true,
    validate: (value) => {

      return (
        value.length > 1 ||
        "باید نام مدرس  را انتخاب کنید"

      );

    }

  })}
>


  <option value="1" disabled>وضعیت ادمین  را انتخاب کنید</option>
  <option value="admin" > admin</option>
  <option value="superAdmin" > superAdmin   </option>



</select>

</label></div>):''}















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

export default UserForm