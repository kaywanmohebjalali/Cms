import React from 'react'
import Button from '../button/Button'
import { deleteCourse } from '@/services/apiCourses'
import { useRouter } from 'next/router'
import { StateType, useStore } from '@/utils/store'

const DeleteCourse = ({ id }: { id: any }) => {
  
  const setLoading = useStore((state:StateType) => state.setLoading)
 const {replace}=useRouter()


  async function deleteCourseHandler() {

    try {
      setLoading(true)
      let response = await deleteCourse(id)
      
      if (response?.statusCode == 200) {
        setLoading(false)
        // alert('delete Course  successfully')
        
        replace('/')
      } else {
        setLoading(false)
        alert(response?.data?.message)
      }
      
      
    } catch (error) {
      setLoading(false)
      console.log('error : ', error);
      alert('مشکلی پیش امده')

    }
  }



  return (
    <Button click={deleteCourseHandler} color='#fff' backGroundColor='red' boxShadow='var(--box-shadow-red)' >  حذف  </Button>
  )
}

export default DeleteCourse