import connectToDB from '@/utils/db';
import React from 'react'
import teacherModel from '@/models/teachers'
import Teachers from '@/components/templates/Teachers/Teachers';
import AddTeacher from '@/components/modules/addTeacher/AddTeacher';

const TeacherPage = ({ teachers, error }: { teachers: [], error: any }) => {
  
  return <section className="container main">
    <div className="top-main">
      <h1>مدرس ها</h1>
      <AddTeacher />
    </div>
    <Teachers  teachers={teachers} error={error} />
  </section>
};

export default TeacherPage;

export async function getServerSideProps(context: any) {
  const { query } = context
  try {
    connectToDB()
   
    let teachers: any
    if (Object.keys(query).length) {

      teachers = await teacherModel.find({ fullName: { $regex: query?.filter } });

    } else {

      teachers = await teacherModel.find()
    }

    return {
      props: { teachers: JSON.parse(JSON.stringify(teachers)), error: null },

    }
  } catch (error: any) {

    return {
      props: { teachers: error?.message, error: error?.message },

    }

  }
}