'use client'
import React from 'react'
import Image from "next/image"

const Logo = () => {
  return (
    <Image src={require('@/assets/images/logo_grupo.png')} alt={"Logo"} height={40} />
  )
}

export default Logo