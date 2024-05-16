import React from 'react'
import Button from '../button/Button'
import { deleteCourse } from '@/services/apiCourses'
import { useRouter } from 'next/router'
import {  useStore } from '@/utils/store'
import Swal from 'sweetalert2'

const DeleteCourse = ({ id }: { id: any }) => {
  
  const setLoading = useStore((state:any) => state.setLoading)
 const {replace}=useRouter()


  async function deleteCourseHandler() {

    try {
      setLoading(true)
      let response = await deleteCourse(id)
      
      if (response?.statusCode == 200) {
        setLoading(false)
        Swal.fire({
          position: "center",
          title: `delete Course  successfully`,
          icon: 'success',
          showConfirmButton: false,
          timer: 1800
        })
        
        replace('/courses')
      } else {
        setLoading(false)
        Swal.fire({
          position: "center",
          title: `can not Course deleted`,
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

export default DeleteCourse