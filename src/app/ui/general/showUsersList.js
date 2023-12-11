'use client';

import { useSearchParams, usePathname } from "next/navigation";
import AvatarDesign from "./avatarDesign";
import Link from "next/link";
import BtnFollow from "./btnFollow";
import { FaUserFriends } from "react-icons/fa";
import { getTimeAgo } from "./getTimeAgo";

export default function ShowUsersList({ users }) {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { s , f } = Object.fromEntries(searchParams);

    // Filter users for search
    const filterUsers = 
        (s && f) ? 
            (f === 'full_name') ? 
                users.filter(user => user.full_name.toLowerCase().includes(s.toLowerCase()))
            : (f === 'user_name') && users.filter(user => user.user_name.toLowerCase().includes(s.toLowerCase()))
        : users

    return (
        filterUsers.length ? (
            <ul className="w-full flex flex-col items-start justify-center">
                {
                    filterUsers.map((user, index) => {

                        // Get time ago
                        const getTime = getTimeAgo(user.friend_since);

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
                                        <div className="w-full flex gap-2 items-center">
                                            <span>{user.full_name}</span>
                                            <FaUserFriends className="text-gray-500"/>
                                            <span className="text-gray-500 text-sm">{getTime}</span>
                                        </div>
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