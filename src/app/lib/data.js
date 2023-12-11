'use server'

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Fetch user profile
export default async function fetchUser({ id }) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('users').select('*').eq('id', id)
    return data ? data[0] : null
}

export async function fetchGetColumnAllUsers({ column }) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('users').select(column)
    return data ? data : null
}

export async function fetchAllFollowing({ id }) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('users').select('following').eq('id', id)
    return data ? data[0] : null
}

export async function fetchAllFollowers({ id }) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('users').select('followers').eq('id', id)
    return data ? data[0] : null
}

export async function fetchSearchUsers({ search_text, filter }) {
    if (!search_text || !filter) return []
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('users').select('*').ilike(filter, `%${search_text}%`)
    return data
}