import React from 'react'
import styled from '@/styles/Navbar.module.scss'
import User from '../user/User'
import Search from '../search/Search'
import { useRouter } from 'next/router'


const Navbar = () => {
  const { asPath } = useRouter() as any
  
  

  
       
  return (
    <section className={`${styled.navbar} container`}>
      <Search />
      {!['/register', '/login']?.includes(asPath)?<User/>:''}
    </section>
  )
}

export default Navbar