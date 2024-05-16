import React from 'react'
import Button from '../button/Button'
import Modal from '../modal/Modal'
import UserForm from '../formUsers/UserForm'




const AddUser = () => {

 
  return (
    <>
<Modal>

<Modal.Open opens='add-user'>
   <div className="">
    <Button  color='#fff' backGroundColor='green' boxShadow='var(--box-shadow-green)' width='100%'>اضافه کردن ادمین جدید </Button>

   </div>
</Modal.Open >
<Modal.Window name='add-user'>
  
 <UserForm  statusForm='create' title='اطلاعات ادمین رو وارد کنید' textButton='اضافه کردن ادمین'/>
</Modal.Window>

</Modal>
    </>
  )
}

export default AddUser