'use client';

import { updateFollow } from '@/app/lib/action';
import { NextUIProvider, Button } from '@nextui-org/react';
import { useState } from 'react';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

export default function BtnFollow({ id, follower, following }) {

    const [loading, setLoading] = useState(false)

    const handleFollow = async ( idFriend ) => {
        setLoading(true)
        const error = await updateFollow( idFriend );
        setLoading(false)

        if ( error ) return console.log( error );
        window.location.reload();
    }

    return (
        <NextUIProvider>
            <Button
                onPress={() => handleFollow(id)}
                variant="bordered"
                radius="full"
                className={"text-gray-300 border-blue-900 bg-transparent" + ((!following && !follower) && ' bg-blue-800 border-none')}
                size='md'
                disabled={loading}
                >
                    
                    {
                        loading ? (
                            <BiDotsHorizontalRounded size={20} className='animate-spin' />
                        ) : (
                            (following && !follower) ? 'follow-back' : ((follower && !following) || (follower && following)) ? 'unfollow' : 'follow'
                        )
                    }
            </Button>
        </NextUIProvider>
    )
}