'use client'

import { fetchSearchUsers } from "@/app/lib/data";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";
import ShowSearch from "./showSearch";
import { Spinner } from '@nextui-org/react';
import ShowDefault from "./showDefault";

export default function MainSearch({ id }) {

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const searchParams = useSearchParams();
    const { s, f } = Object.fromEntries(searchParams);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            const data = await fetchSearchUsers({ search_text: s, filter: f }) // return an array [{}]
            const convertData = data.map(user => ({
                id: user.id,
                full_name: user.full_name,
                user_name: user.user_name,
                avatar_url: user.avatar_url,
                follower: user.followers ? user.followers.some(user => user.id === id) : false, // if user is following to Friend
                following: user.following ? user.following.some(user => user.id === id) : false, // if Friend is following to user
            }))
            // save data in state and remove user
            setResult(convertData.filter(user => user.id !== id));
            setLoading(false);
        }

        fetch()
    }, [s, f, id])

    return (
        (s && f) ? (
            !loading ? <ShowSearch users={result} /> : <Spinner className="w-full flex justify-center"/>
        ) : (
            <div className="w-full">
                <ShowDefault />
            </div>
        )
    )
}