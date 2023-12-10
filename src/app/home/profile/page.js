import HeaderProfile from "@/app/ui/home/profile/header/headerProfile";
import MainProfile from "@/app/ui/home/profile/main/mainProfile";
import ProfileSkeleton from "@/app/ui/skelton/profileSkeleton";
import { Suspense } from "react";
import { Divider, Spinner } from "@nextui-org/react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

export default async function Profile() {

    // get user
    const supabase = createServerComponentClient({ cookies });
    const { data: { user: { id } } } = await supabase.auth.getUser();

    return (
        <>
            <header>
                <Suspense fallback={<ProfileSkeleton />}>
                    <HeaderProfile id={id}/>
                </Suspense>
            </header>
            <Divider className="bg-gray-800" />
            <main>
                <Suspense fallback={<Spinner size="md" />}>
                    <MainProfile  id={id}/>
                </Suspense>
            </main>
            <Toaster position="top-right"/>
        </>
    )
}