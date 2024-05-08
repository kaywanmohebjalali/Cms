import AddCourse from "@/components/modules/addCourse/AddCourse";
import Courses from "@/components/templates/Home/Courses";
import courseModel from '..//models/courses'
import connectToDB from "../utils/db";


const Home = ({ courses, error }: { courses: [], error: any }) => {
  

  return <section className="container main">
    <div className="top-main">
      <h1>دوره ها</h1>
      <AddCourse />
    </div>
    <Courses  courses={courses} error={error} />
  </section>
};

export default Home;

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

    return {
      props: { courses: JSON.parse(JSON.stringify(courses)), error: null },

    }
  } catch (error: any) {

    return {
      props: { courses: error?.message, error: error?.message },

    }

  }
}