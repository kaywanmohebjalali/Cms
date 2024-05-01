import React from 'react'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import Form from '../form/Form'

const UpdateCourse = () => {
  return (
    <Modal>

<Modal.Open opens='add-course'>
   <div >

<Button  color='#fff' backGroundColor='blue' boxShadow='var(--box-shadow-blue)' width='100%'>  ویرایش  </Button>
   </div>
</Modal.Open >
<Modal.Window name='add-course'>
  
 <Form file={false} title='اطلاعات جدید را وارد کنید' textButton='اپدیت دوره'/>
</Modal.Window>

</Modal>
  )
}

export default UpdateCourse