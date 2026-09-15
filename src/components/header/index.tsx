'use client'
import React from 'react'
import Logo from "../logo"
import Profile from "../profile/profile"

const Header = () => {
  return (
    <header className={`w-full bg-solar-500 px-2 shadow-md z-40`}>
      <div className="container py-1 mx-auto flex items-center justify-between h-16">
        <div>
          <Logo />
        </div>
        <div>
          <Profile />
        </div>
      </div>
    </header>
  )
}

export default Header