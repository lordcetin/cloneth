/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

type Props = {}

const Navbar = (props: Props) => {
  const authToken = Cookies.get("authToken");
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);
  const router = useRouter();

  useEffect(() => {
    if(authToken) {
      setIsAuthenticated(true);
    }else{
      setIsAuthenticated(false);
    }
  },[authToken])

  const deleteToken = () => {
    Cookies.remove("authToken");
    router.push("/auth");
    setIsAuthenticated(false);
  }

  return (
    <div className='flex justify-between items-center p-4'>
      <Link href='/' className='text-2xl font-bold'>LOGo</Link>
      <div className='flex space-x-4'>
        <Link href='/'>Home</Link>
        <Link href='/dashboard'>Dashboard</Link>
        {isAuthenticated ? null : <Link href='/auth'>Login</Link>}
        {isAuthenticated ? <div className='cursor-pointer' onClick={deleteToken}>Logout</div> : null}
      </div>
    </div>
  )
}

export default Navbar