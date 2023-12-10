import ChangePasswdDesign from "@/app/ui/home/profile/header/configuration/changePasswdDesign";
import GoBack from "@/app/ui/general/goBack";

export default function Configuration() {

    const list = [
        {
            name: 'Change Password',
            component: ChangePasswdDesign
        }
    ]

    return (
        <>
            <div className="w-full flex justify-start items-center gap-4">
                <GoBack path={'/home/profile'} />
                <span className="text-2xl text-gray-500">Configuration</span>
            </div>

            <div className="w-full flex flex-col">
                {
                    list.map((item, index) => (
                        <item.component key={index}/>
                    ))
                }
            </div>
        </>
    )
}