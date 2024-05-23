import { logout } from '@/services/apiAuth'
import { useRouter } from 'next/router';
import React from 'react'
import Swal from 'sweetalert2';

const Logout = () => {
const {replace}=useRouter()
async function logoutHandler(){
    try {
        const response=await logout();
        if (response?.statusCode==200) {
            replace('/login')
        }else{
            Swal.fire({
                position: "center",
                title: `user not logout`,
                icon: 'error',
                showConfirmButton: false,
                timer: 3800
              })
        }
        
    } catch (error) {
        
    }
 }

  return (
    <span onClick={logoutHandler}>خروج</span>
  )
}

export default Logout