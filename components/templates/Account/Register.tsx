import AdminForm from '@/components/modules/formUsers/AdminForm'
import React from 'react'

const Register = () => {
  return (
    <div className=''>
    <AdminForm  status='create' title='اطلاعات ادمین رو وارد کنید' textButton='اضافه کردن ادمین'/>
    </div>
  )
}

export default Register