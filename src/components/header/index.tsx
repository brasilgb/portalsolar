'use client'
import React from 'react'
import Logo from "../logo"
import Profile from "../profile/profile"

const Header = () => {
  return (
    //    <div className="w-full flex items-center justify-between bg-gray-middle border-b border-white shadow-sm py-2 px-4">
    <header className={`w-full bg-blue-primary px-2`}>
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