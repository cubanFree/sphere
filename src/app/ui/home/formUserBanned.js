'use client'

import BtnDesign from "../general/btnDesign";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { MdErrorOutline } from 'react-icons/md';

export default function FormUserBanned() {

    const supabase = createClientComponentClient();
    const router = useRouter();

    const signOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    }

    return (
        <main className="w-full h-screen flex flex-col justify-center items-center gap-4">
            <div className="w-full flex flex-col gap-2 justify-center items-center">
                <span className="text-gray-400">Your account has been deleted :{'('}</span>
                <MdErrorOutline size={24} className="text-gray-400" />
            </div>
            <form
                action={signOut}
                >
                    <BtnDesign text="Log out" />
            </form>
        </main>
        
    )
}