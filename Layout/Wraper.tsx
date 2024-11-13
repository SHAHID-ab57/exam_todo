"use client"
import dynamic from "next/dynamic";

const Header = dynamic(()=>import("@/Layout/Header"))
const Footer = dynamic(()=>import("@/Layout/Footer"))



const Wraper = ({children}:any) => {
  return (
    <div>
      <Header/>
      {children}
      <Footer/>
    </div>
  )
}

export default Wraper
