import { chechSession, chechUser } from "@/app/lib/action";
import FormUserBanned from "@/app/ui/home/formUserBanned";

export default async function layout({ children }) {

    // check session y user
    const [ user, session ] = await Promise.allSettled([
        chechUser(),
        chechSession()
    ]);
    if (!session.value) {
        console.error("No session found Profile");
        redirect("/auth")
    };

    return (
        user.value ? (
            <div className="w-full h-screen flex flex-col p-4 gap-4">
                {children}
            </div>
        ) : (
            <FormUserBanned />
        )
    )
}