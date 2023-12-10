'use client'

import { useFormStatus } from 'react-dom';
import {Spinner} from "@nextui-org/react";

export default function BtnDesign({ text, isDisabled }) {

    const { pending } = useFormStatus();

    return (
        <button
            disabled={isDisabled || pending}
            type="submit"
            className="w-full flex justify-center items-center py-2 px-4 border-2 border-blue-900 rounded-full hover:border-blue-800 disabled:cursor-not-allowed"
            >
                {
                    pending ? (
                        <Spinner color="primary" size='sm'/>
                    ) : (
                        <span>{text || 'null'}</span>
                    )
                }
        </button>
    )
}