import FormSearch from "@/app/ui/general/formSearch";
import MainSearch from "@/app/ui/home/search/mainSearch";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Search() {

    // get user
    const supabase = createServerComponentClient({ cookies });
    const { data: { user: { id } } } = await supabase.auth.getUser();

    return (
        <>  
            <div className="w-full flex justify-start items-center">
                <span className="text-2xl text-gray-500">Search</span>
            </div>
        
            <div className="w-full">
                <FormSearch debounce={500}/>
            </div>

            <div className="w-full">
                <MainSearch id={id}/>
            </div>
        </>
    )
}