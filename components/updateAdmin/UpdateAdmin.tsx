import React from 'react'
import AdminForm from '../modules/formAdmins/AdminForm'
import Modal from '../modules/modal/Modal'
import Button from '../modules/button/Button'


interface typeAdmin {
  _id: any
  fullName: String,
  email: Number,
  password: String,
  adminImage: String
}



const UpdateAdmin = (admin:typeAdmin) => {
  
  
  return (
    <Modal>

<Modal.Open opens='update-admin'>
   <div >

<Button  color='#fff' backGroundColor='blue' boxShadow='var(--box-shadow-blue)' width='100%'>  ویرایش  </Button>
   </div>
</Modal.Open >
<Modal.Window name='update-admin'>
  
 <AdminForm status='update' title='اطلاعات جدید را وارد کنید' textButton='اپدیت اطلاعات ادمین'  admin={admin}/>
</Modal.Window>

</Modal>
  )
}

export default UpdateAdmin