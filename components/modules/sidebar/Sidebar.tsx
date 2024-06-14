import React, { useEffect, useState } from 'react'
import styled from '@/styles/Sidebar.module.scss'
import Logo from '../logo/Logo'
import { typeUser } from '@/interfaces/user'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faDashboard, faLock, faPersonChalkboard, faUserTie } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getMe } from '@/services/apiAuth';
import Logout from '../logout/Logout';
config.autoAddCss = false;


const Sidebar = () => {
  const { asPath } = useRouter() as any
  const [user, setUser] = useState<typeUser | null>(null)
console.log('sidebar : ',asPath);

  useEffect(() => {

    async function getUser() {

      try {
        const response = await getMe()
        if (response.statusCode == 200) {
          setUser(response?.data?.user)
        }


      } catch (error) {

      }
    }
    getUser()
  }, [asPath])
  

  return (
    <section className={`${styled.main}`}>
      <Logo />

      <div className={`${styled.items}`}>


        {user && asPath!='/login' ? <Link href='/dashboard'>

          <div className={`${styled.item} ${asPath?.includes('dashboard') ? styled.active : ''}`}>
            <span className={`${styled.point}  ${asPath?.includes('dashboard') ? styled.activePoint : ''}`}></span>
            <FontAwesomeIcon
              icon={faDashboard}
            />

            <p className={`${styled.title}`}>  داشبورد</p>
          </div>
        </Link> : ''}


        {user && asPath!='/login' ? <Link href='/courses'>

          <div className={`${styled.item} ${asPath?.includes('courses') ? styled.active : ''}`}>
            <span className={`${styled.point}  ${asPath?.includes('courses') ? styled.activePoint : ''}`}></span>
            <FontAwesomeIcon
              icon={faBookOpen}
            />

            <p className={`${styled.title}`}> دوره ها</p>
          </div>
        </Link> : ''}


        { !user || asPath=='/login' ? <Link href='/login'>
            <div className={`${styled.item} ${'/login'?.includes(asPath) ? styled.active : ''}`}>
              <span className={`${styled.point} ${'/login'?.includes(asPath) ? styled.activePoint : ''}`}></span>
              <FontAwesomeIcon
                icon={faUserTie}
              />
              <p className={`${styled.title}`}> ورود</p>

            </div>
          </Link> : user?.role == 'superAdmin' ? <Link href='/admins'>
            <div className={`${styled.item} ${'/admins'?.includes(asPath) ? styled.active : ''}`}>
              <span className={`${styled.point} ${'/admins'?.includes(asPath) ? styled.activePoint : ''}`}></span>
              <FontAwesomeIcon
                icon={faUserTie}
              />
              <p className={`${styled.title}`}>ادمین ها</p>

            </div>
          </Link> : ''
        }

        <Link href={`${!user ? '/register' : '/teachers'}`}>
          <div className={`${styled.item} ${['/teachers', '/register']?.includes(asPath) ? styled.active : ''}`}>
            <span className={`${styled.point} ${['/teachers', '/register']?.includes(asPath) ? styled.activePoint : ''}`}></span>
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


        {user ? <div className={`${styled.item} ${styled.exit} `}>
          <span className={`${styled.point}`}></span>
          <FontAwesomeIcon
            icon={faLock}
          />
          <p className={`${styled.title}`}><Logout/></p>
        </div> : ''}



      </div>
    </section>
  )
}

export default Sidebar