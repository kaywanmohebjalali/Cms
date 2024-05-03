import React from 'react'

import styled from '@/styles/Spinner.module.scss'
const Spinner = () => {
  return (
    <section className={`${styled.mainSpinner}`}>

    <div className={`${styled.spinner}`}></div>
    </section>
  )
}

export default Spinner