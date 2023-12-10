'use server'

import { z } from "zod"
import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import fetchUser, { fetchAllFollowers, fetchAllFollowing } from "./data"

const UserSchema = z.object({
    id: z.string(),
    full_name: z.string(),
    user_name: z.string(),
    description: z.string(),
})
const CreateNewUserSchema = UserSchema.omit({ id: true })

export async function chechUser() {
  // Get id user
  const supabase = createServerActionClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();
  // check if exists user
  const data = user && await fetchUser({ id: user.id });
  return data ? user : false
}

export async function chechSession() {
  const supabase = createServerActionClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  return session ? true : false
}

export async function updateUser( formData ) {
    try {
        const supabase = createServerActionClient({ cookies })
        const { data: { user } } = await supabase.auth.getUser()
        // Save avatar in storage Supabase if exists avatar
        const avatar = formData.get('avatar')
        avatar && await supabase.storage.from('profile_avatar').upload(user.id, avatar, {
            cacheControl: '3600',
            upsert: true,
            contentType: avatar.type
        })
        
        // Get url-token from storage if exists avatar
        const signedUrl = (avatar && avatar.name !== 'undefined') ? await supabase.storage.from('profile_avatar').createSignedUrl(user.id, 1000000).then(res => res.data.signedUrl) : null;

        // Save user in Supabase
        const data = CreateNewUserSchema.parse({ ...Object.fromEntries(formData.entries()) })
        
        if (signedUrl) {
          await supabase.from('users').update({...data, avatar_url: signedUrl}).eq('id', user.id)
        } else {
          await supabase.from('users').update({...data}).eq('id', user.id)
        }

        return { success: true }

    } catch (error) {
        console.log(error)
        return { success: false }
    }
}

export async function handleSignIn( formData ) {
    const { email, password } = Object.fromEntries(formData);
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase.auth.signInWithPassword({ 
      email, 
      password
    });
    return error
};

export async function handleSignUp( pathOrigin, formData ) {
    const { email, password } = Object.fromEntries(formData);
    const supabase = createServerActionClient({ cookies });
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${pathOrigin}/auth/callback`,
      }
    });
    return error
};

export async function deleteAccount( formData ) {
  const email = formData.get('email');
  const supabase = createServerActionClient({ cookies });
  const { data: { user } } = await supabase.auth.getUser();

  if (!email || email !== user.email) return { error: true, message: 'Invalid email' };

  try {
    // Delete avatar
    await supabase.storage.from('profile_avatar').remove([user.id]);

    // Delete user
    await supabase.from('users').delete().eq('id', user.id);

    // // Delete account
    // const date = await supabase.auth.admin.deleteUser(session.user.id);
    // console.log(date);

    // Delete session
    await supabase.auth.signOut();

    return { error: false, message: 'Account deleted successfully' };
  } catch (error) {
    return { error: true, message: error.message };
  }

}

export async function changePassword( formData ) {
  const { password_new, password_confirm } = Object.fromEntries(formData);
  if (password_new !== password_confirm) return { error: true, message: 'Passwords do not match' };

  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.auth.updateUser({
    password: password_new
  });

  if (error) return { error: true, message: error.message };
  return { error: false, message: 'Password changed successfully' };
}

export async function updateFollow( idFriend ) {
  if (!idFriend) return console.log('Error idFriend: ', idFriend);
  const supabase = createServerActionClient({ cookies });

  // get id user
  const { data: { user: { id } } } = await supabase.auth.getUser();

  // get following from user
  const { following: followingUser } = await fetchAllFollowing({ id });
  //get following from friend
  const { followers: followersFriend } = await fetchAllFollowers({ id: idFriend });

  // check if idFriend is following User
  const isFollowing = followingUser.some(user => user.id === idFriend);

  if (isFollowing) {
    // remove idFriend from following
    try {
      await supabase.from('users').update({ following: followingUser.filter(user => user.id !== idFriend) }).eq('id', id);
      await supabase.from('users').update({ followers: followersFriend.filter(user => user.id !== id) }).eq('id', idFriend);
    } catch (error) {
      console.log('Error remove: ', error)
      return error;
    }
  } else {
    // add idFriend to following
    try {
      await supabase.from('users').update({ following: [...followingUser, { id: idFriend, friend_since: new Date() }] }).eq('id', id);
      await supabase.from('users').update({ followers: [...followersFriend, { id, friend_since: new Date() }] }).eq('id', idFriend);
    } catch (error) {
      console.log('Error add: ', error)
      return error;
    }
  }
}