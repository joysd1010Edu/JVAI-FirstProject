'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { RiMenu4Fill } from "react-icons/ri";

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
            title: 'Types of Therapy',
            path: '/theraphy'
        },
        {
            title: 'Common Struggles',
            path: '/commonStruggles'
        },
        {
            title: 'Our Pricing Plans',
            path: '/pricingPlans'
        },
       
 
    ]
const scrollToFeature = (e) => {
  e.preventDefault();
  localStorage.setItem('scrollToFeature', 'true');
  const featureSection = document.getElementById('feature_section');
  if (featureSection) {
    featureSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
    return (
        <div >
            <div>
                <div className="navbar sticky top-0 z-50 bg-[#081335] shadow-md  lg:px-20 ">
                    <div className="navbar-start ">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden font-bold bg-transparent text-white">
                                <RiMenu4Fill size={28} />
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow ">
                                {
                                    navItems?.map((navItem) => (
                                        <Link className=' py-2 ' href={navItem.path} key={navItem.path}>{navItem.title}</Link>
                                    ))
                                }
                            </ul>
                        </div>
                        <Link href={'/'}><Image className='hidden lg:block' src='/logo.png' alt='website_logo' width={30} height={30}/></Link>
                    </div>
                    <div className="navbar-center hidden lg:flex ">
                        <ul className="menu menu-horizontal gap-10 px-1 text-[20px] text-white">
                            {
                                navItems?.map((navItem) => (
                                    <Link className={` font-semibold ${pathName === navItem.path ? "text-[#0056F6]" : ""}`} href={navItem.path} key={navItem.path}>{navItem.title}</Link>
                                ))
                            }
<a
        href="#feature_section"
        className="cursor-pointer font-semibold"
        onClick={scrollToFeature}
    >
        How We Work
    </a>                      
  </ul>
                    </div>
                    <div className="navbar-end">
                        <Link href={'/chat'} className='bg-[#0056F6] text-white rounded-[38px] py-[10px] px-[20px] outline-none'>Try Free AI Therapy</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
