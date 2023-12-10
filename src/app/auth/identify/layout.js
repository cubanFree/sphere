import { chechUser } from "@/app/lib/action";
import { redirect } from "next/navigation";

export default async function layout( { children } ) {

    const user = await chechUser();
    if (!user) {
        console.error('No user found');
        redirect('/auth');
    }

    return (
        <div className="flex flex-col w-full h-screen justify-center items-center">
            {children}
        </div>
    )
}