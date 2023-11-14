import React from 'react'
import Logo from "../logo"
import Profile from "../profile/profile"

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between bg-gray-middle border-b border-white shadow-sm py-2 px-4">
      <div>
        <Logo />
      </div>
      <div>
        <Profile />
      </div>
    </div>
  )
}

export default Header