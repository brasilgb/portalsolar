'use client'
import React from 'react'
import moment from "moment"
const Footer = () => {
    return (
        <footer className="w-full flex items-center justify-center py-0.5 bg-blue-primary">
        <p className="md:text-xs text-[8px] text-gray-50">
          &copy; {moment().format("YYYY")} Solar Comércio e Agroindústria Ltda.
        </p>
      </footer>
    )
}

export default Footer