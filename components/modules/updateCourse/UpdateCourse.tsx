import React from 'react'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import Form from '../form/Form'

interface typeCourse { 
  _id:any
  courseName:String,
   coursePrice:Number, 
   courseTeacherName:String,
    courseImage:any 
  }



const UpdateCourse = (course:typeCourse) => {
  
  
  return (
    <Modal>

<Modal.Open opens='update-course'>
   <div >

<Button  color='#fff' backGroundColor='blue' boxShadow='var(--box-shadow-blue)' width='100%'>  ویرایش  </Button>
   </div>
</Modal.Open >
<Modal.Window name='update-course'>
  
 <Form status='update' title='اطلاعات جدید را وارد کنید' textButton='اپدیت دوره'  course={course}/>
</Modal.Window>

</Modal>
  )
}

export default UpdateCourse