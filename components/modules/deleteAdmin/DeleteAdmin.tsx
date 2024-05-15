import React from 'react'
import Button from '../button/Button'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'
import { useStore } from '@/utils/store'
import { deleteAdmin } from '@/services/apiAdmins'

const DeleteAdmin = ({ id }: { id: any }) => {
  
  const setLoading = useStore((state:any) => state.setLoading)
 const {replace}=useRouter()


  async function deleteCourseHandler() {

    try {
      setLoading(true)
      let response = await deleteAdmin(id)
      
      if (response?.statusCode == 200) {
        setLoading(false)
        Swal.fire({
          position: "center",
          title: `delete admin  successfully`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1800
        })
        
        replace('/admins')
      } else {
        setLoading(false)
        Swal.fire({
          position: "center",
          title: `can not admin deleted`,
          icon: 'error',
          showConfirmButton: false,
          timer: 1800
        })
      }
      
      
    } catch (error) {
      setLoading(false)
      Swal.fire({
        position: "center",
        title: 'مشکلی پیش امده',
        icon: 'error',
        showConfirmButton: false,
        timer: 1800
      })
    }
  }



  return (
    <Button click={deleteCourseHandler} color='#fff' backGroundColor='red' boxShadow='var(--box-shadow-red)' >  حذف  </Button>
  )
}

export default DeleteAdmin