import fetchUser, { fetchAllFollowing } from '@/app/lib/data'
import ShowUsersList from '../../../../general/showUsersList'

export default async function GetFollowing({ id }) {

    const { following } = await fetchAllFollowing({ id })
    const usersPromise = following ? following.map(
        async(user) => {
            const data = await fetchUser({id: user.id})
            const { full_name, user_name, avatar_url, following, followers } = data || {}
            return {
                id: user.id,
                full_name,
                user_name,
                avatar_url,
                follower: followers ? followers.some(user => user.id === id) : false, // if user is following to Friend
                following: following ? following.some(user => user.id === id) : false, // if Friend is following to user
                friend_since: user.friend_since
            }
        }
    ) : []
    const users = await Promise.all(usersPromise)

    return <ShowUsersList users={users} />
}