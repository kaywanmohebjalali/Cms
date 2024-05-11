import AddCourse from "@/components/modules/addCourse/AddCourse";
import Courses from "@/components/templates/Courses/Courses";
import courseModel from '@/models/courses'
import teacherModel from '@/models/teachers'
import connectToDB from "@/utils/db";
import { ActionType, StateType, useStore } from "@/utils/store";
import { useEffect } from "react";


const CoursePage = ({ courses, teachers, error }: { courses: [], teachers: [], error: any }) => {

  const setTeachers = useStore((state: ActionType) => state.setTeachers)

  useEffect(() => setTeachers(teachers), [])





  return <section className="container main">
    <div className="top-main">
      <h1>دوره ها</h1>
      <AddCourse />
    </div>
    <Courses courses={courses} error={error} />
  </section>
};

export default CoursePage;


export async function getServerSideProps(context: any) {
  const { query } = context
  try {
    connectToDB()

    let courses: any
    if (Object.keys(query).length) {

      courses = await courseModel.find({ courseName: { $regex: query?.filter } });

    } else {

      courses = await courseModel.find()
    }
    let teachers = await teacherModel.find()

    return {
      props: { courses: JSON.parse(JSON.stringify(courses)), teachers: JSON.parse(JSON.stringify(teachers)), error: null },

    }
  } catch (error: any) {

    return {
      props: { courses: error?.message, teachers: error?.message, error: error?.message },

    }

  }
}