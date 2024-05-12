import Spinner from "@/components/modules/spinner/Spinner";
import { useRouter } from "next/router";
import { useEffect } from "react";


const Home = () => {
  const {replace}=useRouter()
  useEffect(()=>{replace('/courses')})

  return <section className="container main">
     <Spinner/>
  </section>
};

export default Home;

