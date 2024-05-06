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
    <Button  color='#fff' backGroundColor='green' boxShadow='var(--box-shadow-green)' width='100%'>اضافه کردن دوره جدید </Button>

   </div>
</Modal.Open >
<Modal.Window name='add-course'>
  
 <Form  status='create' title='اطلاعات دوره رو وارد کنید' textButton='اصافه کردن دوره'/>
</Modal.Window>

</Modal>
    </>
  )
}

export default AddCourse