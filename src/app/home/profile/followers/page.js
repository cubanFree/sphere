import FormSearch from "@/app/ui/general/formSearch";
import GoBack from "@/app/ui/general/goBack";
import { Suspense } from "react";
import { Spinner } from '@nextui-org/react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import GetFollowers from "@/app/ui/home/profile/header/followers/getFollowers";

export default async function Followers() {
    
    // get user
    const supabase = createServerComponentClient({ cookies });
    const { data: { user: { id } } } = await supabase.auth.getUser();

    return (
        <>
            <div className="w-full flex justify-start items-center gap-4">
                <GoBack path={'/home/profile'} />
                <span className="text-2xl text-gray-500">Followers</span>
            </div>

            <div className="w-full flex flex-col">
                <FormSearch />
            </div>

            <div className="w-full flex justify-center">
                <Suspense fallback={<Spinner />}>
                    <GetFollowers id={id}/>
                </Suspense>
            </div>
        </>
    )
}