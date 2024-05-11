import React from 'react'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import TeacherForm from '../formTeachers/TeacherForm'


interface typeTeacher {
  _id: any
  fullName: String,
  email: Number,
  password: String,
  teacherImage: String
}



const UpdateTeacher = (teacher:typeTeacher) => {
  
  
  return (
    <Modal>

<Modal.Open opens='update-course'>
   <div >

<Button  color='#fff' backGroundColor='blue' boxShadow='var(--box-shadow-blue)' width='100%'>  ویرایش  </Button>
   </div>
</Modal.Open >
<Modal.Window name='update-course'>
  
 <TeacherForm status='update' title='اطلاعات جدید را وارد کنید' textButton='اپدیت اطلاعات مدرس'  teacher={teacher}/>
</Modal.Window>

</Modal>
  )
}

export default UpdateTeacher