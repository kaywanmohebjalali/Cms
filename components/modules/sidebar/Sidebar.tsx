import React from 'react'
import styled from '@/styles/Sidebar.module.scss'
import Logo from '../logo/Logo'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faBookmark, faHouse, faLock,  faMasksTheater,  faPerson,  faTag, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
config.autoAddCss = false;


const Sidebar = () => {
  const {asPath}=useRouter() as any

  return (
    <section className={`${styled.main}`}>
      <Logo/>

      <div className={`${styled.items}`}>

      <div className={`${styled.item} ${asPath?.includes('courses')?styled.active:''}`}>
        <span className={`${styled.point}  ${asPath?.includes('courses')?styled.activePoint:''}`}></span>
      <FontAwesomeIcon
        icon={faBookOpen}
      />
      <Link href='/'>

         <p className={`${styled.title}`}> دوره ها</p>
      </Link>
      </div>

      <div className={`${styled.item} ${asPath?.includes('admins')?styled.active:''}`}>
      <span className={`${styled.point} ${asPath?.includes('admins')?styled.activePoint:''}`}></span>
      <FontAwesomeIcon
        icon={faUser}
      />
        <p className={`${styled.title}`}>ادمین ها</p>
      </div>


      <div className={`${styled.item} ${asPath?.includes('teachers')?styled.active:''}`}>
        <span className={`${styled.point} ${asPath?.includes('teachers')?styled.activePoint:''}`}></span>
      <FontAwesomeIcon
        icon={faUser}
      />
         <Link href='/teachers'>
         <p className={`${styled.title}`}>مدرس ها</p>
         
         </Link>
      </div>

   
      
      <div className={`${styled.item} ${styled.exit} `}>
        <span className={`${styled.point}`}></span>
      <FontAwesomeIcon
        icon={faLock}
      />
         <p className={`${styled.title}`}>خروج</p>
      </div>


      </div>
    </section>
  )
}

export default Sidebar