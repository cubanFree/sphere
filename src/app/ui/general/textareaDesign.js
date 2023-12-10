'use client'

import { useState, useRef } from "react"

export default function TextareaDesign({ limit, defaultValue, placeholder, isRequired, name }) {

    const [characters, setCharacters] = useState(0)
    const textRef = useRef()

    const handleCharacters = (e) => {
        setCharacters(e.target.value.length)
        if (e.target.value.length >= limit) {
            e.target.value = e.target.value.slice(0, limit-1)
        }
        const textarea = textRef.current
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    return (
        <div className="w-full flex flex-col gap-1">
            <textarea
                required={isRequired || false}
                ref={textRef}
                name={name || ""}
                className="bg-black border-2 border-gray-700 p-3 rounded-lg outline-none resize-none overflow-hidden"
                defaultValue={defaultValue || ""}
                placeholder={placeholder || ""}
                onChange={limit && handleCharacters}
                autoComplete="off"
            />
            {limit && <span className="text-gray-400 flex justify-end items-center">{characters + '/' + limit}</span>}
        </div>
    )
}