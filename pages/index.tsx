import AddCourse from "@/components/modules/addCourse/AddCourse";
import Courses from "@/components/templates/Home/Courses";
import { useRouter } from "next/router";

const Home = () => {
  const {query}=useRouter()
 
  return <section className="container main">
  
    <div className="top-main">
      <h1>دوره ها</h1>
      <AddCourse/>
    </div>
    <Courses filter={query?.filter}/>

  </section>
};

export default Home;
