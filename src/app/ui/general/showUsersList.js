'use client';

import { useSearchParams, usePathname } from "next/navigation";
import AvatarDesign from "./avatarDesign";
import Link from "next/link";
import BtnFollow from "./btnFollow";

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
                        return (
                            <li
                                key={index}
                                className="w-full flex justify-center items-center border border-black hover:border-gray-900 p-4 rounded-xl"
                            >
                                <Link
                                    href={`${pathname}/${user.user_name}`}
                                    className="w-full flex gap-4"
                                >
                                    <AvatarDesign path={user.avatar_url} />
                                    <div className="w-full flex flex-col items-start justify-start">
                                        <div className="w-full flex gap-4 items-center">
                                            <span>{user.full_name}</span>
                                            <span className="text-gray-500 text-sm">• since {user.friend_since}</span>
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