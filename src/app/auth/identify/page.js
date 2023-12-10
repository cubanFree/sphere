'use client';

import { updateUser } from '@/app/lib/action';
import { fetchGetColumnAllUsers } from '@/app/lib/data';
import TextareaDesign from '@/app/ui/general/textareaDesign';
import { NextUIProvider, Card, CardBody, Tab, Tabs } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { MdOutlineVerified } from "react-icons/md";
import { MdErrorOutline } from "react-icons/md";
import BtnDesign from '@/app/ui/general/btnDesign';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';

export default function Identify() {

    const router = useRouter();

    const [handleUsername, setHandleUsername] = useState(false);
    const [handleAvatar, setHandleAvatar] = useState();
    const [handleName, setHandleName] = useState('');

    const searchUsername = useDebouncedCallback(async (value) => {
        const data = await fetchGetColumnAllUsers({ column: 'user_name' });
        // get user_names all users and check if exists
        const flag = (value !== '' && (value.length >= 5 && value.length <= 15) && !value.includes(' ')) ? !data.some(user => user.user_name === value) : false;
        setHandleUsername(flag);
    }, 100);

    const handleSubmit = async (formData) => {
        const { success } = await updateUser(formData);
        if (!success) return toast.error('Error to continue');
        router.push('/home');
        router.refresh();
    }

    const handleCharacters = (e) => {
        setHandleName(e.target.value)
        if (e.target.value.length >= 25) {
            e.target.value = e.target.value.slice(0, 25)
        }
    }

    return (
        <NextUIProvider>
            <Card className="max-w-full max-h-full w-[340px] dark">
                <CardBody className="dark">
                    <Tabs
                        fullWidth
                        size="lg"
                        aria-label="Form Tabs"
                    >

                        <Tab title="It's almost ready!">
                            <form
                                action={handleSubmit}
                                className="w-full flex flex-col gap-2 text-sm"
                            >
                                <div className='w-full flex justify-center items-center'>
                                    <label className='flex flex-col justify-center items-center gap-1'>
                                        <Image 
                                            src={handleAvatar || "/avatar_default.jpg"} 
                                            alt="Avatar Profile" 
                                            width={200}
                                            height={200}
                                            className="rounded-3xl border border-gray-500 p-1 object-cover cursor-pointer w-50 h-50"
                                        />
                                        <input
                                            type='file'
                                            name="avatar"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => setHandleAvatar(URL.createObjectURL(e.target.files[0]))}
                                        />
                                        <span className="text-gray-400 flex justify-center items-center">Choose an photo</span>
                                    </label>
                                </div>
                                <input
                                    type="text"
                                    name="full_name"
                                    placeholder="Full name"
                                    className="w-full border border-gray-800 rounded-lg p-4 bg-black focus:outline-none"
                                    autoComplete="on"
                                    onChange={handleCharacters}
                                    required
                                />
                                <div className='w-full flex flex-col gap-1'>
                                    <input
                                        type="text"
                                        name="user_name"
                                        placeholder="username"
                                        className="w-full border border-gray-800 rounded-lg p-4 bg-black focus:outline-none"
                                        autoComplete="off"
                                        onChange={(e) => searchUsername(e.target.value)}
                                        required
                                    />
                                    {
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
                                    }
                                </div>
                                <TextareaDesign
                                    limit={100}
                                    name="description"
                                    placeholder='description (optional)'
                                />

                                <ul className="w-full list-disc text-gray-500 pl-4">
                                    <li>
                                        The full name has a limit of 25 characters
                                    </li>
                                    <li>
                                        user_name cannot exceed 15 characters {'( in case you can change it )'}
                                    </li>
                                </ul>
                                
                                <BtnDesign text="Continue" isDisabled={(handleUsername && handleName) ? false : true}/>
                            </form>
                        </Tab>

                    </Tabs>
                </CardBody>
            </Card>
            <Toaster position="bottom-right" />
        </NextUIProvider>
    )
}