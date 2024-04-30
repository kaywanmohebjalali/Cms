import AddCourse from "@/components/modules/addCourse/AddCourse";
import Courses from "@/components/templates/Home/Courses";

const Home = () => {
  return <section className="container main">

    <div className="top-main">
      <h1>دوره ها</h1>
      <AddCourse/>
    </div>
    <Courses/>

  </section>
};

export default Home;
