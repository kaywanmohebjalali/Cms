import React from 'react'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import TeacherForm from '../formTeachers/TeacherForm'




const AddTeacher = () => {

 
  return (
    <>
<Modal>

<Modal.Open opens='add-teacher'>
   <div className="">
    <Button  color='#fff' backGroundColor='green' boxShadow='var(--box-shadow-green)' width='100%'>اضافه کردن مدرس جدید </Button>

   </div>
</Modal.Open >
<Modal.Window name='add-teacher'>
  
 <TeacherForm  status='create' title='اطلاعات مدرس رو وارد کنید' textButton='اضافه کردن مدرس'/>
</Modal.Window>

</Modal>
    </>
  )
}

export default AddTeacher