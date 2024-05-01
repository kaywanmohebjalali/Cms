import React, { MouseEvent, ReactNode } from 'react'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBalanceScale,  faFile,  faTag, faUser, } from '@fortawesome/free-solid-svg-icons';
config.autoAddCss = false;

import styled from '@/styles/Form.module.scss'


const Form = ({file, title, textButton}:{file?:boolean,title:String, textButton:String}) => {



function CourseHandler(e: MouseEvent<HTMLButtonElement>){
  e.preventDefault()
  
  // code
}


  return (
    <form className={`${styled.form}`}>
      <h3 className={`${styled.title}`}>{title}</h3>
      <div className="">
      <FontAwesomeIcon
        icon={faTag}
        className={`${styled.icon}`}
       
      />
        <input type="text" placeholder='' name='courseName' />
      </div>

      <div className="">
      <FontAwesomeIcon
        icon={faBalanceScale}
        className={`${styled.icon}`}
      />
        <input type="number" placeholder='' name='coursePrice' />
      </div>

      <div className="">
      <FontAwesomeIcon
        icon={faUser}
        className={`${styled.icon}`}
      />
        <input type="text" placeholder='' name='courseTeacherName' />
      </div>
      {file!=false &&<div className="">
      <FontAwesomeIcon
        icon={faFile}
        className={`${styled.icon}`}
      />
        <input type="file" name="img" />
      </div>}

      <button onClick={CourseHandler}>{textButton}</button>
    </form>
  )
}

export default Form