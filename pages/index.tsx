import { useRouter } from "next/router";
import { useEffect } from "react";


const Home = () => {
  const {replace}=useRouter()
  useEffect(()=>{
   replace('/courses')
  },[])

  return <section className="container main">
   
  </section>
};

export default Home;

