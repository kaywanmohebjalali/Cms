import React from 'react'
import styled from '@/styles/Navbar.module.scss'
import User from '../user/User'
import Search from '../search/Search'


const Navbar = () => {
  return (
    <section className={`${styled.navbar} container`}>
      <Search/>
      <User/>
    </section>
  )
}

export default Navbar