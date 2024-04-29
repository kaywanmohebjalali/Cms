import type { AppProps } from "next/app";
import "@/styles/globals.scss";
import Sidebar from "@/components/modules/sidebar/Sidebar";
import Navbar from "@/components/modules/navbar/Navbar";


export default function App({ Component, pageProps }: AppProps) {
  return <section className="app" >

    <div className="app-Sidebar">

   <Sidebar/>
    </div>

   <main className="app-main">
   <Navbar/>
  <Component {...pageProps} />
   </main>

  </section>
}
