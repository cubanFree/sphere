'use client'

import { deleteAccount } from "@/app/lib/action";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { PiWarningCircle } from "react-icons/pi";
import { toast } from "react-hot-toast";

export default function DeleteDesign({ isOpen, onOpenChange = () => {} }) {

    const handlerDeletedSubmit = async(formData) => {
        const {error, message} = await deleteAccount(formData);
        setTimeout(() => {
            if (error) {
                toast.error(message);
            } else {
                toast.success(message);
            }
        }, 300)
        
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="dark flex flex-col gap-4 p-4">
                <>
                    <ModalHeader className="flex flex-col gap-1 p-0">Delete account</ModalHeader>
                    <ModalBody className="w-full flex flex-col gap-8 p-0">
                        <div className="w-full flex gap-4 justify-center items-center p-3 border-2 border-yellow-700 rounded-xl bg-yellow-950 text-sm">
                            <PiWarningCircle size={30} />
                            <span>
                                Unexpected bad things will happen if you don’t read this!
                            </span>
                        </div>

                        <p className="w-full border-l-4 border-yellow-700 pl-2">This will permanently delete the account, posts, issues, comments, and remove all collaborator associations.</p>
                    </ModalBody>
                    <ModalFooter className="w-full p-0">
                        <form
                            action={handlerDeletedSubmit}
                            className="w-full flex flex-col gap-4"
                            >
                                <label className="w-full flex flex-col gap-2">
                                    <span className="font-semibold">To continue, type your email:</span>
                                    <input
                                        type="text"
                                        name="email"
                                        placeholder="write your email"
                                        className="w-full border border-red-900 rounded-lg py-2 px-2 focus:outline-none bg-gray-800 text-sm"
                                        required
                                    />
                                </label>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center items-center py-2 px-4 border-2 border-red-900 rounded-lg hover:border-red-700"
                                    >
                                        Delete your account
                                </button>
                        </form>
                    </ModalFooter>
                </>
            </ModalContent>
        </Modal>
    );
}