'use client';

import Link from 'next/link';
import AvatarDesign from '../../general/avatarDesign';
import { usePathname } from 'next/navigation';
import BtnFollow from '../../general/btnFollow';

export default function ShowSearch({ users }) {

    const pathname = usePathname();
    
    return (
        users.length ? (
            <ul className="w-full flex flex-col items-start justify-center">
                {
                    users.map((user, index) => {
                        return (
                            <li
                                key={index}
                                className="w-full flex justify-center items-center border border-black hover:border-gray-800 sm:p-4 px-0 py-4 rounded-xl"
                            >
                                <Link
                                    href={`${pathname}/${user.user_name}`}
                                    className="w-full flex gap-4"
                                >
                                    <AvatarDesign path={user.avatar_url} />
                                    <div className="w-full flex flex-col items-start justify-start">
                                        <span>{user.full_name}</span>
                                        <span className="text-gray-400 text-sm">@{user.user_name}</span>
                                    </div>
                                </Link>
                                <BtnFollow id={user.id} following={user.following} follower={user.follower} />
                            </li>
                        );
                    })
                }
            </ul>
        ) : (
            <span className="w-full flex justify-center items-center text-gray-400">Nobody by here :{'('}</span>
        )
    )
}