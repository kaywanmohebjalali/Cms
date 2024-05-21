import UserForm from '@/components/modules/formUsers/UserForm'
import React from 'react'

const Register = () => {
  return (
    <div className=''>
    <UserForm  statusForm='create' title='اطلاعات ادمین رو وارد کنید' textButton='اضافه کردن ادمین'/>
    </div>
  )
}

export default Register