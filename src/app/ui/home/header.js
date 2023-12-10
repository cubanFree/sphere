'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Image from 'next/image';
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { RiHome6Line } from "react-icons/ri";
import { FiSearch, FiUser  } from "react-icons/fi";
import { MdOutlineLogout } from "react-icons/md";

export default function Header() {

    const supabase = createClientComponentClient();
    const route = useRouter();

    const signOut = async (path) => {
        await supabase.auth.signOut();
        route.push(path);
        route.refresh();
    }

    const links = [
        {
            name: 'Home',
            href: '/home',
            icon: <RiHome6Line className='md:text-4xl text-3xl'/>
        },
        {
            name: 'Search',
            href: '/home/search',
            icon: <FiSearch className='md:text-4xl text-3xl'/>
        },
        {
            name: 'Profile',
            href: '/home/profile',
            icon: <FiUser className='md:text-4xl text-3xl'/>
        }
    ]

    return (
        <nav>
          <ul className="w-full md:h-screen flex md:flex-col md:justify-between items-center p-4 text-lg font-semibold border-b-2 border-gray-900 md:border-none">

            <li className='w-full flex gap-20 md:gap-0 md:flex-col justify-start items-center md:items-start'>
                <Image 
                    src="/logo.gif" 
                    alt="Sphere Logo" 
                    width={72} 
                    height={16} 
                    onClick={async() => await signOut('/')}
                    className='cursor-pointer hidden sm:flex'
                />
                {
                    links.map((link, index) => {
                        return (
                            <Link 
                                key={index}
                                className="md:w-full md:py-2 md:px-5 md:border-l md:border-black md:hover:border-gray-800" 
                                href={link.href}
                                >
                                    <div className='md:w-full flex md:justify-start md:items-center md:gap-4'>
                                        {link.icon}
                                        <span className='w-full md:flex hidden'>{link.name}</span>
                                    </div>
                            </Link>
                        )
                    })
                }
            </li>

            <li className='md:w-full flex flex-col justify-center items-end'>
                <button
                    type='submit'
                    onClick={async() => await signOut('/auth')}
                    className="md:w-full md:py-2 md:px-5 md:border md:border-gray-900 md:hover:border-gray-700 md:rounded-xl text-[1rem]"
                    >   
                        <MdOutlineLogout className='text-3xl flex justify-center items-center md:hidden'/>
                        <span className='w-full hidden md:flex md:justify-center md:items-center'>Sign out</span>
                </button>
            </li>

          </ul>
        </nav>
    )
}