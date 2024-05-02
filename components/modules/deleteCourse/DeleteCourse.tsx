import React from 'react'
import Button from '../button/Button'
import { deleteCourse } from '@/services/apiCourses'
import { useRouter } from 'next/router'

const DeleteCourse = ({ id }: { id: any }) => {

 const {replace}=useRouter()


  async function deleteCourseHandler() {

    try {

      let response = await deleteCourse(id)

      if (response?.statusCode == 200) {
        alert('delete Course  successfully')
       
        replace('/')
      } else {
        alert(response?.data?.message)
      }


    } catch (error) {
      console.log('error : ', error);
      alert('مشکلی پیش امده')

    }
  }



  return (
    <Button click={deleteCourseHandler} color='#fff' backGroundColor='red' boxShadow='var(--box-shadow-red)' >  حذف  </Button>
  )
}

export default DeleteCourse