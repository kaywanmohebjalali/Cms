import React from 'react'

import styled from '@/styles/Form.module.scss'

const Form = () => {
  return (
    <form className={`${styled.form}`}>
        <h3>اضافه کردن دوره جدید</h3>
        <div className="">
          icon
        <input type="text" placeholder='' name='courseName'/>
        </div>

        <div className="">
            icon
        <input type="number" placeholder='' name='coursePrice'/>
        </div>

        <div className="">
            icon
         <input type="text" placeholder='' name='courseTeacherName'/>
        </div>
        <div className="">
            icon
        <input type="file" name="img"  />
        </div>
        </form>
  )
}

export default Form