'use client'

import { Modal, ModalContent, ModalBody, useDisclosure, Image } from "@nextui-org/react"

export default function ModalShowAvatar({ avatar_url }) {

    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <>
            <button
                className="focus:outline-none"
                onClick={onOpen}
                >
                    <Image 
                        isBlurred
                        src={avatar_url || "/avatar_default.jpg"}
                        alt="avatar"
                        className="object-cover w-[150px] h-[100px]"
                    />
            </button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent className="dark w-full">
                    <ModalBody className="w-full p-0 overflow-hidden">
                        <Image
                            isBlurred
                            src={avatar_url}
                            alt="avatar"
                            width={1000}
                            className="object-cover w-full"
                        />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}