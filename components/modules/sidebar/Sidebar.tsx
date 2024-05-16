import React from 'react'
import styled from '@/styles/Sidebar.module.scss'
import Logo from '../logo/Logo'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faBookmark, faHouse, faLock, faMasksTheater, faPerson, faPersonChalkboard, faTag, faUser, faUserTie } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
config.autoAddCss = false;


const Sidebar = () => {
  const { asPath } = useRouter() as any


  return (
    <section className={`${styled.main}`}>
      <Logo />

      <div className={`${styled.items}`}>
        <Link href='/courses'>

          <div className={`${styled.item} ${asPath?.includes('courses') ? styled.active : ''}`}>
            <span className={`${styled.point}  ${asPath?.includes('courses') ? styled.activePoint : ''}`}></span>
            <FontAwesomeIcon
              icon={faBookOpen}
            />

            <p className={`${styled.title}`}> دوره ها</p>
          </div>
        </Link>

        <Link href={`${['/login', '/register']?.includes(asPath)?'/login':'/admins'}`}>
          <div className={`${styled.item} ${asPath?.includes('admins') ? styled.active : ''}`}>
            <span className={`${styled.point} ${asPath?.includes('admins') ? styled.activePoint : ''}`}></span>
            <FontAwesomeIcon
              icon={faUserTie}
            />

            {

              ['/login', '/register']?.includes(asPath) ?
                <p className={`${styled.title}`}> ورود</p> :
                <p className={`${styled.title}`}>ادمین ها</p>

            }
          </div>
        </Link>


        <Link href={`${['/login', '/register']?.includes(asPath)?'/register':'/teachers'}`}>
          <div className={`${styled.item} ${asPath?.includes('teachers') ? styled.active : ''}`}>
            <span className={`${styled.point} ${asPath?.includes('teachers') ? styled.activePoint : ''}`}></span>
            <FontAwesomeIcon
              icon={faPersonChalkboard}
            />


            {

              ['/login', '/register']?.includes(asPath) ?
                <p className={`${styled.title}`}> ثبت نام</p> :
                <p className={`${styled.title}`}>مدرس ها</p>

            }

          </div>
        </Link>



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