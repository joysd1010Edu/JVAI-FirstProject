'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Navbar = () => {

    const pathName = usePathname()

    const navItems = [
        {
            title: 'Home',
            path: '/'
        },
        {
            title: 'About Us',
            path: '/about-us'
        },
        {
            title: 'Types of Theraphy',
            path: '/theraphy'
        },
        {
            title: 'Common Struggles',
            path: '/commonStruggles'
        },
    ]

    return (
        <div >
            <div>
                <div className="navbar bg-[#010C4A80] blur-[300] shadow-sm lg:px-16">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {
                                    navItems?.map((navItem) => (
                                        <Link href={navItem.path} key={navItem.path}>{navItem.title}</Link>
                                    ))
                                }
                            </ul>
                        </div>
                        <h3>Emothrive</h3>
                    </div>
                    <div className="navbar-center hidden lg:flex ">
                        <ul className="menu menu-horizontal gap-10 px-1 text-[20px]">
                            {
                                navItems?.map((navItem) => (
                                    <Link className={` font-semibold ${pathName === navItem.path ? "text-[]" : ""}`} href={navItem.path} key={navItem.path}>{navItem.title}</Link>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <Link href={'/login'} className='btn bg-primary text-white rounded-[38px] py-[10px] px-[20px]'>Try Free AI Therapy</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar