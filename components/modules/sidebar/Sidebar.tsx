import React from 'react'
import styled from '@/styles/Sidebar.module.scss'
import Logo from '../logo/Logo'

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHouse, faLock,  faTag } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;


const Sidebar = () => {
  return (
    <section className={`${styled.main}`}>
      <Logo/>

      <div className={`${styled.items}`}>

      <div className={`${styled.item} ${styled.active}`}>
        <span className={`${styled.point} ${styled.activePoint}`}></span>
      <FontAwesomeIcon
        icon={faHouse}
      />
         <p className={`${styled.title}`}>صحفه اصلی</p>
      </div>

      <div className={`${styled.item} `}>
        <span className={`${styled.point} `}></span>
      <FontAwesomeIcon
        icon={faTag}
      />
         <p className={`${styled.title}`}> تماس با ما</p>
      </div>


      <div className={`${styled.item} `}>
        <span className={`${styled.point}`}></span>
      <FontAwesomeIcon
        icon={faBookmark}
      />
         <p className={`${styled.title}`}> درباره ی ما</p>
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