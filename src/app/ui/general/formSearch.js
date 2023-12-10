'use client';

import { Tabs, Tab, Divider } from '@nextui-org/react';
import { useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function FormSearch({ debounce = 0 }) {

    const [filter, setFilter] = useState('full_name');
    const [search, setSearch] = useState('');
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const router = useRouter();

    const handleSubmitSearch = useDebouncedCallback((text) => {
        params.set('s', text);
        params.set('f', filter);
        router.push(`${pathname}?${params.toString()}`);
    }, debounce);

    const handleCancelSearch = (event) => {
        event.preventDefault();
        params.delete('s');
        params.delete('f');
        router.push(`${pathname}?${params.toString()}`);
    }

    return (
        <>
            <form
                className="w-full flex flex-col gap-4"
                >
                    <div className="w-full flex gap-4">
                        <input
                            type="text"
                            placeholder="quick search..." 
                            value={search}
                            onChange={(e) => {
                                handleSubmitSearch(e.target.value);
                                setSearch(e.target.value);
                            }}
                            autoComplete="off"
                            required
                            className="w-full border-2 border-gray-800 bg-gray-900 rounded-full px-4 py-1 focus:outline-none focus:border-blue-900"
                        />
                        <button
                            className={'max-w-[30%] bg-black focus:outline-none text-blue-400 hover:text-blue-500' + (!searchParams.get('s') ? ' hidden' : '')}
                            onClick={(e) => {
                                handleCancelSearch(e);
                                setSearch('');
                            }}
                            >
                                Cancelar
                        </button>
                    </div>

                    <Tabs 
                        key='filters' 
                        variant='underlined' 
                        aria-label="Tabs variants"
                        selectedKey={filter}
                        onSelectionChange={setFilter}
                        disabledKeys={['location']}
                        className='w-full dark'
                        >
                            <Tab key="full_name" title="Full name"/>
                            <Tab key="user_name" title="@username"/>
                            <Tab key="location" title="Location"/>
                    </Tabs>
            </form>
            <Divider className="bg-gray-800" />
        </>
    )
}