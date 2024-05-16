import React from 'react'
import AdminForm from '../formUsers/UserForm'
import Modal from '../modal/Modal'
import Button from '../button/Button'
import { typeUser } from '@/interfaces/user'






const UpdateUser = (user:typeUser) => {
  
  
  return (
    <Modal>

<Modal.Open opens='update-user'>
   <div >

<Button  color='#fff' backGroundColor='blue' boxShadow='var(--box-shadow-blue)' width='100%'>  ویرایش  </Button>
   </div>
</Modal.Open >
<Modal.Window name='update-user'>
  
 <AdminForm statusForm='update' title='اطلاعات جدید را وارد کنید' textButton='اپدیت اطلاعات ادمین'  user={user}/>
</Modal.Window>

</Modal>
  )
}

export default UpdateUser