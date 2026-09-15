'use client'
import React from 'react'
import moment from "moment"
const Footer = () => {
    return (
        <footer className="w-full flex items-center justify-center py-1.5 bg-solar-500">
        <p className="md:text-xs text-[10px] text-black/70">
          &copy; {moment().format("YYYY")} Solar Comércio e Agroindústria Ltda.
        </p>
      </footer>
    )
}

export default Footer