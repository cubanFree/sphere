import Header from "../ui/home/header";
import Footer from "../ui/home/footer";
import { redirect } from "next/navigation";
import { chechSession, chechUser } from "../lib/action";
import FormUserBanned from "../ui/home/formUserBanned";

export default async function layout({ children }) {

    // check session y user
    const [ user, session ] = await Promise.allSettled([
        chechUser(),
        chechSession()
    ]);
    if (!session.value) {
        console.error("No session found Home");
        redirect("/auth")
    };
    
    return (
        user.value ? (
            <section className="w-full h-screen md:flex md:justify-center block overflow-x-hidden">
                <header className="md:w-[350px]">
                    <Header />
                </header>

                <main className="md:min-w-[600px] md:border-x md:border-gray-900">
                    {children}
                </main>

                <footer className="md:w-[350px] lg:flex hidden">
                    <Footer />
                </footer>
            </section>
        ) : (
            <FormUserBanned />
        )
    )
}