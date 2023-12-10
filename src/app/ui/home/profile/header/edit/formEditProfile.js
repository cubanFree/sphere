'use client'

import TextareaDesign from "@/app/ui/general/textareaDesign";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BtnDesign from "../../../../general/btnDesign";
import { toast } from "react-hot-toast";
import { updateUser } from "@/app/lib/action";
import { MdErrorOutline, MdOutlineVerified } from "react-icons/md";
import { useDebouncedCallback } from "use-debounce";
import { fetchGetColumnAllUsers } from "@/app/lib/data";

export default function FormEditProfile({ full_name, user_name, avatar_url, description }) {

    const [handleAvatar, setHandleAvatar] = useState(avatar_url);
    const [handleChange, setHandleChange] = useState(false);
    const [handleUsername, setHandleUsername] = useState(false);
    const router = useRouter();

    const handleSubmit = async (formData) => {
        const {success} = await updateUser(formData);
        if (!success) return toast.error('Error updating profile');
        router.push('/home/profile');
        router.refresh();
        setTimeout(() => {
            toast.success('Profile updated');
        }, 1000)
    }

    const searchUsername = useDebouncedCallback(async (value) => {
        const data = await fetchGetColumnAllUsers({ column: 'user_name' });
        // get user_names all users and check if exists
        const flag = (value !== '' && (value.length >= 5 && value.length <= 15) && !value.includes(' ')) ? !data.some(user => user.user_name === value) : false;
        setHandleUsername(flag);
    }, 100);

    const handleCharacters = (e) => {
        if (e.target.value.length >= 25) {
            e.target.value = e.target.value.slice(0, 25)
        }
    }

    return (
        <form 
            action={handleSubmit}
            className="w-full flex flex-col gap-3 items-center justify-start"
            onChange={() => setHandleChange(true)}
            >
                <div className="w-full flex justify-center items-center">
                    <label className="flex flex-col justify-center items-center gap-4">
                        <img 
                            src={handleAvatar ? handleAvatar : "/avatar_default.jpg"} 
                            alt="Avatar Profile" 
                            width={200}
                            height={200}
                            className="rounded-3xl border border-gray-500 p-1 object-cover w-60 h-60 cursor-pointer"
                        />
                        <input
                            name="avatar"
                            type="file"
                            onChange={(e) => setHandleAvatar(URL.createObjectURL(e.target.files[0]))}
                            accept="image/*"
                            className="hidden"
                        />
                    </label>
                </div>

                <div className="w-full flex flex-col justify-start items-start gap-10">
                    <label className="w-[50%] flex flex-col">
                        <span className="text-gray-500">full_name</span>
                        <input
                            required
                            name="full_name"
                            type="text"
                            placeholder="..."
                            defaultValue={full_name}
                            onChange={handleCharacters}
                            className="bg-black border-b border-gray-700 p-2 outline-none"
                        />
                    </label>
                    <label className="w-[50%] flex flex-col">
                        <span className="text-gray-500">username</span>
                        <input
                            readOnly={user_name}
                            name="user_name"
                            type="text"
                            placeholder="..."
                            defaultValue={user_name}
                            onChange={(e) => searchUsername(e.target.value)}
                            autoComplete="off"
                            required
                            className="bg-black border-b border-gray-700 p-2 text-gray-300 read-only:text-gray-500 read-only:cursor-not-allowed outline-none"
                        />
                        {
                            !user_name && (
                                handleUsername ? (
                                    <div className='w-full flex justify-end items-center gap-1'>
                                        <MdOutlineVerified className='text-green-500' />
                                        <span className='text-green-500'>avilable</span>
                                    </div>
                                ) : (
                                    <div className='w-full flex justify-end items-center gap-1'>
                                        <MdErrorOutline className='text-warning-500' />
                                        <span className='text-warning-500'>unavilable</span>
                                    </div>
                                )
                            )
                        }
                    </label>
                    <label className="w-full flex flex-col">
                        <span className="text-gray-500">description</span>
                        <TextareaDesign 
                            limit={100} 
                            defaultValue={description} 
                            placeholder="..."
                            name={"description"} 
                        />
                    </label>

                    <ul className="w-full list-disc text-gray-500 pl-4">
                        <li>
                            The full name has a limit of 25 characters
                        </li>
                        <li>
                            user_name cannot exceed 15 characters {'( in case you can change it )'}
                        </li>
                    </ul>

                    <BtnDesign text={"Save"} isDisabled={((handleChange && handleUsername) || handleAvatar) ? false : true} />
                </div>
        </form>
    )
}