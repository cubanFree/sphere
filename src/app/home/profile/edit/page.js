import fetchUser from "@/app/lib/data";
import FormEditProfile from "@/app/ui/home/profile/header/edit/formEditProfile";
import GoBack from "@/app/ui/general/goBack";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function EditProfile() {

    // get user
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser()

    // get user data
    const data = await fetchUser({ id: user.id })
    const { full_name, user_name, avatar_url, description } = data || {};

    return (
        <>
            <div className="w-full flex justify-start items-center gap-4">
                <GoBack path={'/home/profile'}/>
                <span className="text-2xl text-gray-500">Edit Profile</span>
            </div>
            <FormEditProfile full_name={full_name} user_name={user_name} avatar_url={avatar_url} description={description} />
        </>
    )
}