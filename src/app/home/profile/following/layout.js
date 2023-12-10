import { chechSession, chechUser } from "@/app/lib/action";
import FormUserBanned from "@/app/ui/home/formUserBanned";
import { redirect } from "next/navigation";

export default async function layout({ children }) {

    // check session y user
    const [ user, session ] = await Promise.allSettled([
        chechUser(),
        chechSession()
    ]);
    if (!session.value) {
        console.error("No session found Following");
        redirect("/auth")
    };

    return (
        user.value ? (
            <div className="w-full h-screen flex flex-col gap-4">
                {children}
            </div>
        ) : (
            <FormUserBanned />
        )
    )
}