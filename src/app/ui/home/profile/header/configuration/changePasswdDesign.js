'use client'

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import BtnDesign from "../../../../general/btnDesign";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useState } from "react";
import { MdOutlineVerified } from "react-icons/md";
import { changePassword } from "@/app/lib/action";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ChangePasswdDesign() {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [handlingShowPassword, setHandlingShowPassword] = useState(false);
    const [handlingNewPass, setHandlingNewPass] = useState('');
    const [handlingConfirmPass, setHandlingConfirmPass] = useState('');

    const router = useRouter();

    const handleSubmitPassword = async (formData) => {
        const { error, message } = await changePassword(formData);
        if (error) return toast.error(message);
        router.push('/home/profile');
        setTimeout(() => {
            toast.success(message);
        }, 1000)
    }

    return (
        <>
        <button
            onClick={(e) => {
                e.preventDefault();
                onOpen();
            }}
            className={"w-full cursor-pointer text-lg font-normal flex justify-start px-2 py-1 border-l-4 border-gray-800 hover:border-blue-700 hover:bg-gray-900 rounded-sm" + (isOpen && " bg-gray-900") }
            >
                Change Password
        </button>

        {/* Modal */}
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="dark p-4 flex flex-col gap-4">
                <>
                    <ModalHeader className="flex flex-col gap-1 p-0">Change password</ModalHeader>
                    <ModalBody className="w-full flex flex-col gap-8 p-0">
                        <form
                            action={handleSubmitPassword}
                            className="w-full flex flex-col gap-4"
                            >
                                <input
                                    name="password_new"
                                    type="text"
                                    placeholder="new password"
                                    className="w-full bg-black border-2 border-gray-700 p-3 rounded-lg outline-none"
                                    onChange={(e) => setHandlingNewPass(e.target.value)}
                                />
                                <label className='w-full flex items-center bg-black border-2 border-gray-700 rounded-lg p-3'>
                                    <input
                                        type={handlingShowPassword ? "text" : "password"}
                                        name="password_confirm"
                                        placeholder="password"
                                        className="w-full bg-black focus:outline-none"
                                        autoComplete="on"
                                        onChange={(e) => setHandlingConfirmPass(e.target.value)}
                                        required
                                    />
                                    <button
                                        className='focus:outline-none'
                                        onClick={(e) => {
                                        e.preventDefault()
                                        setHandlingShowPassword(!handlingShowPassword)
                                        }}
                                        >
                                            {
                                                handlingShowPassword ? (
                                                    <VscEyeClosed size={24} className='text-gray-400'/>
                                                ) : (
                                                    <VscEye size={24} className='text-gray-400'/>
                                                )
                                            }
                                    </button>
                                </label>
                                <div>
                                    {
                                        !((handlingNewPass !== handlingConfirmPass) || !(handlingNewPass && handlingConfirmPass)) && (
                                            <div className='w-full flex justify-end items-center gap-1'>
                                                <MdOutlineVerified className='text-green-500' />
                                                <span className='text-green-500'>Passwords match</span>
                                            </div>
                                        )
                                    }
                                </div>
                                <BtnDesign text="Change password" isDisabled={(handlingNewPass !== handlingConfirmPass) || !(handlingNewPass && handlingConfirmPass)}/>
                        </form>
                    </ModalBody>
                </>
            </ModalContent>
            <Toaster position="top-right" />
        </Modal>
        </>
    )
}