import React from 'react'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import Form from '../form/Form'




const AddCourse = () => {
  return (
    <>
<Modal>

<Modal.Open opens='add-course'>
   <div className="">
    <Button  color='#fff' backGroundColor='green' boxShadow='var(--box-shadow-green)'>اضافه کردن دوره جدید </Button>

   </div>
</Modal.Open >
<Modal.Window name='add-course'>
  
 <Form title='اطلاعات دوره رو وارد کنید' textButton='اصافه کردن دوره'/>
</Modal.Window>

</Modal>
    </>
  )
}

export default AddCourse